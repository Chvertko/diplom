import { Box, Container, Paper } from '@mui/material';
import  { TicketSearch } from './components/TicketSearch';
import { TicketList } from './components/TicketList';
import { useSelector } from 'react-redux';

function App() {
  const tickets = useSelector(state => state.ticket.tickets);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Paper
        elevation={3}
        sx={{
          position: 'sticky',
          top: 0,
          padding:1,
          zIndex: 1,
          backgroundColor: '#fff',
          marginBottom: tickets.length ? '10px' : 0,
        }}
      >
        <Container maxWidth="md">
          <TicketSearch />
        </Container>
      </Paper>
      <Container maxWidth="md" sx={{ flexGrow: 1, marginTop: tickets.length ? '10px' : 0 }}>
        <TicketList tickets={tickets} />
      </Container>
    </Box>
  );
}

export default App;
