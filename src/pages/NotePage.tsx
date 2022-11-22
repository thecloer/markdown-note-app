import type { Note } from '@/types';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Button, Col, Row, Stack } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import useDataController from '@/hooks/useDataController';
import Tags from '@/components/Tags';

const NotePage = () => {
  const { id, markdown, tags, title } = useOutletContext<Note>();
  const { deleteNote } = useDataController();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteNote(id);
    navigate('/');
  };

  return (
    <>
      <Row className='alitn-items-center mb-4'>
        <Col>
          <h1>{title}</h1>
          <Tags tags={tags} />
        </Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to={`/${id}/edit`}>
              <Button variant='primary'>Edit</Button>
            </Link>
            <Button variant='outline-danger' onClick={handleDelete}>
              Delete
            </Button>
            <Link to={`/`}>
              <Button variant='outline-secondary'>Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>

      <ReactMarkdown>{markdown}</ReactMarkdown>
    </>
  );
};

export default NotePage;
