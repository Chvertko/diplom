import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CountrySelect from './CountrySelect';
import { DateSelect } from './DateSelect';
import { fetchTickets} from '../store/slyces/ticketReducer';
import { selectInputFrom, selectInputTo, selectDateWhenTo, selectDateWhenBack, selectTickets } from '../store/selectors'

export const TicketSearch = () => {
  const dispatch = useDispatch();
  const inputFrom = useSelector(selectInputFrom);
  const inputTo = useSelector(selectInputTo);
  const dateWhenTo = useSelector(selectDateWhenTo);
  const dateWhenBack = useSelector(selectDateWhenBack);
  const handleSearch = () => {
    if (inputFrom && inputTo && dateWhenTo && dateWhenBack) {
      dispatch(fetchTickets({ from: inputFrom, to: inputTo, when: dateWhenTo, back: dateWhenBack }));
  };
  }
  return (
    <div>
      <CountrySelect id="from" label="Откуда" />
      <CountrySelect id="to" label="Куда" />
      <DateSelect id="whenTo" />
      <DateSelect id="whenBack" />
      <button onClick={handleSearch}>search</button>
    </div>
  );
};


