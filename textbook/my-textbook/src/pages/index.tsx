import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Your journey into embodied intelligence begins here.">
      <main className="container margin-vert--xl text--center">
        <h1>Welcome to the Home of Physical AI & Humanoid Robotics</h1>
        <p>This is the central hub for the book and all related resources.</p>
        <div style={{display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap'}}>
          <Link
            className="button button--primary button--lg"
            to="/physical-ai-robotics">
            Explore the Introduction
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/physical-ai-robotics">
            Dive into the Book
          </Link>
        </div>
      </main>
    </Layout>
  );
}