import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async ({ from, to, when, back, currency, direct }) => { 
    const response = await axios.get(
      `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${from}&destination=${to}&currency=${currency}&departure_at=${when}&return_at=${back}&sorting=price&direct=${direct}&limit=10&token=c7e865504498cc0afcc7945f2f3acd8d`
    )
    return response.data.data.map((ticket) => ({
      ...ticket,
    }));
  }
);

export const ticketReducer = createSlice({
  name: 'ticket',
  initialState: {
    tickets: [],
    isLoading: false,
    error: null
  },
  reducers: {
    clearTicketArray: (state) => {
      state.tickets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("tickets/fetchTickets/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("tickets/fetchTickets/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message ?? "Failed to search books";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("tickets/fetchTickets/fulfilled"),
        (state, action) => {
          state.isLoading = false;
          state.tickets = action.payload
        }
      );
  },
});

export default ticketReducer.reducer;
