import { Link } from "react-router";
import "./EntityTypeCard.css";

type Props = {
  type: string;
  label: string;
  image: string;
  to: string;
};

export function EntityTypeCard({ label, image, to }: Props) {
  return (
    <Link to={to} className="entity-type-card">
      <img src={image} alt={label} />
      <h2>{label}</h2>
    </Link>
  );
}
