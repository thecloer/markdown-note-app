import type { FC } from 'react';
import type { Note } from '@/types';
import { Card, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './NoteCard.module.css';
import Tags from './Tags';

type SimplifiedNote = Omit<Note, 'markdown'>;

const NoteCard: FC<SimplifiedNote> = ({ id, title, tags }) => {
  return (
    <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
      <Card.Body>
        <Stack gap={2} className='align-items-center justify-content-center h-100'>
          <span className='fs-5'>{title}</span>
          <Tags tags={tags} className='justify-content-center ' />
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
