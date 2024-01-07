import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd'
import { PropsWithChildren } from 'react'


type SearchProps = {
    placeholder?: string;
    onChange?: (value: string) => any;
    style?: object;
    className?: string;
    allowClear?: boolean;
};


export default function Search({
    placeholder="Search...",
    onChange = () => {},
    style = {},
    className = "",
    allowClear = false
}: PropsWithChildren<SearchProps>) {


  return (
    <Input 
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        style={style}
        className={`hover:!border-secondary ${className}`}
        allowClear={allowClear}      
        prefix={<SearchOutlined />}  
    />
  )
}
