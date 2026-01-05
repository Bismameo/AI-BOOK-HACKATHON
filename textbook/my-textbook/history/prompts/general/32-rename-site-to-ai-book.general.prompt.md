---
ID: 32
TITLE: Rename Site to AI_BOOK
STAGE: general
DATE_ISO: 2026-01-05
SURFACE: agent
MODEL: gemini-1.5-pro
FEATURE: branding
BRANCH: main
USER: Bisma
COMMAND: and also replace name in AI_BOOK
LABELS: ["docusaurus", "config", "branding", "title", "tagline"]
LINKS:
  SPEC: null
  TICKET: null
  ADR: null
  PR: null
FILES_YAML:
  - docusaurus.config.ts
  - README.md
TESTS_YAML: []
PROMPT_TEXT: |
  and also replace name in AI_BOOK
RESPONSE_TEXT: |
  I have successfully updated the site name to 'AI_BOOK'.

  Here's what I did:
  1.  Modified `docusaurus.config.ts` to change the `title`, `tagline`, and `navbar.title` to 'AI_BOOK'.
  2.  Updated the title in `README.md` to 'AI_BOOK'.

  The build was successful, and the changes are now applied.
---
