import { PropsWithChildren } from 'react';
import { Button as AntdButton } from 'antd';

type ButtonProps = {
    onClick?: (e: any) => any;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    style?: {};  // this means object .... {} == object
    // type?: "primary" | "link" | "text" | "ghost" | "default" | "dashed" | undefined;
    type?: "primary" | "secondary" | "danger" | undefined;
    icon?: any;
    shape?: "circle" | "default" | "round" | undefined;
    size?: "large" | "middle" | "small"
};

const primaryTypeClassName = "bg-primary hover:!bg-primaryHover";
const secondaryTypeClassName = "font-semibold text-white !bg-secondary hover:!bg-secondaryHover";
const dangerTypeClass = "bg-red-500 hover:!bg-red-600"

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
    size = "middle"
}: PropsWithChildren<ButtonProps>) {



  return (
    <AntdButton
        style={style}
        className={
          `bg-blue-500 
          ${type === "primary" && primaryTypeClassName}
          ${type === "secondary" && secondaryTypeClassName}
          ${type === "danger" && dangerTypeClass}
          ${className}  
          active:scale-90`
        }
        disabled={disabled || loading}
        loading={loading}
        onClick={onClick}
        type="primary"
        icon={icon}
        shape={shape}
        size={size}
    >
        {children}
    </AntdButton>
  )
}
