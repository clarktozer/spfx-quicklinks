import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-webpart-base";
import { IPropertyPaneLinksListProps } from "./IPropertyPaneLinksListProps";
import * as React from "react";
import * as ReactDOM from 'react-dom';
import LinksList from "./components/LinksList";
import { ILinksListProps } from "./components/ILinksListProps";
import { IPropertyPaneLinksListInternalProps } from "./IPropertyPaneLinksListInternalProps";
import { autobind } from "office-ui-fabric-react";
import { Link } from "./components/ILinksListState";

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
      onRender: this.onRender.bind(this),
      links: properties.links,
      onPropertyChange: properties.onPropertyChange
    };
  }

  public render(): void {
    if (!this.elem) {
      return;
    }

    this.onRender(this.elem);
  }

  private onRender(elem: HTMLElement): void {
    if (!this.elem) {
      this.elem = elem;
    }

    const element: React.ReactElement<ILinksListProps> = React.createElement(LinksList, {
      links: this.properties.links,
      onChanged: this.onChanged
    });
    ReactDOM.render(element, elem);
  }

  @autobind
  private onChanged(links: Link[]): void {
    this.properties.onPropertyChange(this.targetProperty, links);
  }
}
