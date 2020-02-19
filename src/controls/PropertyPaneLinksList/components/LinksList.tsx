import { isEmpty } from "@microsoft/sp-lodash-subset";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import React, { useEffect, useState } from "react";
import { ManualLink } from "./ManualLink";

export interface ILinksListProps {
    links: ILink[];
    onChange: (value: ILink[]) => void;
}

export interface ILinksListState {
    links: ILink[];
}

export interface ILink {
    key: string;
    value: string;
    label: string;
}

export const LinksList: React.FC<ILinksListProps> = ({ links, onChange }) => {
    const [items, setItems] = useState([]);

    const resetKeys = (toReset: ILink[]) =>
        toReset.map((e, i) => ({
            ...e,
            key: "link-" + i
        }));

    useEffect(() => {
        setItems(resetKeys(links));
    }, [links]);

    const onAddLink = () => {
        setItems(currentLinks => [
            ...currentLinks,
            {
                key: "link-" + links.length,
                value: "",
                label: ""
            }
        ]);
    };

    const onChanged = (name: string, value: string, key: string) => {
        setItems(currentLinks => {
            let changedLink = currentLinks.find(link => link.key === key);
            changedLink[name] = value;

            if (onChange) {
                onChange(currentLinks);
            }

            return currentLinks;
        });
    };

    const onRemove = (key: string) => {
        setItems(currentLinks => {
            let filtered = currentLinks.filter(link => link.key !== key);
            let resetFiltered = resetKeys(filtered);

            if (onChange) {
                onChange(resetFiltered);
            }

            return resetFiltered;
        });
    };

    return (
        <div className="linkListPropertyPane">
            <DefaultButton onClick={onAddLink}>Add</DefaultButton>
            {!isEmpty(items) && items.map(item => <ManualLink link={item} onChangeLink={onChanged} onRemoveLink={onRemove} />)}
        </div>
    );
};
