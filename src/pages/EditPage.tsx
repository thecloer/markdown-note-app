import type { Note, NoteData } from '@/types';
import { useOutletContext } from 'react-router-dom';
import useDataController from '@/hooks/useDataController';
import NoteForm from '@/components/NoteForm';

const EditPage = () => {
  const currentNote = useOutletContext<Note>();
  const { updateNote } = useDataController();

  const hanldeUpdate = (data: NoteData) => updateNote(currentNote.id, data);

  return (
    <>
      <h1 className='mb-4'>Edit Note</h1>
      <NoteForm onSubmit={hanldeUpdate} noteData={currentNote} />
    </>
  );
};

export default EditPage;
