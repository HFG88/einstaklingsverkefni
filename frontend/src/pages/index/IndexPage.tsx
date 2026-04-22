import { Layout } from "../../components/Layout/Layout";
import { EntityTypeGrid } from "../../components/EntityTypeGrid/EntityTypeGrid";
import "./IndexPage.css";
import { RandomEntityHighlight } from "../../components/EntityHiglightCard/EntityHighlight";

export function IndexPage() {
  return (
    <Layout>
      <div className="dashboard">
        <aside className="dashboard__left">
          <section className="panel">
            <h2>Overview</h2>
            <p>Current Quest</p>
            <p>Rescue the Lost Prince</p>
          </section>

          <section className="panel">
            <h2>Recent Updates</h2>
            <p>Ironkeep added</p>
            <p>Lord Thalric updated</p>
          </section>
        </aside>

        <section className="dashboard__center">
          <EntityTypeGrid
            getLink={(type) => `/entities/${type.toLowerCase()}`}
          />
        </section>

        <aside className="dashboard__right">
          <section className="panel">
            <h2>Campaign Timeline</h2>
            <p>The Eclipse Ritual</p>
            <p>Council of Elders Meeting</p>
          </section>

          <section className="panel">
            <RandomEntityHighlight />
          </section>
        </aside>

        <section className="dashboard__bottom panel">
          <h2>Adventure Log</h2>
          <p>July 5, 2026 - The Eclipse Ritual</p>
          <p>June 20, 2026 - Into the Darkwood Forest</p>
        </section>
      </div>
    </Layout>
  );
}
