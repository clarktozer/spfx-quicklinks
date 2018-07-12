import { Link } from "./components/ILinksListState";

export interface IPropertyPaneLinksListProps {
  key: string;
  links: string[];
  onPropertyChange: (propertyPath: string, links: Link[]) => void;
}
