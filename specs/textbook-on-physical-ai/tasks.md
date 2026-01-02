<!--
  **Constitution Alignment**: Ensure all tasks align with the principles defined in `.specify/memory/constitution.md`.
  For example, tasks for generating content must include steps for fact-checking using RAG as per the 'Accuracy and Factuality' principle.
-->

# Tasks: Physical AI and Humanoid Robots Textbook

**Input**: Design documents from `specs/textbook-on-physical-ai/`
**Prerequisites**: `plan.md` (required), `spec.md` (required)

## Phase 1: Foundation (Setup & Prerequisites)

**Purpose**: Prepare the environment for content generation.

- [ ] T001: Set up a new project in Neon DB and run the `CREATE EXTENSION IF NOT EXISTS vector;` command.
- [ ] T002: In a local `textbook/` directory, run `npx create-docusaurus@latest my-textbook classic` to initialize the Docusaurus project.
- [ ] T003: [P] Create the `scripts/rag.py` script. It must include functions for: (a) connecting to Neon DB, (b) processing text files into chunks, (c) generating embeddings using `google-generativeai`, and (d) inserting the embedded chunks into the database.
- [ ] T004: [P] Create the `scripts/generate.py` script. It must include a main function that: (a) accepts a chapter topic as an argument, (b) uses `scripts/rag.py` to retrieve relevant context, (c) constructs a detailed prompt for the Gemini API, and (d) saves the generated Markdown to a file.
- [ ] T005: Collect 5-10 PDF or text articles on Physical AI, robotics, and ethics. Use `scripts/rag.py` to process and embed these articles into the Neon DB to form the initial knowledge base.

**Checkpoint**: Foundational scripts are created and the knowledge base is seeded.

---

## Phase 2: Content Generation (Iterative)

**Purpose**: Generate the core content for the textbook, chapter by chapter, as guided by the spec.

- [ ] T101: [US1] Execute `python scripts/generate.py --chapter "Introduction to AI in the Physical World"` to generate `01-introduction.md`.
- [ ] T102: [US1] Execute `python scripts/generate.py --chapter "Robot Hardware, Sensors, and Actuators"` to generate `02-hardware.md`. The prompt must request the inclusion of at least 3 diagrams (e.g., Mermaid syntax).
- [ ] T103: [US1] Execute `python scripts/generate.py --chapter "Principles of Perception & Locomotion"` to generate `03-perception-locomotion.md`. The prompt must request at least 2 diagrams and 3 Python code snippets.
- [ ] T104: [US2] Execute `python scripts/generate.py --chapter "Core ML Algorithms for Robotics (RL, CV)"` to generate `04-ml-algorithms.md`. The prompt must request at least 5 Python code snippets demonstrating algorithms like basic RL loops or image processing with OpenCV.
- [ ] T105: [US2] Execute `python scripts/generate.py --chapter "Case Studies in Humanoid Robotics"` to generate `05-case-studies.md`. The prompt must explicitly ask to compare and contrast Tesla Optimus and Honda Asimo.
- [ ] T106: [US3] Execute `python scripts/generate.py --chapter "Ethics and Safety in Robotics"` to generate `06-ethics.md`. The prompt must ensure the content covers AI bias in perception and decision-making, as required by the spec's acceptance criteria.
- [ ] T107: [US3] Execute `python scripts/generate.py --chapter "Future Trends and Open Challenges"` to generate `07-future-trends.md`.
- [ ] T108: Execute `python scripts/generate.py --chapter "Glossary"` to generate `08-glossary.md`. The prompt must request a list of at least 50 key terms from the previous chapters with concise definitions.

**Checkpoint**: All chapter drafts and the glossary are generated as Markdown files.

---

## Phase 3: Assembly, Review, and Deployment

**Purpose**: Assemble the final textbook, ensure its quality, and publish it.

- [ ] T201: Copy all generated Markdown files from the output directory of `scripts/generate.py` into the `textbook/docs/` directory.
- [ ] T202: Edit `textbook/sidebars.js` to create the navigation menu for all chapters in the correct sequential order.
- [ ] T203: **(Manual)** A Subject Matter Expert must review each Markdown file in `textbook/docs/` for technical accuracy, clarity, and adherence to the educational tone, as per `spec.md` (SC-003). Edits are to be committed directly to the files.
- [ ] T204: In the `textbook/` directory, run `npm run build` to generate the static site.
- [ ] T205: Deploy the contents of the `textbook/build/` directory to the chosen web hosting platform (e.g., GitHub Pages, Vercel).

**Checkpoint**: The textbook is live and accessible on the web.
