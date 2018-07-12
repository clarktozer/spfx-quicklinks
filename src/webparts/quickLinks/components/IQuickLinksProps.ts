import { LinkType } from "../QuickLinksWebPart";
import { Link } from "../../../controls/PropertyPaneLinksList/components/ILinksListState";
import { DisplayMode } from "@microsoft/sp-core-library";

export interface IQuickLinksProps {
  title: string;
  type: LinkType;
  iconColor: string;
  fontColor: string;
  openInNewTab?: boolean;
  links: Link[];
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
}
