import { LinkType } from "../QuickLinksWebPart";

export interface IQuickLinksProps {
  title: string;
  type: LinkType;
  iconColor: string;
  openInNewTab?: boolean;
  forceDownload?: boolean;
}
