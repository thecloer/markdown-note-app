import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDataContext } from '@/contexts/DataContext';

const NoteLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes } = useDataContext();

  const note = notes.find((note) => note.id === id);
  if (note === null) navigate('/', { replace: true });

  return <Outlet context={note} />;
};

export default NoteLayout;
