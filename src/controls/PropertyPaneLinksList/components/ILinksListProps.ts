import { Link } from "./ILinksListState";

export interface ILinksListProps {
  links: string[];
  onChanged: (links: Link[]) => void;
}
