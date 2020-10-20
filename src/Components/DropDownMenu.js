import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xmlParser from 'xml2js'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

function DropDownMenu(props) {
    const [currency, setCurrency] = useState('')
    const [input, setInput] = useState('currency')
    const [list, setList] = useState('')


    const proxyurl = "https://cors-anywhere.herokuapp.com/"
    const url = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
    const parser = new xmlParser.Parser()

    useEffect(() => {
        axios.get(proxyurl + url, {
            "Content-Type": "application/json; charset=utf-8"
        })
            .then(response => {
                parser.parseStringPromise(response.data)
                    .then(result => {
                        setList(result['gesmes:Envelope'].Cube[0].Cube[0].Cube)
                    })
            })
        return () => {
            // need to clean up
        }
    }, [])

    const handleChange = (event) => {
        setCurrency(event.target.value)
    }

    const handleInputChange = (event) => {
        console.log(event.target.value)
        setInput(event.target.value)
    }

    console.log(list)
    return (
        <FormControl>
            <InputLabel>1 USD = 0.8110 EUR</InputLabel>
            <Select
                value={currency}
                onChange={handleChange}
            >
                {list && list.map((currency) => {
                    return (
                        <MenuItem value={10}>{currency['$'].currency}</MenuItem>
                    )

                })}
            </Select>
            <TextField value={input} onChange={handleInputChange} />
        </FormControl>
    )

}

export default DropDownMenu