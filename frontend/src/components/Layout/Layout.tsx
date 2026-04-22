import type { ReactNode } from "react";
import { Link } from "react-router";
import "./Layout.css";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className="layout">
      <header className="layout__header">
        <div className="layout__topbar">
          <div className="layout__brand">
            <h1 className="layout__title">Tabula Rasa</h1>
            <p className="layout__subtitle">Worldbuilding & Campaign Manager</p>
          </div>

          <div className="layout__actions">
            <Link to="/create" className="layout__new-entry">
              New Entry
            </Link>
          </div>
        </div>

        <nav className="layout__nav">
          <Link to="/">Dashboard</Link>
        </nav>
      </header>

      <main className="layout__main">{children}</main>
    </div>
  );
}
