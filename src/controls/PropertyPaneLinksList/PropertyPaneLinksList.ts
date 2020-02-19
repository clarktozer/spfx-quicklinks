import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-property-pane";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ILink, ILinksListProps, LinksList } from "./components/LinksList";
import { IPropertyPaneLinksListInternalProps } from "./IPropertyPaneLinksListInternalProps";
import { IPropertyPaneLinksListProps } from "./IPropertyPaneLinksListProps";

export class PropertyPaneLinksList implements IPropertyPaneField<IPropertyPaneLinksListProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneLinksListInternalProps;
    private elem: HTMLElement;

    constructor(targetProperty: string, properties: IPropertyPaneLinksListProps) {
        this.targetProperty = targetProperty;
        this.properties = {
            key: properties.key,
            onRender: this.onRender,
            links: properties.links
        };
    }

    private onRender = (elem: HTMLElement) => {
        if (!this.elem) {
            this.elem = elem;
        }

        const element: React.ReactElement<ILinksListProps> = React.createElement(LinksList, {
            links: this.properties.links,
            onChange: this.onChange
        });

        ReactDOM.render(element, elem);
    };

    private onChange = (value: ILink[]) => {
        this.properties.onPropertyChange(this.targetProperty, value);
    };
}
