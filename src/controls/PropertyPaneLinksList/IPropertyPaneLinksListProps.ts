import { ILink } from "./components/LinksList";

export interface IPropertyPaneLinksListProps {
    key: string;
    links: ILink[];
    onPropertyChange?: (propertyPath: string, links: ILink[]) => void;
    onGetErrorMessage?: (value: string) => string;
}
