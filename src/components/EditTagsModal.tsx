import type { FC, FormEvent } from 'react';
import type { Tag } from '@/types';
import { useState, useEffect } from 'react';
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';

type Props = {
  tags: Tag[];
  show: boolean;
  setTags: (tags: Tag[]) => void;
  onClose: () => void;
};

const EditTagsModal: FC<Props> = ({ tags, show, onClose, setTags }) => {
  const [tempTags, setTempTags] = useState(tags);
  const updateTempTag = (id: string, label: string) => setTempTags((prevTags) => prevTags.map((tag) => (tag.id === id ? { id, label } : tag)));
  const deleteTempTag = (id: string) => setTempTags((prevTags) => prevTags.filter((tag) => tag.id !== id));

  useEffect(() => {
    if (show) setTempTags(tags);
  }, [show]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setTags(tempTags);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Stack gap={2}>
            {tempTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control type='text' value={tag.label} onChange={(e) => updateTempTag(tag.id, e.target.value)} />
                </Col>
                <Col xs='auto'>
                  <Button variant='outline-danger' onClick={() => deleteTempTag(tag.id)}>
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
          <Stack direction='horizontal' className='justify-content-end mt-4'>
            <Button type='submit' variant='primary'>
              Save
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTagsModal;

// const [tempTags, setTempTags] = useState(tags)
// const id: string, label: string) => setTempTags((prevTags) => prevTags.map((tag) => (tag.id === id ? { id, label } : tag)));
// const deleteTempTag = (id: string) => setTempTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
// const submitHandler = (e: FormEvent) => {
//   e.preventDefault();
// };
