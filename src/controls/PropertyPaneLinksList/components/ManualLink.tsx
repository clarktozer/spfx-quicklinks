import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Label } from "office-ui-fabric-react/lib/Label";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as strings from "QuickLinksWebPartStrings";
import * as React from "react";
import { ILink } from "./LinksList";

interface IManualLinkProps {
    link: ILink;
    onRemoveLink: (key: string) => void;
    onChangeLink: (name: string, value: string, key: string) => void;
}

export const ManualLink: React.FC<IManualLinkProps> = ({ link, onChangeLink, onRemoveLink }) => {
    const onRemove = () => onRemoveLink(link.key);

    const onChange = (event: React.FormEvent<HTMLInputElement>, newValue?: string) => {
        const name = event.currentTarget.getAttribute("name");
        if (name) {
            onChangeLink(name, newValue, link.key);
        }
    };

    return (
        <div className="linkContainer">
            <IconButton title={strings.DeleteLinkHover} iconProps={{ iconName: "ChromeClose" }} aria-hidden="true" onClick={onRemove} />
            <Label>{strings.Link}</Label>
            <TextField
                className="linkLabel"
                name="label"
                value={link.label}
                placeholder={strings.LinkLabelPlaceholder}
                onChange={onChange}
            />
            <TextField className="listLink" name="value" value={link.value} placeholder={strings.LinkPlaceholder} onChange={onChange} />
        </div>
    );
};
