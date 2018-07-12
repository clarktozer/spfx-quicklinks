import * as React from "react";
import { ILinksListProps } from "./ILinksListProps";
import { ILinksListState, Link } from "./ILinksListState";
import { DefaultButton, TextField } from "office-ui-fabric-react";
import { autobind } from "@uifabric/utilities";
import { get } from "@microsoft/sp-lodash-subset";
import styles from "../../../webparts/quickLinks/components/QuickLinks.module.scss";

export default class LinksList extends React.Component<ILinksListProps, ILinksListState> {
  constructor(props: ILinksListProps, state: ILinksListState) {
    super(props);

    this.state = {
      links: this.props.links != null ? this.props.links.map((e, i) => {
        return {
          key: "link-" + i,
          value: e
        } as Link;
      }) : []
    };
  }

  @autobind
  private onAddLink() {
    let current = this.state.links;
    current.push({
      key: "link-" + this.state.links.length,
      value: ""
    });
    this.setState({
      links: current
    });
  }

  @autobind
  private _getErrorMessage(value: string): string {
    return value.length == 0 ? "No value" : "";
  }

  @autobind
  private onChanged(value: string, key: string, index: number): void {
    let newLinks = this.state.links;
    let alteredLink = newLinks[index];
    alteredLink.value = value;
    this.setState({
      links: newLinks
    })
    if (this.props.onChanged) {
      this.props.onChanged(newLinks);
    }
  }

  @autobind
  private onRemove(key: string): void {
    let filtered = this.state.links.filter((link) => {
      return link.key !== key
    });
    this.setState({
      links: filtered
    });
    if (this.props.onChanged) {
      this.props.onChanged(filtered);
    }
  }

  public render() {
    return <div>
      <DefaultButton onClick={this.onAddLink}>Add</DefaultButton>
      {
        this.state.links.map((e, i) => {
          return <div className="link-container" key={"link-container" + i}>
            <i className={"remove ms-Icon ms-Icon--ChromeClose"} aria-hidden="true" onClick={() => this.onRemove(e.key)}></i>
            <TextField
              key={e.key}
              value={e.value}
              placeholder="Enter link here..."
              onChanged={(value) => this.onChanged(value, e.key, i)}
              onGetErrorMessage={this._getErrorMessage} />
          </div>
        })
      }
    </div>;
  }
}
