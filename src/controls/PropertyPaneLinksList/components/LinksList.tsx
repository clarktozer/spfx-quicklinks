import * as React from "react";
import { ILinksListProps } from "./ILinksListProps";
import { ILinksListState } from "./ILinksListState";

export default class LinksList extends React.Component<ILinksListProps, ILinksListState> {
  constructor(props: ILinksListProps, state: ILinksListState) {
    super(props);

    this.state = {

    };
  }

  public render() {
    return <div>List</div>
  }
}
