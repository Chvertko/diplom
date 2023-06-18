import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CountrySelect from './CountrySelect';
import { DateSelect } from './DateSelect';
import { fetchTickets } from '../store/slyces/ticketReducer';
import { selectInputFrom, selectInputTo, selectDateWhenTo, selectDateWhenBack, selectTickets, selectOptionDirect, selectOptionCurrency } from '../store/selectors';
import { Box, Button, Checkbox, FormControlLabel, MenuItem, Select } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import { setCurrency, setDirect } from '../store/slyces/optionsSlice';

export const TicketSearch = () => {
  const dispatch = useDispatch();
  const inputFrom = useSelector(selectInputFrom);
  const inputTo = useSelector(selectInputTo);
  const dateWhenTo = useSelector(selectDateWhenTo);
  const dateWhenBack = useSelector(selectDateWhenBack);
  const direct = useSelector(selectOptionDirect);
  const currency = useSelector(selectOptionCurrency);
  const tickets = useSelector(selectTickets)
  const [isDirect, setIsDirect] = useState(true);
  const [disabled, setDisabled] = useState(false)
  const handleSearch = () => {
    const searchParams = {
      from: inputFrom,
      to: inputTo,
      when: dateWhenTo || '',
      back: dateWhenBack || '',
      direct: direct || false,
      currency: currency,
    };

    dispatch(fetchTickets(searchParams));
  };

  const toggleDirect = () => {
    setIsDirect(!isDirect);
    dispatch(setDirect(isDirect));
  };

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    dispatch(setCurrency(selectedCurrency));
  };
  useEffect(() => {
    dispatch(fetchTickets({ inputFrom, inputTo, dateWhenTo, dateWhenBack, direct, currency }));
    tickets.length > 0 ? setDisabled(true) : setDisabled(false)
  }, [currency, dispatch,tickets]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <CountrySelect id="from" label="Откуда" />
        <CountrySelect id="to" label="Куда" />
        <DateSelect id="whenTo" />
        <DateSelect id="whenBack" />
        <Button variant="contained" onClick={handleSearch}>
          Искать
        </Button>
      </Box>
      <Box>
        <FormControlLabel control={<Checkbox onChange={toggleDirect} />} label="Без пересадок" />
        <FormControlLabel
          control={
            <Select sx={{ padding: '-10px' }} value={currency} onChange={handleCurrencyChange} variant="outlined" disabled={disabled}>
              <MenuItem value="mdl">MDL</MenuItem>
              <MenuItem value="rub">RUB</MenuItem>
              <MenuItem value="usd">USD</MenuItem>
              <MenuItem value="eur">EUR</MenuItem>
            </Select>
          }
          label="Валюта"
        />
      </Box>
    </Box>
  );
};
