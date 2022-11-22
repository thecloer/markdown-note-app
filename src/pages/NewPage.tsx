import useDataController from '@/hooks/useDataController';
import NoteForm from '@/components/NoteForm';

const NewPage = () => {
  const { createNote } = useDataController();
  return (
    <>
      <h1 className='mb-4'>New Note</h1>
      <NoteForm onSubmit={createNote} />
    </>
  );
};

export default NewPage;
