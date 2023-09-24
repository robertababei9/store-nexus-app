import React from 'react'
import { Theme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import { OptionType } from 'src/types/_shared';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




type DropdownMultipleProps = {
    defaultValue?: any;
    onChange?: (value: any) => void;
    options?: OptionType[];
    placeholder?: string;
    error?: boolean;
}

export default function DropdownMultiple({
    defaultValue = [],
    options = [],
    placeholder = "Select values"
}: DropdownMultipleProps) {

    // states
    const [selectedOptions, setSelectedOptions] = React.useState<OptionType[]>(defaultValue);

    // handlers
    const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
        const {
          target: { value },
        } = event;

        const foundOptions = options.filter(x => value.includes(x.value));
        if (foundOptions) {
            setSelectedOptions(foundOptions);
        }
        
    };


    return (
        <div>
            <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">{placeholder}</InputLabel>
                <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedOptions.map(option => option.value)}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label={placeholder} />}
                renderValue={(_) => {

                    return (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selectedOptions.map((option) => (
                                <Chip key={option.value} label={option.label} />
                            ))}
                        </Box>
                    )
                }}
                MenuProps={MenuProps}
                >
                {options.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                        // style={getStyles(option.value, personName, theme)}
                    >
                        {option.label}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>
    )
}
