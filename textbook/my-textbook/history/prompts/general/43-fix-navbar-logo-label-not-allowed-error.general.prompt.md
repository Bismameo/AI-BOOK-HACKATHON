--- 
id: 43
title: Fix navbar logo label not allowed error
stage: red
date: 2026-01-07
surface: agent
model: gemini-1.5-pro
feature: none
branch: main
user: Bisma
command: "npm start (after second error)"
labels:
  - bug-fix
  - docusaurus
  - navbar
  - validation
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - docusaurus.config.ts
tests_yaml:
  - null
prompt_text: "The `npm start` command failed with a `ValidationError`: `\"navbar.logo.label\" is not allowed`. This means `label` cannot be present if `src` is present. To fix this, I removed the `label` property from `navbar.logo` and set the root `title` of the config to 'PHYSICAL AI & HUMANOID ROBOTICS🤖' so the text would still appear."
response_text: "Removed `label` from `navbar.logo` and set the root `title` to 'PHYSICAL AI & HUMANOID ROBOTICS🤖' in `docusaurus.config.ts` to resolve the `ValidationError`."
outcome: "The Docusaurus build process should now pass without the `navbar.logo.label` validation error, and the desired heading should be displayed."
evaluation: "The fix addresses the identified validation error and ensures the heading is displayed as intended."
---