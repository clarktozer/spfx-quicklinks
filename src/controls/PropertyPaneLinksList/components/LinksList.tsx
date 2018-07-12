import * as React from "react";
import { ILinksListProps } from "./ILinksListProps";
import { ILinksListState } from "./ILinksListState";
import { FieldFileTypeRenderer } from "@pnp/spfx-controls-react/lib/FieldFileTypeRenderer";

export default class LinksList extends React.Component<ILinksListProps, ILinksListState> {
  constructor(props: ILinksListProps, state: ILinksListState) {
    super(props);

    this.state = {

    };
  }

  public render() {
    return <div>
      <i className="ms-Icon ms-Icon--Link" aria-hidden="true"></i>
      <i className="ms-Icon ms-Icon--OpenFile" aria-hidden="true"></i>
    </div>;
  }
}
