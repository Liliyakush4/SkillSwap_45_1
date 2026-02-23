import { CatalogSections } from '@widgets/catalog-sections';
import styles from './MainPage.module.css';

export default function MainPage() {
  return (
    <div className={styles.wrapper}>
      <h1>Главная страница</h1>

      <div className={styles.section}>
        <CatalogSections></CatalogSections>
      </div>
    </div>
  );
}
