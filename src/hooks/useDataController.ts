import type { NoteData, Tag } from '@/types';
import { v4 as uuidV4 } from 'uuid';
import { useDataContext } from '@/contexts/DataContext';

const useDataController = () => {
  const { setNotes, setTags } = useDataContext();

  return {
    createNote: ({ tags, ...data }: NoteData) => setNotes((prevNotes) => [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) }]),
    updateNote: (id: string, { tags, ...data }: NoteData) =>
      setNotes((prevNotes) => prevNotes.map((note) => (note.id === id ? { ...note, ...data, tagIds: tags.map((tag) => tag.id) } : note))),
    deleteNote: (id: string) => setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)),

    createTag: (tag: Tag) => setTags((prevTags) => [...prevTags, tag]),
    // updateTag: (id: string, label: string) => setTags((prevTags) => prevTags.map((tag) => (tag.id === id ? { id, label } : tag))),
    // deleteTag: (id: string) => setTags((prevTags) => prevTags.filter((tag) => tag.id !== id)),
  };
};

export default useDataController;
