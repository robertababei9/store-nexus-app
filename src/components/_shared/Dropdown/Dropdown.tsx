import { CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
// import { useState } from 'react'
import { OptionType } from 'src/types/_shared';

type DropdownProps = {
    defaultValue?: any;
    onChange?: (value: any) => void;
    options?: OptionType[];
    placeholder?: string;
    error?: boolean;
    loading?: boolean;
    containerClassName?: string;
}

export default function Dropdown({
    defaultValue = "",
    onChange = (value) => {},
    options = [],
    placeholder = "Select a value",
    error = false,
    loading = false,
    containerClassName = "",
}: DropdownProps) {

    return (
        <FormControl className={`w-full ${containerClassName}`}>
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
                // TODO: Add loading icon --- you will also have to add back the Carrot icon 
                // IconComponent={() => (
                //     loading ? <CircularProgress size={20} className='mr-4 bg-red-500 text-gray-100' /> : null
                // )}
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