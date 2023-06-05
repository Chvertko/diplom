import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import  {AdapterDayjs}  from '@mui/x-date-pickers/AdapterDayjs';
import { setData } from '../store/slyces/optionsSlice';
import { TextField, createTheme } from '@mui/material';
import dayjs from 'dayjs'; // Импортируем dayjs
import { selectInputFrom, selectInputTo } from '../store/selectors';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontWeightThin: 100,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

export const DateSelect = ({ id }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();
  const inputFrom = useSelector(selectInputFrom);
  const inputTo = useSelector(selectInputTo);
  const handleDateChange = (date) => {
    if (id === 'whenTo') {
      setSelectedDate(date);
      const serializedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
      dispatch(setData({ id, type: 'date', value: serializedDate }));
      dispatch(setData({ id: 'from', type: 'country', value: inputFrom }));
      dispatch(setData({ id: 'to', type: 'country', value: inputTo }));
    } else if (id === 'whenBack') {
      setSelectedDate(date);
      const serializedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
      dispatch(setData({ id, type: 'date', value: serializedDate }));
      dispatch(setData({ id: 'from', type: 'country', value: inputFrom }));
      dispatch(setData({ id: 'to', type: 'country', value: inputTo }));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={id === 'whenTo' ? 'Когда' : 'Обратно'}
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              autoComplete: 'new-password',
            }}
            InputLabelProps={{
              style: {
                fontWeight: theme.typography.fontWeightRegular,
              },
            }}
            sx={{
              width: 200,
              '&::-webkit-scrollbar': {
                width: '8px',
                backgroundColor: '#F5F5F5',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '10px',
                backgroundColor: '#9e9e9e',
              },
              scrollbarWidth: 'thin',
              scrollbarColor: '#9e9e9e #F5F5F5',
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};
