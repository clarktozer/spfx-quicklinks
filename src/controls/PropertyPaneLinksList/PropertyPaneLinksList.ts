import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-webpart-base";
import { IPropertyPaneLinksListProps } from "./IPropertyPaneLinksListProps";
import * as React from "react";
import * as ReactDOM from 'react-dom';
import LinksList from "./components/LinksList";
import { ILinksListProps } from "./components/ILinksListProps";
import { IPropertyPaneLinksListInternalProps } from "./IPropertyPaneLinksListInternalProps";
import { autobind } from "office-ui-fabric-react";

export class PropertyPaneLinksList implements IPropertyPaneField<IPropertyPaneLinksListProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public shouldFocus?: boolean;
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

  @autobind
  private onRender(elem: HTMLElement, ctx?, changeCallback?: (targetProperty: string, value: any) => void): void {
    if (!this.elem) {
      this.elem = elem;
    }

    const element: React.ReactElement<ILinksListProps> = React.createElement(LinksList, {
      links: this.properties.links,
      onChanged: changeCallback,
      targetProperty: this.targetProperty
    });
    ReactDOM.render(element, elem);
  }
}
