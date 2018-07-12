import * as React from 'react';
import styles from './QuickLinks.module.scss';
import { IQuickLinksProps } from './IQuickLinksProps';
import { autobind } from '@uifabric/utilities';
import { LinkType } from '../QuickLinksWebPart';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

export default class QuickLinks extends React.Component<IQuickLinksProps, {}> {

  @autobind
  public getIcon() {
    let icon = "";
    switch (this.props.type) {
      case LinkType.FILE:
        icon = "OpenFile";
        break;
      default:
        icon = "Link";
    }
    return icon;
  }

  public render(): React.ReactElement<IQuickLinksProps> {
    console.log(this.props);
    return (
      <div className={"ms-Grid " + styles.quickLinks}>
        <div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12">
              <WebPartTitle displayMode={this.props.displayMode}
                title={this.props.title}
                updateProperty={this.props.updateProperty} />
              {
                this.props.links.map((e, i) => {
                  let linkProps = {
                    key: e.key,
                    href: e.value
                  };
                  if (this.props.openInNewTab) {
                    linkProps["target"] = "_blank";
                  }
                  return <div className="link-row" key={this.props.type + "-link-" + i}>
                    <i style={{ color: this.props.iconColor }} className={"quick-link-icon ms-Icon ms-Icon--" + this.getIcon()} aria-hidden="true"></i>
                    <a className="link" {...linkProps} style={{ color: this.props.fontColor }}>{e.label}</a>
                  </div>;
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
