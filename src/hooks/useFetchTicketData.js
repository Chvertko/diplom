import { useState, useEffect } from 'react';

export const useFetchTicketData = (from, to, when, back) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${from}&destination=${to}&currency=usd&departure_at=${when}&return_at=${back}&sorting=price&direct=true&limit=10&token=c7e865504498cc0afcc7945f2f3acd8d`)
      .then(response => response.json())
      .then(data => setTickets(data));
  }, [from, to, when, back]);

  return tickets;
};
