import React from 'react';
import { Box, Button } from '@mui/material';
import { CardTicket } from './CardTicket';

export const TicketList = ({ tickets }) => {

  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {tickets.map((ticket) => (
          <CardTicket ticket={ticket} key={ticket.id} />
        ))}
      </Box>
  );
};
