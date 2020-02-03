import * as React from 'react';
import styles from './QuickLinks.module.scss';
import { IQuickLinksProps } from './IQuickLinksProps';
import { autobind } from '@uifabric/utilities';
import { LinkType } from '../QuickLinksWebPart';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import Radium from 'radium';
import * as tinycolor from 'tinycolor2';

@Radium
export default class QuickLinks extends React.Component<IQuickLinksProps, {}> {
  private inlineStyles: any;
  constructor(props: IQuickLinksProps) {
    super(props);
  }

  @autobind
  private createLinkStyle(hoverColor) {
    return {
      color: this.props.fontColor,
      ':hover': {
        color: tinycolor(hoverColor).darken(25).toString()
      }
    };
  }

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
    this.inlineStyles = {
      link: this.createLinkStyle(this.props.fontColor)
    };
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
                    linkProps["data-interception"] = "off";
                  }
                  return <div className={styles.linkRow} key={this.props.type + "-link-" + i}>
                    <i style={{ color: this.props.iconColor }} className={styles.quickLinkIcon + " ms-Icon ms-Icon--" + this.getIcon()} aria-hidden="true"></i>
                    <a className={styles.link} {...linkProps} style={this.inlineStyles.link}>{e.label}</a>
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
