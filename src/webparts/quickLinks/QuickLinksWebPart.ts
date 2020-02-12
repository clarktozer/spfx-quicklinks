import { Version } from "@microsoft/sp-core-library";
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as strings from "QuickLinksWebPartStrings";
import * as React from "react";
import * as ReactDom from "react-dom";
import { IQuickLinksProps } from "./components/IQuickLinksProps";
import { QuickLinks } from "./components/QuickLinks";

export interface IQuickLinksWebPartProps {
    description: string;
}

export default class QuickLinksWebPart extends BaseClientSideWebPart<
    IQuickLinksWebPartProps
> {
    public render(): void {
        const element: React.ReactElement<IQuickLinksProps> = React.createElement(
            QuickLinks,
            {
                description: this.properties.description
            }
        );

        ReactDom.render(element, this.domElement);
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse("1.0");
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
                                PropertyPaneTextField("description", {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
