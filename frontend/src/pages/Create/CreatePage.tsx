import { Layout } from "../../components/Layout/Layout";
import { EntityTypeGrid } from "../../components/EntityTypeGrid/EntityTypeGrid";
import "./CreatePage.css";

export function CreatePage() {
  return (
    <Layout>
      <section className="create-page">
        <div className="create-page__intro panel">
          <h1>Create New Entry</h1>
          <p>Choose what kind of entity you want to create.</p>
        </div>

        <EntityTypeGrid getLink={(type) => `/create/${type.toLowerCase()}`} />
      </section>
    </Layout>
  );
}
