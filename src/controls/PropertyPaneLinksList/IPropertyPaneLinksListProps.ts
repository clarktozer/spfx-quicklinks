import { Link } from "./components/ILinksListState";

export interface IPropertyPaneLinksListProps {
  key: string;
  links: Link[];
  onPropertyChange?: (propertyPath: string, links: Link[]) => void;
  onGetErrorMessage?: (value: string) => string;
}
