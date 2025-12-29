import React from 'react';
import styles from './TellStory.module.css';

export default function TellStory() {
  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={styles.card}>
        <img src={"https://claude.ai/api/714f9eae-c43e-4e55-8a4a-36efd7196a83/files/196491ea-840b-4acb-be64-a566081b0e98/preview"} alt="Sunset" className={styles.cardImage} />
        <div className={styles.cardContent}>
          Start your project and go live in just a few clicks.
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.title}>Tell your story</div>
        <div className={styles.subTitle}>
          • Share your vision, roadmap & impact <br />
          • Define token supply & allocation
        </div>
        <div className={styles.badgeRow}>
          <span className={styles.badge}>Software & Dev</span>
          <span className={styles.badge}>AI Agents</span>
          <span className={styles.badge}>Gaming</span>
          <span className={styles.badge}>Crazy Stuff</span>
          <span className={styles.badge}>Digital Arts</span>
          <span className={styles.badge}>Music</span>
          <span className={styles.badge}>Sport</span>
          <span className={styles.badge}>DeFi</span>
          <span className={styles.badge}>Charity</span>
          <span className={styles.badge}>Education</span>
        </div>
      </div>
    </div>
  );
}