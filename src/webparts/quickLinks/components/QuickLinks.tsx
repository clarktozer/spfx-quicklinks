import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Link } from "office-ui-fabric-react/lib/Link";
import * as React from "react";
import * as tinycolor from "tinycolor2";
import { IQuickLinksProps } from "../../models";
import styles from "./QuickLinks.module.scss";

export const QuickLinks: React.FC<IQuickLinksProps> = ({ links, fontColor, iconColor }) => (
    <div className={styles.quickLinks}>
        {links.map(link => (
            <div className={styles.linkRow}>
                <Icon className={styles.quickLinkIcon} style={{ color: iconColor }} iconName="Link" />
                <Link
                    className={styles.link}
                    href={link.url}
                    target={link.openInNewTab ? "_blank" : ""}
                    data-interception={link.openInNewTab ? "off" : "propagate"}
                    style={{
                        color: fontColor
                    }}
                    styles={{
                        root: {
                            selectors: {
                                ":hover": {
                                    color: tinycolor(fontColor)
                                        .darken(25)
                                        .toString()
                                }
                            }
                        }
                    }}
                >
                    {link.text}
                </Link>
            </div>
        ))}
    </div>
);
