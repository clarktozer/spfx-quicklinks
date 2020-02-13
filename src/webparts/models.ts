export interface IQuickLinksProps {
    title: string;
    type: string;
    iconColor: string;
    fontColor: string;
    links: ILink[];
}

export interface ILink {
    url: string;
    text: string;
    openInNewTab?: boolean;
}
