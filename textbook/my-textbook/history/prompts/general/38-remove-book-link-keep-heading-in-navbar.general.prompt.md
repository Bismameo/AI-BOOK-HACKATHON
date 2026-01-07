---
id: 38
title: Remove book link, keep heading in navbar
stage: general
date: 2026-01-07
surface: agent
model: gemini-1.5-pro
feature: none
branch: main
user: Bisma
command: "add in the navbar heading of PHISICAL AI & HUMANOID ROBOTICS🤖 and remove book heading"
labels:
  - navbar
  - docusaurus
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - docusaurus.config.ts
tests_yaml:
  - null
prompt_text: "add in the navbar heading of PHISICAL AI & HUMANOID ROBOTICS🤖 and remove book heading"
response_text: "The 'Book' link (docSidebar item) has been removed from the navbar configuration. The main navbar heading 'PHYSICAL AI & HUMANOID ROBOTICS' remains as the site's title."
outcome: "The navbar now displays only 'PHYSICAL AI & HUMANOID ROBOTICS' as its heading, with the 'Book' link removed."
evaluation: "The change was successfully implemented as requested, removing the 'Book' link and retaining the main heading."
---