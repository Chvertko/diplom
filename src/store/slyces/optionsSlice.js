import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (value) => {
    const response = await axios.get(
      `https://autocomplete.travelpayouts.com/places2?locale=ru&types[]=airport&types[]=city&term=${value}`
    );
    return response.data.map((country) => ({
      label: `${country.name} (${country.code})`,
      value: country.code,
    }));
  }
);

export const optionsSlice = createSlice({
  name: 'options',
  initialState: {
    options: [],
    isLoading: false,
    values: {
      from: '',
      to: '',
      whenTo: null,
      whenBack: null,
    },
    error:null,
  },
  reducers: {
    clearOptions: (state) => {
      state.options = [];
    },
    setValues: (state, action) => {
      const { id, value, type } = action.payload;
      if (type === 'country') {
        state.values[id] = value;
      }
    },
    setData: (state, action) => {
  const { id, type, value } = action.payload;
    if (type === 'date') {
      state.values[id] = value
    }
    },
  },
  extraReducers: (builder) => {
    builder
    .addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.isLoading = true;
        state.error = null;
      }
    )
    .addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to search books";
      }
    )
    .addMatcher(
      (action) => action.type.endsWith("/fulfilled"),
      (state, action) => {
        state.isLoading = false;
        state.options = action.payload
      }
    );
},
});

export const { clearOptions, setValues, setData } = optionsSlice.actions;

export default optionsSlice.reducer;
