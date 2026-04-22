import characterImg from "../assets/character.png";
import locationImg from "../assets/location.png";
import factionImg from "../assets/faction.png";
import eventImg from "../assets/event.png";
import noteImg from "../assets/note.png";

export const entityTypeConfig: Record<
  string,
  {
    label: string;
    image: string;
  }
> = {
  CHARACTER: {
    label: "Characters",
    image: characterImg,
  },
  LOCATION: {
    label: "Locations",
    image: locationImg,
  },
  FACTION: {
    label: "Factions",
    image: factionImg,
  },
  EVENT: {
    label: "Events",
    image: eventImg,
  },
  NOTE: {
    label: "Notes",
    image: noteImg,
  },
};
