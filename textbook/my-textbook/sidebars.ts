import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Physical AI & Humanoid Robotics',
      link: {
        type: 'generated-index',
        title: 'Physical AI & Humanoid Robotics Book',
        description: 'Explore the comprehensive guide to Physical AI and Humanoid Robotics.',
        slug: '/category/physical-ai-humanoid-robotics',
      },
      items: [
        'physical-ai-robotics/index',
        'physical-ai-robotics/chapter-1-introduction-to-physical-ai',
        'physical-ai-robotics/chapter-2-ros2-fundamentals',
        'physical-ai-robotics/chapter-3-robot-simulation-with-gazebo',
        'physical-ai-robotics/chapter-4-nvidia-isaac-platform',
        'physical-ai-robotics/chapter-5-humanoid-robot-development',
        'physical-ai-robotics/chapter-6-conversational-robotics',
        'physical-ai-robotics/chapter-7-course-structure-and-hardware-requirements',
        'physical-ai-robotics/module-1-ros2',
        'physical-ai-robotics/module-2-digital-twin',
        'physical-ai-robotics/glossary',
      ],
    },
  ],
};

export default sidebars;
