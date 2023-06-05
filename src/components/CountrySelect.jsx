import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, Box, CircularProgress, createTheme,TextField, ThemeProvider } from '@mui/material';
import { fetchCountries, clearOptions, setValues } from '../store/slyces/optionsSlice';
import { selectOptions,selectIsLoading } from '../store/selectors';

const CountrySelect = (props) => {
  const {id,label} = props
  const theme = createTheme({
    typography:{
      fontFamily: 'Roboto, sans-serif',
      fontWeightThin: 100,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
  })
  const dispatch = useDispatch();
  const options = useSelector(selectOptions);
  const isLoading = useSelector(selectIsLoading);

  const onInputChange = (event, value) => {
    if (!value) {
      dispatch(clearOptions());
    } else {
      dispatch(fetchCountries(value));
    }
    if (id === 'from') {
      const selectedCountry = options.find((country) => country.label === value);
      if (selectedCountry) {
        dispatch(setValues({ id, value: selectedCountry.value, type: 'country' }));
      }
    } else {
      const selectedCountry = options.find((country) => country.label === value);
      if (selectedCountry) {
        const iataCode = selectedCountry.value;
        dispatch(setValues({ id, value: iataCode, type: 'country' }));
      }
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        id="country-select-demo"
        autoHighlight
        isOptionEqualToValue={(option, value) => option.code === value.code}
        sx={{
          width: 200,
          '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: "#F5F5F5",
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: "10px",
            backgroundColor: "#9e9e9e",
          },
          scrollbarWidth: 'thin',
          scrollbarColor: "#9e9e9e #F5F5F5",
        }}
        options={options}
        loading={isLoading}
        getOptionLabel={(option) => option.label ? option.label : ""}
        renderOption={(props,{label,code}) => (
          <Box component="li" key={code} 
            {...props}>
            {label} {code}
          </Box>
        )}
        renderInput={(params) => (
          <TextField 
          {...params} 
          label={label === 'Откуда' ? label : "Куда"}
          InputLabelProps={{
            style:{
              fontWeight:theme.typography.fontWeightRegular
            }
          }}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            autoComplete: 'new-password',
            endAdornment: (
              <>
                {isLoading ? <CircularProgress  size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }} />
        )}
        onInputChange={onInputChange}
      />
      
    </ThemeProvider>
  );
};

export default CountrySelect;
