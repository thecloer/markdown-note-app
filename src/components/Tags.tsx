import type { FC } from 'react';
import type { Tag } from '@/types';
import { Badge, Stack } from 'react-bootstrap';

type Props = {
  tags: Tag[];
  className?: string;
};

const Tags: FC<Props> = ({ tags, className = '' }) => {
  return (
    <>
      {tags.length > 0 ? (
        <Stack gap={1} direction='horizontal' className={`flex-wrap ${className}`}>
          {tags.map((tag) => (
            <Badge key={tag.id} className='text-truncate'>
              {tag.label}
            </Badge>
          ))}
        </Stack>
      ) : null}
    </>
  );
};

export default Tags;
