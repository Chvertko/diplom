import React from 'react';
import { useSelector } from 'react-redux';
import { selectTickets } from '../store/selectors';

export const TicketList = ({tickets}) => {

  return (
    <div>
      {tickets.map((ticket) => (
        <div key={ticket.flight_number}>
          <p>Origin: {ticket.origin}</p>
          <p>Destination: {ticket.destination}</p>
          <p>Price: {ticket.price}</p>
          {/* Вывод остальных свойств билета */}
        </div>
      ))}
    </div>
  );
}


