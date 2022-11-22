import type { Tag } from '../types';
import { useMemo, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { useDataContext } from '@/contexts/DataContext';
import NoteList from '@/components/NoteList';
import EditTagsModal from '@/components/EditTagsModal';

const HomePage = () => {
  const { tags, notes, setTags } = useDataContext();
  const [title, setTitle] = useState('');
  const [isEditTagsModalOpen, setIsEditTagsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filteredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) &&
          (selectedTags.length === 0 || selectedTags.every((tag) => note.tags.some((noteTag) => noteTag.id === tag.id)))
      ),
    [title, selectedTags, notes]
  );

  const toggleEditTagsModal = () => setIsEditTagsModalOpen((prev) => !prev);

  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to='/new'>
              <Button variant='primary'>Create</Button>
            </Link>
            <Button variant='outline-secondary' onClick={toggleEditTagsModal}>
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>

      <Form>
        <Row className='mb-4'>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Search by title...' />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                options={tags.map(({ label, id }) => ({ label, value: id }))}
                value={selectedTags.map(({ id, label }) => ({ label, value: id }))}
                onChange={(tags) => setSelectedTags(tags.map(({ label, value }) => ({ label, id: value })))}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <NoteList filteredNotes={filteredNotes} />

      <EditTagsModal show={isEditTagsModalOpen} tags={tags} setTags={setTags} onClose={toggleEditTagsModal} />
    </>
  );
};

export default HomePage;
