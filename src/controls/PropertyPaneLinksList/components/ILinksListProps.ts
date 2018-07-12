import { Link } from "./ILinksListState";

export interface ILinksListProps {
  targetProperty: string;
  links: Link[];
  onChanged(targetProperty: string, value: any): void;
}
