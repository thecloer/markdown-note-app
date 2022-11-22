import type { FC, FormEvent } from 'react';
import type { NoteData, Tag } from '@/types';
import { useRef, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { v4 as uuidV4 } from 'uuid';
import { useDataContext } from '@/contexts/DataContext';
import useDataContoller from '@/hooks/useDataController';

type Props = {
  noteData?: NoteData;
  onSubmit: (data: NoteData) => void;
};
const defaultData: NoteData = {
  title: '',
  markdown: '',
  tags: [],
};

const NoteForm: FC<Props> = ({ onSubmit, noteData: noteData = defaultData }) => {
  const { tags } = useDataContext();
  const { createTag } = useDataContoller();
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(noteData.tags);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate('..');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control required ref={titleRef} defaultValue={noteData.title} placeholder='Title' />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                options={tags.map(({ label, id }) => ({ label, value: id }))}
                isMulti
                value={selectedTags.map(({ id, label }) => ({ label, value: id }))}
                onChange={(tags) => setSelectedTags(tags.map(({ label, value }) => ({ label, id: value })))}
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  createTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='markdown'>
          <Form.Label>Body</Form.Label>
          <Form.Control required as='textarea' placeholder='Write markdown...' rows={15} ref={markdownRef} defaultValue={noteData.markdown} />
        </Form.Group>
        <Stack direction='horizontal' gap={2} className='justify-content-end'>
          <Button type='submit' variant='primary'>
            Save
          </Button>
          <Link to='..'>
            <Button type='button' variant='outline-secondary'>
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
