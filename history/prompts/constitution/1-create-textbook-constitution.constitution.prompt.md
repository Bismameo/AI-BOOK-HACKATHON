---
id: 1
title: Create Textbook Constitution
stage: constitution
date: 2026-01-03
surface: agent
model: gemini-1.5-pro-001
feature: none
branch: master
user: Bisma
command: /sp.constitution Set principles (constitution): Run /sp.constitution and input:
Educational tone: Clear, beginner-friendly, with examples.
Structure: 10 chapters, glossary, references.
Accuracy: Use RAG for facts.
Output: Markdown files for Docusaurus.guide to me step by step for made pysical AI and humaniod robot textbook have use spec- driven content( gemini cli ,speckit plus ,docusurus,RAG,Neon DB) help for generate book follow with all step one by oneStep-by-Step Guide to Generating a Textbook on Physical AI and Humanoid Robots Using Spec-Driven Content
This guide will walk you through creating a textbook on "Physical AI and Humanoid Robots" using a spec-driven approach. Physical AI refers to AI systems embodied in the physical world (e.g., robotics integrating perception, decision-making, and actuation), while humanoid robots are anthropomorphic machines like Tesla's Optimus or Boston Dynamics' Atlas. The textbook will cover topics like history, mechanics, AI algorithms, ethics, and future trends.
We'll use spec-driven content generation, where specifications (specs) define the structure and requirements, driving AI-assisted creation. Tools involved:

Gemini CLI: For AI-generated content (text, explanations, code snippets) via Google's Gemini model.
SpecKit Plus: A toolkit for spec-driven workflows, treating specs as executable artifacts to guide generation.
Docusaurus: To host the textbook as an interactive online site.
RAG (Retrieval-Augmented Generation): To make content accurate by retrieving from a knowledge base.
Neon DB: Serverless Postgres database as a vector store for RAG (using pgvector for embeddings).

Prerequisites:

Node.js (v18+), Python (v3.10+), Git, and a Google AI Studio API key (for Gemini).
Accounts: Neon (free tier), Google AI Studio.
Basic CLI familiarity.

Follow each step sequentially. This process could take 1-2 days, depending on iterations.
Step 1: Install and Set Up the Tools
Install all tools locally to create a unified workflow.

