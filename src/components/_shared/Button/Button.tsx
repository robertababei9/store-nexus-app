import { PropsWithChildren } from 'react';
import { Button as AntdButton } from 'antd';

type ButtonProps = {
    onClick?: () => any;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    style?: {};  // this means object .... {} == object
    type: "primary" | "link" | "text" | "ghost" | "default" | "dashed" | undefined;
    
};

export default function Button({
    children,
    onClick = () => {},
    disabled = false,
    loading = false,
    className = "",
    style = {},
    type = "primary"
}: PropsWithChildren<ButtonProps>) {
  return (
    <AntdButton
        style={style}
        className={`bg-blue-500 ${className}`}
        disabled={disabled}
        loading={loading}
        onClick={onClick}
        type={type}
    >
        {children}
    </AntdButton>
  )
}
