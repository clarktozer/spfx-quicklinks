import * as React from 'react';
import styles from './QuickLinks.module.scss';
import { IQuickLinksProps } from './IQuickLinksProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { FieldFileTypeRenderer } from "@pnp/spfx-controls-react/lib/FieldFileTypeRenderer";
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
    return (
      <div className={styles.quickLinks}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.type)}{escape(this.props.iconColor)}</p>
              {
                this.props.links.map((e, i)=>{
                  return <div key={this.props.type + "-link-" + i}>
                  <i style={{ color: this.props.iconColor }} className={"ms-Icon ms-Icon--" + this.getIcon()} aria-hidden="true"></i>
                  {e}</div>
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
