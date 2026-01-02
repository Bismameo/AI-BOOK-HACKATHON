import os
import argparse
import google.generativeai as genai
import psycopg2
from psycopg2.extras import execute_values
from PyPDF2 import PdfReader

# --- CONFIGURATION ---
# TODO: Add your credentials here
# It's recommended to use environment variables for security
NEON_CONNECTION_STRING = os.environ.get("NEON_CONNECTION_STRING", "postgres://user:password@host.projects.neon.tech/dbname")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

# --- DATABASE FUNCTIONS ---

def get_db_connection():
    """Establishes a connection to the Neon database."""
    try:
        conn = psycopg2.connect(NEON_CONNECTION_STRING)
        return conn
    except psycopg2.OperationalError as e:
        print(f"Error: Could not connect to the database. Please check your NEON_CONNECTION_STRING.")
        print(f"Details: {e}")
        return None

def setup_database(conn):
    """Ensures the vector extension and documents table exist."""
    with conn.cursor() as cur:
        cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
        cur.execute("""
        CREATE TABLE IF NOT EXISTS documents (
            id SERIAL PRIMARY KEY,
            source TEXT,
            content TEXT,
            embedding VECTOR(768) -- Gemini embedding dimension is 768 for text-embedding-004
        );
        """)
        conn.commit()
    print("Database setup complete.")

# --- TEXT PROCESSING AND EMBEDDING ---

def text_to_chunks(text, chunk_size=1000):
    """Splits a long text into smaller chunks."""
    return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

def embed_text(text):
    """Generates an embedding for a given text chunk using Gemini."""
    try:
        result = genai.embed_content(model="models/text-embedding-004", content=text)
        return result['embedding']
    except Exception as e:
        print(f"Error embedding text: {e}")
        return None

# --- RAG CORE FUNCTIONS ---

def ingest_documents(conn, doc_paths):
    """Processes, embeds, and ingests documents into the database."""
    all_chunks = []
    for doc_path in doc_paths:
        print(f"Processing document: {doc_path}")
        try:
            if doc_path.lower().endswith('.pdf'):
                with open(doc_path, 'rb') as f:
                    reader = PdfReader(f)
                    text = "".join(page.extract_text() for page in reader.pages)
            else: # Assume text file
                with open(doc_path, 'r', encoding='utf-8') as f:
                    text = f.read()
            
            chunks = text_to_chunks(text)
            for chunk in chunks:
                all_chunks.append((doc_path, chunk))

        except Exception as e:
            print(f"Could not read or process file {doc_path}. Error: {e}")
            continue

    print(f"Generated {len(all_chunks)} chunks. Now generating embeddings...")

    # Generate embeddings and prepare for insertion
    values_to_insert = []
    for source, content in all_chunks:
        embedding = embed_text(content)
        if embedding:
            values_to_insert.append((source, content, embedding))

    print(f"Successfully created {len(values_to_insert)} embeddings. Inserting into database...")

    # Insert into database
    with conn.cursor() as cur:
        execute_values(
            cur,
            "INSERT INTO documents (source, content, embedding) VALUES %s",
            values_to_insert
        )
        conn.commit()
    
    print(f"Successfully inserted {len(values_to_insert)} documents into the database.")

def retrieve_context(conn, query, top_k=5):
    """Retrieves the most relevant document chunks for a given query."""
    query_embedding = embed_text(query)
    if not query_embedding:
        return []

    with conn.cursor() as cur:
        cur.execute(
            "SELECT content FROM documents ORDER BY embedding <=> %s LIMIT %s",
            (query_embedding, top_k)
        )
        results = [row[0] for row in cur.fetchall()]
    return results

# --- MAIN EXECUTION ---

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="RAG script for interacting with Neon DB and Gemini.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # Subparser for setting up the database
    parser_setup = subparsers.add_parser("setup", help="Set up the database table and vector extension.")
    
    # Subparser for ingesting documents
    parser_ingest = subparsers.add_parser("ingest", help="Ingest and embed documents into the database.")
    parser_ingest.add_argument("files", nargs='+', help="List of file paths to ingest (PDFs or TXTs).")

    # Subparser for querying
    parser_query = subparsers.add_parser("query", help="Retrieve relevant context for a query.")
    parser_query.add_argument("text", type=str, help="The query text.")

    args = parser.parse_args()

    db_conn = get_db_connection()
    if db_conn:
        if args.command == "setup":
            setup_database(db_conn)
        
        elif args.command == "ingest":
            ingest_documents(db_conn, args.files)

        elif args.command == "query":
            retrieved_docs = retrieve_context(db_conn, args.text)
            print("\n--- Retrieved Context ---\n")
            for i, doc in enumerate(retrieved_docs):
                print(f"--- Document {i+1} ---\n{doc}\n")

        db_conn.close()
