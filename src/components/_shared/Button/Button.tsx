import { PropsWithChildren } from 'react';
import { Button as AntdButton } from 'antd';

type ButtonProps = {
    onClick?: (e: any) => any;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    style?: {};  // this means object .... {} == object
    // type?: "primary" | "link" | "text" | "ghost" | "default" | "dashed" | undefined;
    type?: "primary" | "secondary" | undefined;
    icon?: any;
    shape?: "circle" | "default" | "round" | undefined
};

const secondaryTypeClassName = "font-semibold text-white bg-secondary hover:!bg-secondaryHover"

export default function Button({
    children,
    onClick = () => {},
    disabled = false,
    loading = false,
    className = "",
    style = {},
    type = "primary",
    icon,
    shape,
}: PropsWithChildren<ButtonProps>) {



  return (
    <AntdButton
        style={style}
        className={`bg-blue-500 ${type === "secondary" ? secondaryTypeClassName : ""} ${className} `}
        disabled={disabled}
        loading={loading}
        onClick={onClick}
        type="primary"
        icon={icon}
        shape={shape}
    >
        {children}
    </AntdButton>
  )
}
