import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
// import { useState } from 'react'
import { OptionType } from 'src/types/_shared';

type DropdownProps = {
    defaultValue?: any;
    onChange?: (value: any) => void;
    options?: OptionType[];
    placeholder?: string;
    error?: boolean;
    loading?: boolean;
}

export default function Dropdown({
    defaultValue = "",
    onChange = (value) => {},
    options = [],
    placeholder = "Select a value",
    error = false,
    loading = false
}: DropdownProps) {

    // const [val, setVal] = useState<any>(defaultValue);

    // const handleChange = (event: SelectChangeEvent) => {
    //     const val = event.target.value as string;
        
    //     setVal(val);
    //     onChange(val);
    // }

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
            {/* How is it possible that MUI -> Select doesn't have a Loading prop ... Like WTF */}
            <Select
                // defaultValue=''
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className='text-left'
                value={defaultValue}
                label={placeholder}
                error={error}
                onChange={onChange}
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