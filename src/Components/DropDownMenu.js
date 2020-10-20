import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

function DropDownMenu(props) {
    const [currency, setCurrency] = useState('currency')

    const handleChange = (event) => {
        setCurrency(event.target.value)
    }
    return (
        <FormControl>
            <InputLabel>1 USD = 0.8110 EUR</InputLabel>
            <Select
                value={currency}
                onChange={handleChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>

            </Select>
            <TextField/>
        </FormControl>
    )

}

export default DropDownMenu