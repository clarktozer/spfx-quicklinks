import { escape } from "@microsoft/sp-lodash-subset";
import * as React from "react";
import { IQuickLinksProps } from "./IQuickLinksProps";
import styles from "./QuickLinks.module.scss";

export default class QuickLinks extends React.Component<IQuickLinksProps, {}> {
    public render(): React.ReactElement<IQuickLinksProps> {
        return (
            <div className={styles.quickLinks}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.title}>
                                Welcome to SharePoint!
                            </span>
                            <p className={styles.subTitle}>
                                Customize SharePoint experiences using Web
                                Parts.
                            </p>
                            <p className={styles.description}>
                                {escape(this.props.description)}
                            </p>
                            <a
                                href="https://aka.ms/spfx"
                                className={styles.button}
                            >
                                <span className={styles.label}>Learn more</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
