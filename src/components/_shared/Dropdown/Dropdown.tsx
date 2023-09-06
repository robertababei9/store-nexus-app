import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import { OptionType } from 'src/types/_shared';

type DropdownProps = {
    defaultValue?: any;
    onChange?: (value: any) => void;
    options?: OptionType[];
    placeholder?: string;
}

export default function Dropdown({
    defaultValue = "",
    onChange = (value) => {},
    options = [],
    placeholder = "Select a value"
}: DropdownProps) {

    const [val, setVal] = useState<any>(defaultValue);

    const handleChange = (event: SelectChangeEvent) => {
        const val = event.target.value as string;
        
        setVal(val);
        onChange(val);
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
            <Select
                // defaultValue=''
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className='text-left'
                value={val}
                label={placeholder}
                onChange={handleChange}
                >
                    {
                        options.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))
                    }
            </Select>
        </FormControl> 



    )
}