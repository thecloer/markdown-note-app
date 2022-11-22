import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { DataProvider } from '@/contexts/DataContext';

const App = () => {
  return (
    <Container className='my-4'>
      <DataProvider>
        <Outlet />
      </DataProvider>
    </Container>
  );
};

export default App;
