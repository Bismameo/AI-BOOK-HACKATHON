import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css'; // Reusing existing styles for now

function BookLandingPage() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Explore Physical AI & Humanoid Robotics">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/physical-ai-robotics/chapter-1-introduction-to-physical-ai">
              Reading Book
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/physical-ai-robotics">
              Explore Book
            </Link>
          </div>
        </div>
      </header>
      <main>
        {/* Potentially add more content here */}
      </main>
    </Layout>
  );
}

export default BookLandingPage;
