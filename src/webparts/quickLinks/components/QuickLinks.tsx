import * as React from 'react';
import styles from './QuickLinks.module.scss';
import { IQuickLinksProps } from './IQuickLinksProps';
import { autobind } from '@uifabric/utilities';
import { LinkType } from '../QuickLinksWebPart';

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
              {
                this.props.links.map((e, i) => {
                  let linkProps = {
                    key: e.key,
                    href: e.value
                  };
                  if (this.props.openInNewTab) {
                    linkProps["target"] = "_blank";
                  }
                  return <div key={this.props.type + "-link-" + i}>
                    <span>
                      <i style={{ color: this.props.iconColor }} className={"quick-link-icon ms-Icon ms-Icon--" + this.getIcon()} aria-hidden="true"></i>
                      <a {...linkProps}>{e.label}</a>
                    </span>
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
