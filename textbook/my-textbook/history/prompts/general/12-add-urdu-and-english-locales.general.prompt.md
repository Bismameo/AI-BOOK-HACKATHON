---
ID: 12
TITLE: Add Urdu and English Locales
STAGE: general
DATE_ISO: 2026-01-03
SURFACE: agent
MODEL: gemini-1.5-pro
FEATURE: none
BRANCH: main
USER: Bisma
COMMAND: add urdu and english lagnguage in the button
LABELS: ["i18n", "docusaurus", "locales", "urdu", "english"]
LINKS:
  SPEC: null
  TICKET: null
  ADR: null
  PR: null
FILES_YAML:
  - docusaurus.config.ts
TESTS_YAML: []
PROMPT_TEXT: |
  add urdu and english lagnguage in the button
RESPONSE_TEXT: |
  I have successfully updated the `docusaurus.config.ts` file to include 'ur' in the `locales` array. This will enable both English and Urdu as selectable languages in the translation button.
  To fully support Urdu, the content for Urdu will need to be created in the appropriate `i18n` directory structure (e.g., `i18n/ur/docusaurus-plugin-content-docs/current/`). However, adding the locale to the config is the first step.
---
