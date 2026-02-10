import React from 'react'
import styles from './Footer.module.css'

export type FooterProps = {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columnLogo}>
          <div className={styles.logo}>
            <span className={styles.logoIcon} aria-hidden="true">
              ✦
            </span>
            <span className={styles.logoText}>SkillSwap</span>
          </div>

          <p className={styles.watermark}>SkillSwap — 2025</p>
        </div>

        <div className={styles.column}>
          <button type="button" className={styles.linkButton}>
            О проекте
          </button>
          <button type="button" className={styles.linkButton}>
            Все навыки
          </button>
        </div>

        <div className={styles.column}>
          <button type="button" className={styles.linkButton}>
            Контакты
          </button>
          <button type="button" className={styles.linkButton}>
            Блог
          </button>
        </div>

        <div className={styles.column}>
          <button type="button" className={styles.linkButton}>
            Политика конфиденциальности
          </button>
          <button type="button" className={styles.linkButton}>
            Пользовательское соглашение
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer