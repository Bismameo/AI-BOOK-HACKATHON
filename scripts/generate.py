import os
import argparse
import google.generativeai as genai
from rag import retrieve_context, get_db_connection

# --- CONFIGURATION ---
# TODO: Add your Gemini API Key here
# It's recommended to use environment variables for security
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

# --- CONTENT GENERATION ---

def generate_chapter(topic, model_name="gemini-1.5-pro-latest"):
    """Generates a full chapter for the textbook using a RAG-enhanced prompt."""
    
    print(f"--- Starting generation for chapter: '{topic}' ---")

    # 1. Retrieve context using RAG
    print("Retrieving relevant context from knowledge base...")
    db_conn = get_db_connection()
    if not db_conn:
        print("Could not connect to database. Aborting generation.")
        return
    
    rag_context = retrieve_context(db_conn, query=f"Comprehensive overview of {topic}", top_k=5)
    db_conn.close()

    if not rag_context:
        print("Warning: Could not retrieve any context from the knowledge base. Proceeding with generation but results may be less accurate.")
        context_str = "No external context provided."
    else:
        context_str = "\n\n".join([f"--- Context Snippet {i+1} ---\n{ctx}" for i, ctx in enumerate(rag_context)])
        print(f"Successfully retrieved {len(rag_context)} context snippets.")

    # 2. Construct a detailed prompt
    prompt = f"""
    You are an expert author tasked with writing a chapter for a textbook on "Physical AI and Humanoid Robots".
    Your audience is undergraduate students and engineers. The tone must be educational, clear, engaging, and accessible. 
    
    Your task is to write a comprehensive chapter on the following topic: "{topic}"

    **Instructions:**
    1.  **Structure**: The chapter should have a clear introduction, several sub-sections with informative headings, and a concluding summary.
    2.  **Accuracy**: Use the provided context snippets below to ensure factual accuracy. Ground your explanations in this information. Do not invent facts.
    3.  **Content**: Explain concepts step-by-step. Include practical examples, and where appropriate, generate Markdown for diagrams (e.g., Mermaid syntax) and Python code snippets to illustrate concepts.
    4.  **Formatting**: The entire output must be a single, well-formatted Markdown document.

    **Here is the context retrieved from the knowledge base:**
    {context_str}

    **Begin writing the chapter now.**
    """

    # 3. Call the Gemini API
    print("Calling Gemini API to generate the chapter content. This may take a moment...")
    try:
        model = genai.GenerativeModel(model_name)
        response = model.generate_content(prompt)
        generated_text = response.text
    except Exception as e:
        print(f"Error during Gemini API call: {e}")
        # As per spec FR-011, generate a placeholder on failure
        # This is a simplified version; a real implementation would have retries.
        generated_text = f"# {topic}\n\n[TODO: Content generation failed for this chapter. Error: {e}]"

    # 4. Save the output to a file
    filename = f"{topic.lower().replace(' ', '_').replace('&', 'and')}.md"
    output_path = os.path.join("..", "textbook_content", filename) # Saving to a directory outside scripts
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, "w", encoding='utf-8') as f:
        f.write(generated_text)

    print(f"--- Chapter generation complete. Content saved to '{output_path}' ---")


# --- MAIN EXECUTION ---

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate a textbook chapter using RAG and Gemini.")
    parser.add_argument("-c", "--chapter", type=str, required=True, help="The topic of the chapter to generate.")
    
    args = parser.parse_args()
    
    if not GEMINI_API_KEY or GEMINI_API_KEY == "YOUR_GEMINI_API_KEY":
        print("Error: GEMINI_API_KEY is not set. Please set it as an environment variable or directly in the script.")
    else:
        generate_chapter(args.chapter)
