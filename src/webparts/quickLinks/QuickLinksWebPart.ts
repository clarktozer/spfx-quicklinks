import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneCheckbox
} from '@microsoft/sp-webpart-base';

import * as strings from 'QuickLinksWebPartStrings';
import QuickLinks from './components/QuickLinks';
import { IQuickLinksProps } from './components/IQuickLinksProps';
import { PropertyPaneLinksList } from '../../controls/PropertyPaneLinksList/PropertyPaneLinksList';

export interface IQuickLinksWebPartProps {
  type: string;
}

export default class QuickLinksWebPart extends BaseClientSideWebPart<IQuickLinksWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IQuickLinksProps> = React.createElement(
      QuickLinks,
      {
        type: this.properties.type
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let type = this.properties.type;

    let allProperties = [
      PropertyPaneDropdown('type', {
        label: 'Link Type',
        options: [
          { key: 'link', text: 'Link' },
          { key: 'file', text: 'File' }
        ],
        selectedKey: 'link'
      }),
      PropertyPaneCheckbox('target', {
        text: 'Open in new tab?'
      })
    ];

    if (type == "file") {
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
              groupName: strings.BasicGroupName,
              groupFields: allProperties
            },
            {
              groupName: "Links",
              groupFields: [
                new PropertyPaneLinksList("list", {
                  label: "Links"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
