import React from 'react';
import { FC, HTMLAttributes } from 'react';
import './index.scss';

interface Props extends HTMLAttributes<HTMLAnchorElement> {
    href: string;
    text: string;
    openInNewTab?: boolean;
}

const LinkComponent: FC<Props> = ({ className, href, text, openInNewTab }) => {
    const target = openInNewTab ? '_blank' : undefined;
    return <a href={href} className={className} target={target}>{text}</a>;
};

export { LinkComponent as Link };
