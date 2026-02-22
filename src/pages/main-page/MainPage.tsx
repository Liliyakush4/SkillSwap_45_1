import { CatalogSections } from '@widgets/catalog-sections';

export default function MainPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Главная страница</h1>

      <div
        style={{
          marginTop: 24,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(324px, 1fr))',
          gap: 16,
          alignItems: 'start',
        }}
      >
        <CatalogSections></CatalogSections>
      </div>
    </div>
  );
}
