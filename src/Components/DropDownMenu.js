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
    const [currency, setCurrency] = useState({currency: '', rate:''})
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
                        const dataArray = result['gesmes:Envelope'].Cube[0].Cube[0].Cube
                        const sortedArray = dataArray.sort((a, b) => {
                            const currencyA = a['$'].currency.toUpperCase()
                            const currencyB = b['$'].currency.toUpperCase()
                            if (currencyA < currencyB) return -1
                            if (currencyA > currencyB) return 1
                            return 0
                        })
                        setList(sortedArray)
                    })
                    .catch(error => {
                        console.log(`${error}: failed to parse xml response to JSON`)
                    })
            })
            .catch(error => {
                console.log(`${error}: failed currency api/xml response`)
            })
        return () => {
            // need to clean up
        }
    }, [])



    const handleChange = (event) => {
        setCurrency( 
            {
                currency: event.target.value.currency,
                rate: event.target.value.rate
            }
        )
    }

    const handleInputChange = (event) => {
        setInput(event.target.value)
    }
  
    return (
        <FormControl>
            <InputLabel>{currency.currency} = {currency.rate}</InputLabel>
            <Select
                value={currency.currency}
                onChange={handleChange}
            >
                {list && list.map((currency) => {
                    return (
                        <MenuItem key={currency['$'].currency} value={currency['$']}>{currency['$'].currency}</MenuItem>
                    )

                })}
            </Select>
            <TextField value={input} onChange={handleInputChange} />
        </FormControl>
    )

}

export default DropDownMenu