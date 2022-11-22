import type { Dispatch, SetStateAction } from 'react';

export type Tag = {
  id: string;
  label: string;
};
export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};
export type Note = {
  id: string;
} & NoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
export type RawNote = {
  id: string;
} & RawNoteData;

export type DataType = {
  notes: RawNote[];
  tags: Tag[];
};

/**
 *
 * data context
 *
 */
type SingularDataType = keyof DataType extends `${infer Singular}s` ? Singular : never;
type PluralDataType<T extends SingularDataType> = `${T}s`;
type DataControllerPrefix = ['create', 'update', 'delete'];
type DataDispatch = {
  [Data in SingularDataType as `${DataControllerPrefix[number]}${Capitalize<Data>}`]: Dispatch<SetStateAction<DataType[PluralDataType<Data>]>>;
};
type DataContext = { notes: Note[] } & Omit<DataType, 'notes'> & DataDispatch;
