import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import type { DataType, RawNote, Tag, Note } from '@/types';
import { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

type DataDispatch = {
  [Data in keyof DataType as `set${Capitalize<Data>}`]: Dispatch<SetStateAction<DataType[Data]>>;
};

type DataContext = { notes: Note[] } & Omit<DataType, 'notes'> & DataDispatch;

const initialContext: DataContext = {
  notes: [],
  tags: [],
  setNotes: () => {},
  setTags: () => {},
};

const DataContext = createContext<DataContext>(initialContext);

export const DataProvider = ({ children }: PropsWithChildren) => {
  const [rowNotes, setNotes] = useLocalStorage<RawNote[]>('notes', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('tags', []);

  const notes = useMemo(() => rowNotes.map(({ tagIds, ...note }) => ({ ...note, tags: tags.filter((tag) => tagIds.includes(tag.id)) })), [rowNotes, tags]);

  const value: DataContext = {
    notes,
    tags,
    setNotes,
    setTags,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);

export default DataContext;
