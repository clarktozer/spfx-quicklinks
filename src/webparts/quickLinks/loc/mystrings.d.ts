declare interface IQuickLinksWebPartStrings {
    PropertyPaneDescription: string;
    BasicGroupName: string;
    LinkType: string;
    OpenInNewTab: string;
    StylingGroup: string;
    LinksGroup: string;
    IconColor: string;
    FontColor: string;
    Link: string;
    LinkLabelPlaceholder: string;
    LinkPlaceholder: string;
    DeleteLinkHover: string;
}

declare module "QuickLinksWebPartStrings" {
    const strings: IQuickLinksWebPartStrings;
    export = strings;
}
