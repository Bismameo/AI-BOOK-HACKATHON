import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css'; // Reusing existing styles for simplicity

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/physical-ai-robotics">
            Explore the Book 📚
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function PhysicalAIRoboticsHero() {
  return (
    <Layout
      title={`Hello from ${useDocusaurusContext().siteConfig.title}`}
      description="Learn about AI_BOOK">
      <HomepageHeader />
      <main>
        <section className="container margin-vert--xl">
          <div className="row">
            <div className="col col--10 col--offset-1">
              <h2>Welcome to the future of Embodied Intelligence!</h2>
              <p>
                This book delves into the fascinating world where artificial intelligence meets physical embodiment.
                Explore the principles, technologies, and applications of AI_BOOK,
                from theoretical concepts to practical implementations with cutting-edge tools.
              </p>
              <h3>What you will learn:</h3>
              <ul>
                <li>The fundamentals of AI_BOOK and embodied intelligence.</li>
                <li>Mastering ROS 2 for robust robot control.</li>
                <li>Simulating complex robotic systems with Gazebo and Unity.</li>
                <li>Developing AI-powered robots using the NVIDIA Isaac Platform.</li>
                <li>Designing and building humanoid robots for natural interactions.</li>
                <li>Integrating advanced AI models like GPT for conversational robotics.</li>
                <li>Understanding the hardware requirements for building a Physical AI lab.</li>
              </ul>
              <p>
                Whether you are a student, researcher, or enthusiast, this resource provides a comprehensive
                guide to navigating the challenges and harnessing the opportunities in this rapidly evolving field.
              </p>
              <div className={styles.buttons}>
                <Link
                  className="button button--primary button--lg"
                  to="/docs/physical-ai-robotics/chapter-1-introduction-to-physical-ai">
                  Start Reading
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
