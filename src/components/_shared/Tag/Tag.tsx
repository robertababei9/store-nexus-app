import { PropsWithChildren } from 'react';
import { Tag } from 'antd';

type TagProps = {
    className?: string;
    icon?: any;
    color?: string;
};

export default function CustomTagComponent({
    children,
    className = "",
    icon,
    color
}: PropsWithChildren<TagProps>) {

    

    return (
        <Tag className={`${className}`} icon={icon} color={color}>
            {children}
        </Tag>
    )
}