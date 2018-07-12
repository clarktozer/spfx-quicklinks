import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneCheckbox,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'QuickLinksWebPartStrings';
import QuickLinks from './components/QuickLinks';
import { IQuickLinksProps } from './components/IQuickLinksProps';
import { PropertyPaneLinksList } from '../../controls/PropertyPaneLinksList/PropertyPaneLinksList';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { get, update } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react';
import { Link } from '../../controls/PropertyPaneLinksList/components/ILinksListState';

export interface IQuickLinksWebPartProps {
  title: string;
  type: LinkType;
  iconColor: string;
  openInNewTab?: boolean;
  forceDownload?: boolean;
  links: string[];
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
        forceDownload: this.properties.forceDownload,
        openInNewTab: this.properties.openInNewTab,
        links: this.properties.links
      }
    );

    ReactDom.render(element, this.domElement);
  }

  // protected get disableReactivePropertyChanges(): boolean {
  //   return true;
  // }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  @autobind
  private onLinksChange(propertyPath: string, links: Link[]): void {
    update(this.properties, propertyPath, (): any => {
      return links.map((e)=>{
        return e.value;
      });
    });
    this.render();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    console.log(this.properties);
    let allProperties = [
      PropertyPaneTextField("title", {
        value: this.properties.title,
        label: "Title"
      }),
      PropertyPaneDropdown('type', {
        label: 'Link Type',
        options: Object.keys(LinkType).map((e) => {
          return {
            key: LinkType[e], text: LinkType[e]
          }
        }),
        selectedKey: 'link'
      }),
      PropertyPaneCheckbox('openInNewTab', {
        text: 'Open in new tab?'
      })
    ];

    if (this.properties.type == LinkType.FILE) {
      allProperties.push(
        PropertyPaneCheckbox('forceDownload', {
          text: 'Force download?'
        })
      );
    }

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: "Basic Settings",
              groupFields: allProperties
            },
            {
              groupName: "Styling",
              groupFields: [
                PropertyFieldColorPicker('iconColor', {
                  label: 'Icon Color',
                  selectedColor: this.properties.iconColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  disabled: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Inline,
                  key: 'iconColor',
                })
              ]
            },
            {
              groupName: "Links",
              groupFields: [
                new PropertyPaneLinksList("links", {
                  key: "links",
                  links: this.properties.links,
                  onPropertyChange: this.onLinksChange
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
