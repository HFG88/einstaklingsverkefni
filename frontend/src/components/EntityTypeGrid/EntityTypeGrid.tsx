import { useEffect, useState } from "react";
import { EntityTypeCard } from "../EntityTypeCard/EntityTypeCard";
import { entityTypeConfig } from "../../config/EntityTypeConfig";
import "./EntityTypeGrid.css";

type Props = {
  getLink: (type: string) => string;
};
const API_URL = import.meta.env.VITE_API_URL;

export function EntityTypeGrid({ getLink }: Props) {
  const [entityTypes, setEntityTypes] = useState<string[]>([]);
  useEffect(() => {
    fetch(`${API_URL}/entity-types`)
      .then((res) => res.json())
      .then((data) => setEntityTypes(data));
  }, []);

  return (
    <div className="card-grid">
      {entityTypes.map((type) => {
        const config = entityTypeConfig[type];
        if (!config) return null;

        return (
          <EntityTypeCard
            type={type}
            label={config.label}
            image={config.image}
            to={getLink(type)}
          />
        );
      })}
    </div>
  );
}