Install Gemini CLI:
Open your terminal.
Run: npm install -g @google/gemini-cli (or use uvx --from git+https://github.com/google-gemini/gemini-cli.git gemini init for the latest).
Authenticate: Run gemini login and follow the browser prompt to link your Google account or API key.
Test: Run gemini chat "Hello, world!" – it should respond using Gemini.

Install SpecKit Plus:
Clone the repo: git clone https://github.com/panaversity/spec-kit-plus.git.
Navigate: cd spec-kit-plus.
Install dependencies: npm install (or follow README for Python setup if needed).
Initialize CLI: Run ./specifyplus init my-textbook-project (or alias as sp for shortcuts like /sp.specify).
It integrates with Gemini CLI – configure by setting GEMINI_API_KEY env var: export GEMINI_API_KEY=your-key.

Set Up Neon DB for RAG:
Sign up at neon.tech and create a new project/database (e.g., "ai-robotics-db").
Enable pgvector extension: In Neon console, run SQL: CREATE EXTENSION IF NOT EXISTS vector;.
Create a table for embeddings:textCREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding VECTOR(1536)  -- Gemini embedding dimension
);
Get connection string: From Neon dashboard (e.g., postgres://user:pass@host.neon.tech/db).
Install Python deps for RAG: pip install google-generativeai psycopg2-binary pgvector.

Set Up Docusaurus:
Run: npx create-docusaurus@latest my-textbook classic.
Navigate: cd my-textbook.
Start dev server: npm run start – visit localhost:3000 to preview.
Customize: Edit docusaurus.config.js for title ("Physical AI and Humanoid Robots Textbook"), theme, and sidebar.

Prepare RAG Script:
Create a Python file rag.py for embedding/retrieval:Pythonimport google.generativeai as genai
import psycopg2
from psycopg2.extras import execute_values

genai.configure(api_key="your-gemini-api-key")
conn = psycopg2.connect("your-neon-connection-string")
cur = conn.cursor()

def embed_text(text):
    result = genai.embed_content(model="models/embedding-001", content=text)
    return result['embedding']

def insert_docs(docs):
    values = [(content, embed_text(content)) for content in docs]
    execute_values(cur, "INSERT INTO documents (content, embedding) VALUES %s", [(c, e) for c, e in values])
    conn.commit()

def retrieve(query, top_k=5):
    query_emb = embed_text(query)
    cur.execute("SELECT content FROM documents ORDER BY embedding <=> %s LIMIT %s", (query_emb, top_k))
    return [row[0] for row in cur.fetchall()]

# Close conn when done
This uses Gemini for embeddings and Neon for vector search.


Step 2: Build the Knowledge Base for RAG
RAG ensures generated content is factual by retrieving from reliable sources.

Collect documents: Download PDFs/articles on physical AI/humanoid robots (e.g., from arXiv, Wikipedia, robotics sites like IEEE). Examples:
"Embodied AI Survey" PDF.
Wikipedia dumps on humanoid robots.
Books/chapters on robot kinematics.

Process and insert:
Split docs into chunks (500-1000 words) using Python (e.g., with PyPDF2 for PDFs).
Run insert_docs(chunks) from your rag.py to embed and store in Neon DB.
Aim for 50-100 chunks initially (expand as needed).

Test RAG: Run retrieve("What is physical AI?") – it should return relevant snippets.

Step 3: Define Specifications Using SpecKit Plus
Spec-driven: Start with high-level specs to guide the entire book.

Initialize project: In your SpecKit Plus dir, run /sp.init textbook-on-physical-ai-and-humanoid-robots.
Set principles (constitution): Run /sp.constitution and input:
Educational tone: Clear, beginner-friendly, with examples.
Structure: 10 chapters, glossary, references.
Accuracy: Use RAG for facts.
Output: Markdown files for Docusaurus.

Specify requirements: Run /sp.specify and provide prompt:textCreate a textbook on physical AI (embodied intelligence in robots) and humanoid robots. Cover: Intro to AI in physical world, robot hardware, perception/sensors, locomotion, ML algorithms (RL, CV), case studies (Optimus, Asimo), ethics/safety, future trends. Target audience: Students/engineers. Include diagrams/code snippets.
Output: A /sp.spec.md file with detailed outline (e.g., chapter breakdowns).

Clarify ambiguities: If needed, run /sp.clarify to refine specs.

Step 4: Plan the Content Structure
Use SpecKit to break down into actionable plan.

Generate plan: Run /sp.plan with input like "Technical stack: Markdown, Gemini for generation, RAG for accuracy, Docusaurus for hosting."
Output: /sp.plan.md with chapter sequence, dependencies (e.g., intro before advanced topics), and integration points (e.g., use RAG for case studies).

Analyze for gaps: Run /sp.analyze to check completeness (e.g., ensure ethics chapter covers biases in humanoid AI).

Step 5: Generate Tasks and Implement Content
Break into tasks and use Gemini + RAG to create sections.

Create tasks: Run /sp.tasks – it generates a list like:
Task 1: Write Chapter 1 intro (500 words).
Task 2: Generate diagram code for robot kinematics.

Execute tasks: For each, run /sp.implement <task-id>.
Integrate RAG: In your workflow, for a task prompt like "Write section on robot perception", first retrieve via rag.py (e.g., snippets on sensors), then feed to Gemini CLI:textgemini generate-content "Write a textbook section on robot perception in humanoid robots. Use this context: [paste retrieved snippets]. Keep educational."
Output: Markdown files (e.g., chapter1.md) with text, code (e.g., Python sims via Matplotlib), placeholders for images.

Iterate: Run /sp.checklist to validate each section against specs (e.g., word count, citations).
If inaccurate, re-retrieve with better queries and regenerate.

Add visuals: Use Gemini to describe images (e.g., "Generate Mermaid diagram for AI pipeline"), then embed in Markdown.

Step 6: Assemble the Textbook in Docusaurus
Compile generated content into a browsable site.

Copy Markdown files: Move generated .md files to my-textbook/docs/ (create folders like chapters/).
Configure sidebar: Edit sidebars.js to list chapters (e.g., { type: 'doc', id: 'chapters/intro' }).
Add features:
Search: Install @docusaurus/plugin-content-search.
PDF export: Add a plugin like docusaurus-pdf for downloadable book.
Custom pages: Create pages/index.md for landing with overview.

Build: Run npm run build – generates static HTML.

Step 7: Review, Refine, and Deploy

Preview: npm run start – read through, check flow.
Refine: If gaps, loop back to SpecKit /sp.clarify and regenerate sections with better RAG queries.
Deploy: Push to GitHub, enable GitHub Pages (or use Vercel/Netlify). In Docusaurus config, set url and baseUrl.
Test: Ensure RAG-sourced facts are cited (e.g., add footnotes from retrieved docs).

Step 8: Maintenance and Expansion

Update specs in SpecKit for new editions (e.g., add chapter on latest robots).
Scale RAG: Add more docs to Neon DB as research evolves.
Monitor: Use Docusaurus analytics for user engagement.

This spec-driven method ensures the textbook is structured, accurate, and iterable. If you encounter errors (e.g., API limits), scale down tasks or use free tiers. For code snippets in the book, test them via code_execution if needed, but focus on educational value. Once deployed, your online textbook will be accessible worldwide! If stuck on a step, provide details for troubleshooting.43 sourcesmake contitution for the this bookConstitution for the Textbook: Physical AI and Humanoid Robots
This constitution serves as the immutable set of governing principles for generating, structuring, and maintaining the textbook Physical AI and Humanoid Robots. It guides all subsequent steps in the spec-driven workflow (specification, planning, task generation, implementation, and review) using tools like SpecKit Plus, Gemini CLI, RAG with Neon DB, and Docusaurus deployment.
All generated content, code, diagrams, and decisions must align with these principles. Violations trigger clarification or regeneration.
1. Purpose and Scope

The textbook provides a comprehensive, educational introduction to physical AI (embodied intelligence in the physical world) and humanoid robots.
Target audience: Undergraduate/graduate students in computer science, robotics, mechanical engineering, and AI; engineers/practitioners entering the field; interested general readers with basic technical background.
Scope: History, core concepts (perception, actuation, locomotion), AI algorithms (reinforcement learning, computer vision, multimodal models), hardware/mechanics, case studies (e.g., Tesla Optimus, Boston Dynamics Atlas, Figure 01 as of 2026), ethics/safety, societal impact, and future trends.
Balance theory, practical examples, code snippets, simulations, and diagrams.

2. Tone and Style

Educational, clear, engaging, and accessible: Explain concepts step-by-step, starting from fundamentals before advancing.
Objective and evidence-based: Present multiple viewpoints on controversial topics (e.g., job displacement, AI safety).
Inclusive language: Gender-neutral, bias-free, diverse examples (global contributions to robotics).
Concise yet thorough: Aim for readability; use bullet points, numbered lists, tables, and sidebars for key takeaways.

3. Accuracy and Factuality

Prioritize factual accuracy: All claims grounded in reliable sources via RAG (Retrieval-Augmented Generation) from the Neon DB knowledge base.
Cite sources: Include references/footnotes for key facts, papers, and real-world examples (e.g., IEEE, arXiv, official company reports).
Up-to-date as of 2026: Include recent advancements (e.g., multimodal foundation models for robotics, latest humanoid deployments).
Avoid hallucinations: Cross-verify generated content against retrieved contexts; flag uncertainties.

4. Structure and Format

Overall structure: 10-12 chapters, plus introduction, glossary, index, appendices (code repositories, further reading).
Each chapter: Learning objectives, main content, examples/code snippets/diagrams, exercises/questions, summary, references.
Interactive elements for Docusaurus: Mermaid diagrams, embedded code blocks (testable where possible), searchable content.
Visuals: Include descriptive diagrams, photos of real robots, schematics; use alt text for accessibility.

amazon.comoaepublish.comqualcomm.comshutterstock.com



5. Ethics and Responsibility

Dedicate at least one chapter to ethics: Cover privacy, bias in AI perception, human-robot interaction safety, job impacts, autonomy risks, alignment with human values.
Promote responsible AI: Emphasize safety (e.g., Asimov-inspired principles adapted to modern contexts), transparency, fairness, and human oversight.
Transparency in generation: Note in preface that content is AI-assisted with human oversight, following best practices (e.g., no unverified hallucinations, RAG for grounding).

6. Technical and Practical Focus

Hands-on orientation: Include executable code examples (Python with libraries like PyTorch, ROS simulations), pseudocode, and simple projects.
Interdisciplinary: Integrate mechanics, control theory, machine learning, and cognitive science.
Future-oriented: Discuss open challenges (e.g., general-purpose humanoid dexterity, energy efficiency) and emerging trends (e.g., foundation models for embodied AI).

7. Generation and Maintenance Guidelines

Spec-driven adherence: All tasks/plans/specs reference this constitution.
Iterative improvement: Allow updates for new developments (e.g., annual editions).
Quality checks: Ensure consistency, no plagiarism, proper attribution; validate code snippets where possible.
Output format: Markdown compatible with Docusaurus; static, open-access friendly.
labels: [constitution, textbook, spec-driven]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- .specify/memory/constitution.md
- .specify/templates/plan-template.md
- .specify/templates/spec-template.md
- .specify/templates/tasks-template.md
tests:
-
---

## Prompt

/sp.constitution Set principles (constitution): Run /sp.constitution and input:
Educational tone: Clear, beginner-friendly, with examples.
Structure: 10 chapters, glossary, references.
Accuracy: Use RAG for facts.
Output: Markdown files for Docusaurus.guide to me step by step for made pysical AI and humaniod robot textbook have use spec- driven content( gemini cli ,speckit plus ,docusurus,RAG,Neon DB) help for generate book follow with all step one by oneStep-by-Step Guide to Generating a Textbook on Physical AI and Humanoid Robots Using Spec-Driven Content
This guide will walk you through creating a textbook on "Physical AI and Humanoid Robots" using a spec-driven approach. Physical AI refers to AI systems embodied in the physical world (e.g., robotics integrating perception, decision-making, and actuation), while humanoid robots are anthropomorphic machines like Tesla's Optimus or Boston Dynamics' Atlas. The textbook will cover topics like history, mechanics, AI algorithms, ethics, and future trends.
We'll use spec-driven content generation, where specifications (specs) define the structure and requirements, driving AI-assisted creation. Tools involved:

Gemini CLI: For AI-generated content (text, explanations, code snippets) via Google's Gemini model.
SpecKit Plus: A toolkit for spec-driven workflows, treating specs as executable artifacts to guide generation.
Docusaurus: To host the textbook as an interactive online site.
RAG (Retrieval-Augmented Generation): To make content accurate by retrieving from a knowledge base.
Neon DB: Serverless Postgres database as a vector store for RAG (using pgvector for embeddings).

Prerequisites:

Node.js (v18+), Python (v3.10+), Git, and a Google AI Studio API key (for Gemini).
Accounts: Neon (free tier), Google AI Studio.
Basic CLI familiarity.

Follow each step sequentially. This process could take 1-2 days, depending on iterations.
Step 1: Install and Set Up the Tools
Install all tools locally to create a unified workflow.

Install Gemini CLI:
Open your terminal.
Run: npm install -g @google/gemini-cli (or use uvx --from git+https://github.com/google-gemini/gemini-cli.git gemini init for the latest).
Authenticate: Run gemini login and follow the browser prompt to link your Google account or API key.
Test: Run gemini chat "Hello, world!" – it should respond using Gemini.

Install SpecKit Plus:
Clone the repo: git clone https://github.com/panaversity/spec-kit-plus.git.
Navigate: cd spec-kit-plus.
Install dependencies: npm install (or follow README for Python setup if needed).
Initialize CLI: Run ./specifyplus init my-textbook-project (or alias as sp for shortcuts like /sp.specify).
It integrates with Gemini CLI – configure by setting GEMINI_API_KEY env var: export GEMINI_API_KEY=your-key.

Set Up Neon DB for RAG:
Sign up at neon.tech and create a new project/database (e.g., "ai-robotics-db").
Enable pgvector extension: In Neon console, run SQL: CREATE EXTENSION IF NOT EXISTS vector;.
Create a table for embeddings:textCREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding VECTOR(1536)  -- Gemini embedding dimension
);
Get connection string: From Neon dashboard (e.g., postgres://user:pass@host.neon.tech/db).
Install Python deps for RAG: pip install google-generativeai psycopg2-binary pgvector.

Set Up Docusaurus:
Run: npx create-docusaurus@latest my-textbook classic.
Navigate: cd my-textbook.
Start dev server: npm run start – visit localhost:3000 to preview.
Customize: Edit docusaurus.config.js for title ("Physical AI and Humanoid Robots Textbook"), theme, and sidebar.

Prepare RAG Script:
Create a Python file rag.py for embedding/retrieval:Pythonimport google.generativeai as genai
import psycopg2
from psycopg2.extras import execute_values

genai.configure(api_key="your-gemini-api-key")
conn = psycopg2.connect("your-neon-connection-string")
cur = conn.cursor()

def embed_text(text):
    result = genai.embed_content(model="models/embedding-001", content=text)
    return result['embedding']

def insert_docs(docs):
    values = [(content, embed_text(content)) for content in docs]
    execute_values(cur, "INSERT INTO documents (content, embedding) VALUES %s", [(c, e) for c, e in values])
    conn.commit()

def retrieve(query, top_k=5):
    query_emb = embed_text(query)
    cur.execute("SELECT content FROM documents ORDER BY embedding <=> %s LIMIT %s", (query_emb, top_k))
    return [row[0] for row in cur.fetchall()]

# Close conn when done
This uses Gemini for embeddings and Neon for vector search.


Step 2: Build the Knowledge Base for RAG
RAG ensures generated content is factual by retrieving from reliable sources.

Collect documents: Download PDFs/articles on physical AI/humanoid robots (e.g., from arXiv, Wikipedia, robotics sites like IEEE). Examples:
"Embodied AI Survey" PDF.
Wikipedia dumps on humanoid robots.
Books/chapters on robot kinematics.

Process and insert:
Split docs into chunks (500-1000 words) using Python (e.g., with PyPDF2 for PDFs).
Run insert_docs(chunks) from your rag.py to embed and store in Neon DB.
Aim for 50-100 chunks initially (expand as needed).

Test RAG: Run retrieve("What is physical AI?") – it should return relevant snippets.

Step 3: Define Specifications Using SpecKit Plus
Spec-driven: Start with high-level specs to guide the entire book.

Initialize project: In your SpecKit Plus dir, run /sp.init textbook-on-physical-ai-and-humanoid-robots.
Set principles (constitution): Run /sp.constitution and input:
Educational tone: Clear, beginner-friendly, with examples.
Structure: 10 chapters, glossary, references.
Accuracy: Use RAG for facts.
Output: Markdown files for Docusaurus.

Specify requirements: Run /sp.specify and provide prompt:textCreate a textbook on physical AI (embodied intelligence in robots) and humanoid robots. Cover: Intro to AI in physical world, robot hardware, perception/sensors, locomotion, ML algorithms (RL, CV), case studies (Optimus, Asimo), ethics/safety, future trends. Target audience: Students/engineers. Include diagrams/code snippets.
Output: A /sp.spec.md file with detailed outline (e.g., chapter breakdowns).

Clarify ambiguities: If needed, run /sp.clarify to refine specs.

Step 4: Plan the Content Structure
Use SpecKit to break down into actionable plan.

Generate plan: Run /sp.plan with input like "Technical stack: Markdown, Gemini for generation, RAG for accuracy, Docusaurus for hosting."
Output: /sp.plan.md with chapter sequence, dependencies (e.g., intro before advanced topics), and integration points (e.g., use RAG for case studies).

Analyze for gaps: Run /sp.analyze to check completeness (e.g., ensure ethics chapter covers biases in humanoid AI).

Step 5: Generate Tasks and Implement Content
Break into tasks and use Gemini + RAG to create sections.

Create tasks: Run /sp.tasks – it generates a list like:
Task 1: Write Chapter 1 intro (500 words).
Task 2: Generate diagram code for robot kinematics.

Execute tasks: For each, run /sp.implement <task-id>.
Integrate RAG: In your workflow, for a task prompt like "Write section on robot perception", first retrieve via rag.py (e.g., snippets on sensors), then feed to Gemini CLI:textgemini generate-content "Write a textbook section on robot perception in humanoid robots. Use this context: [paste retrieved snippets]. Keep educational."
Output: Markdown files (e.g., chapter1.md) with text, code (e.g., Python sims via Matplotlib), placeholders for images.

Iterate: Run /sp.checklist to validate each section against specs (e.g., word count, citations).
If inaccurate, re-retrieve with better queries and regenerate.

Add visuals: Use Gemini to describe images (e.g., "Generate Mermaid diagram for AI pipeline"), then embed in Markdown.

Step 6: Assemble the Textbook in Docusaurus
Compile generated content into a browsable site.

Copy Markdown files: Move generated .md files to my-textbook/docs/ (create folders like chapters/).
Configure sidebar: Edit sidebars.js to list chapters (e.g., { type: 'doc', id: 'chapters/intro' }).
Add features:
Search: Install @docusaurus/plugin-content-search.
PDF export: Add a plugin like docusaurus-pdf for downloadable book.
Custom pages: Create pages/index.md for landing with overview.

Build: Run npm run build – generates static HTML.

Step 7: Review, Refine, and Deploy

Preview: npm run start – read through, check flow.
Refine: If gaps, loop back to SpecKit /sp.clarify and regenerate sections with better RAG queries.
Deploy: Push to GitHub, enable GitHub Pages (or use Vercel/Netlify). In Docusaurus config, set url and baseUrl.
Test: Ensure RAG-sourced facts are cited (e.g., add footnotes from retrieved docs).

Step 8: Maintenance and Expansion

Update specs in SpecKit for new editions (e.g., add chapter on latest robots).
Scale RAG: Add more docs to Neon DB as research evolves.
Monitor: Use Docusaurus analytics for user engagement.

This spec-driven method ensures the textbook is structured, accurate, and iterable. If you encounter errors (e.g., API limits), scale down tasks or use free tiers. For code snippets in the book, test them via code_execution if needed, but focus on educational value. Once deployed, your online textbook will be accessible worldwide! If stuck on a step, provide details for troubleshooting.43 sourcesmake contitution for the this bookConstitution for the Textbook: Physical AI and Humanoid Robots
This constitution serves as the immutable set of governing principles for generating, structuring, and maintaining the textbook Physical AI and Humanoid Robots. It guides all subsequent steps in the spec-driven workflow (specification, planning, task generation, implementation, and review) using tools like SpecKit Plus, Gemini CLI, RAG with Neon DB, and Docusaurus deployment.
All generated content, code, diagrams, and decisions must align with these principles. Violations trigger clarification or regeneration.
1. Purpose and Scope

The textbook provides a comprehensive, educational introduction to physical AI (embodied intelligence in the physical world) and humanoid robots.
Target audience: Undergraduate/graduate students in computer science, robotics, mechanical engineering, and AI; engineers/practitioners entering the field; interested general readers with basic technical background.
Scope: History, core concepts (perception, actuation, locomotion), AI algorithms (reinforcement learning, computer vision, multimodal models), hardware/mechanics, case studies (e.g., Tesla Optimus, Boston Dynamics Atlas, Figure 01 as of 2026), ethics/safety, societal impact, and future trends.
Balance theory, practical examples, code snippets, simulations, and diagrams.

2. Tone and Style

Educational, clear, engaging, and accessible: Explain concepts step-by-step, starting from fundamentals before advancing.
Objective and evidence-based: Present multiple viewpoints on controversial topics (e.g., job displacement, AI safety).
Inclusive language: Gender-neutral, bias-free, diverse examples (global contributions to robotics).
Concise yet thorough: Aim for readability; use bullet points, numbered lists, tables, and sidebars for key takeaways.

3. Accuracy and Factuality

Prioritize factual accuracy: All claims grounded in reliable sources via RAG (Retrieval-Augmented Generation) from the Neon DB knowledge base.
Cite sources: Include references/footnotes for key facts, papers, and real-world examples (e.g., IEEE, arXiv, official company reports).
Up-to-date as of 2026: Include recent advancements (e.g., multimodal foundation models for robotics, latest humanoid deployments).
Avoid hallucinations: Cross-verify generated content against retrieved contexts; flag uncertainties.

4. Structure and Format

Overall structure: 10-12 chapters, plus introduction, glossary, index, appendices (code repositories, further reading).
Each chapter: Learning objectives, main content, examples/code snippets/diagrams, exercises/questions, summary, references.
Interactive elements for Docusaurus: Mermaid diagrams, embedded code blocks (testable where possible), searchable content.
Visuals: Include descriptive diagrams, photos of real robots, schematics; use alt text for accessibility.

amazon.comoaepublish.comqualcomm.comshutterstock.com



5. Ethics and Responsibility

Dedicate at least one chapter to ethics: Cover privacy, bias in AI perception, human-robot interaction safety, job impacts, autonomy risks, alignment with human values.
Promote responsible AI: Emphasize safety (e.g., Asimov-inspired principles adapted to modern contexts), transparency, fairness, and human oversight.
Transparency in generation: Note in preface that content is AI-assisted with human oversight, following best practices (e.g., no unverified hallucinations, RAG for grounding).

6. Technical and Practical Focus

Hands-on orientation: Include executable code examples (Python with libraries like PyTorch, ROS simulations), pseudocode, and simple projects.
Interdisciplinary: Integrate mechanics, control theory, machine learning, and cognitive science.
Future-oriented: Discuss open challenges (e.g., general-purpose humanoid dexterity, energy efficiency) and emerging trends (e.g., foundation models for embodied AI).

7. Generation and Maintenance Guidelines

Spec-driven adherence: All tasks/plans/specs reference this constitution.
Iterative improvement: Allow updates for new developments (e.g., annual editions).
Quality checks: Ensure consistency, no plagiarism, proper attribution; validate code snippets where possible.
Output format: Markdown compatible with Docusaurus; static, open-access friendly.

## Response snapshot

I have created the constitution for the "Physical AI and Humanoid Robots" textbook and updated the relevant templates to ensure alignment.

- **New Constitution**: Created at `.specify/memory/constitution.md` with version 1.0.0.
- **Template Updates**:
    - `.specify/templates/plan-template.md`: Added a constitution checklist.
    - `.specify/templates/spec-template.md`: Added a note to align with the constitution.
    - `.specify/templates/tasks-template.md`: Added a note to align with the constitution.

You can review the new constitution and the updated templates.

**Suggested commit message:** `docs: establish constitution v1.0.0 for textbook project`

## Outcome

- ✅ Impact: Established the foundational principles for the textbook project.
- 🧪 Tests: None
- 📁 Files: 
  - .specify/memory/constitution.md
  - .specify/templates/plan-template.md
  - .specify/templates/spec-template.md
  - .specify/templates/tasks-template.md
- 🔁 Next prompts: None
- 🧠 Reflection: The user provided a large amount of text, and I was able to extract the relevant information to create the constitution and update the templates. The fallback plan for PHR creation worked as expected.

## Evaluation notes (flywheel)

- Failure modes observed: The `create-phr.sh` script failed to create the PHR file.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
