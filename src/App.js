
import { Container } from '@mui/material';
import  {TicketSearch}  from './components/TicketSearch';
import { TicketList } from './components/TicketList';
import { useSelector } from 'react-redux';
import { selectTickets } from './store/selectors';







function App() {
  const tickets = useSelector(state => state.ticket.tickets);
  return (
    <Container maxWidth='md' sx={{minHeight:'97vh',minWeight:'100vw',alignItems:'center',justifyContent:'center',display:'flex',}}>
        <TicketSearch/>
        <TicketList tickets={tickets}/>
    </Container>

  );
}

export default App;
