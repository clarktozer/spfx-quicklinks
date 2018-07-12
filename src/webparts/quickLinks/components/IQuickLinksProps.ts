import { LinkType } from "../QuickLinksWebPart";
import { Link } from "../../../controls/PropertyPaneLinksList/components/ILinksListState";

export interface IQuickLinksProps {
  title: string;
  type: LinkType;
  iconColor: string;
  openInNewTab?: boolean;
  links: Link[];
}
