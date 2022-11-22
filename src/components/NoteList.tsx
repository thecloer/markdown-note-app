import type { Note } from '@/types';
import type { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import NoteCard from './NoteCard';

type Props = {
  filteredNotes: Note[];
};

const NoteList: FC<Props> = ({ filteredNotes }) => {
  return (
    <Row xs={1} sm={2} xl={4} className='g-3'>
      {filteredNotes.map((note) => (
        <Col key={note.id}>
          <NoteCard id={note.id} title={note.title} tags={note.tags} />
        </Col>
      ))}
    </Row>
  );
};

export default NoteList;
