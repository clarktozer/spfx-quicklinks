import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneCheckbox} from '@microsoft/sp-webpart-base';

import * as strings from 'QuickLinksWebPartStrings';
import QuickLinks from './components/QuickLinks';
import { IQuickLinksProps } from './components/IQuickLinksProps';
import { PropertyPaneLinksList } from '../../controls/PropertyPaneLinksList/PropertyPaneLinksList';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { Link } from '../../controls/PropertyPaneLinksList/components/ILinksListState';

export interface IQuickLinksWebPartProps {
  title: string;
  type: LinkType;
  iconColor: string;
  openInNewTab?: boolean;
  fontColor: string;
  initLinks: string[];
  links: Link[];
}

export enum LinkType {
  LINK = "Link",
  FILE = "File"
}
export default class QuickLinksWebPart extends BaseClientSideWebPart<IQuickLinksWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IQuickLinksProps> = React.createElement(
      QuickLinks,
      {
        title: this.properties.title,
        type: this.properties.type,
        iconColor: this.properties.iconColor,
        fontColor: this.properties.fontColor,
        openInNewTab: this.properties.openInNewTab,
        links: this.properties.links != null ? this.properties.links : [],
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('type', {
                  label: strings.LinkType,
                  options: Object.keys(LinkType).map((e) => {
                    return {
                      key: LinkType[e], text: LinkType[e]
                    };
                  }),
                  selectedKey: 'link'
                }),
                PropertyPaneCheckbox('openInNewTab', {
                  text: strings.OpenInNewTab
                })
              ]
            },
            {
              groupName: strings.StylingGroup,
              groupFields: [
                PropertyFieldColorPicker('iconColor', {
                  label: strings.IconColor,
                  selectedColor: this.properties.iconColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Inline,
                  key: 'iconColor'
                }),
                PropertyFieldColorPicker('fontColor', {
                  label: strings.FontColor,
                  selectedColor: this.properties.fontColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Inline,
                  key: 'fontColor'
                })
              ]
            },
            {
              groupName: strings.LinksGroup,
              groupFields: [
                new PropertyPaneLinksList("links", {
                  key: "links",
                  links: this.properties.links
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
