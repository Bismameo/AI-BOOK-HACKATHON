
const markdownTranslator = require('markdown-translator');
const fs = require('fs').promises;

async function translateFile() {
  try {
    const translatedContent = await markdownTranslator({ from: 'en', to: 'ur', translator: 'google', file: 'docs/physical-ai-robotics/chapter-1-introduction-to-physical-ai.md' });
    await fs.writeFile('i18n/ur/docusaurus-plugin-content-docs/current/physical-ai-robotics/chapter-1-introduction-to-physical-ai.md', translatedContent);
    console.log('File translated successfully using markdown-translator!');
  } catch (error) {
    console.error('Error translating file with markdown-translator:', error);
  }
}

translateFile();
