import React from 'react';
import { FC, HTMLAttributes } from 'react';
import './index.css';

interface Props extends HTMLAttributes<HTMLLabelElement> {
    value: string;
}

const LabelComponent: FC<Props> = ({ className, value }) => {
    return <label className={className}>{value}</label>;
};

export { LabelComponent as Label };
