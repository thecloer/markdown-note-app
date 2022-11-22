import { createBrowserRouter } from 'react-router-dom';
import NoteLayout from '@/layouts/NoteLayout';
import App from '@/App';
import { EditPage, HomePage, NewPage, NotePage } from '@/pages';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'new',
          element: <NewPage />,
        },
        {
          path: ':id',
          element: <NoteLayout />,
          children: [
            {
              index: true,
              element: <NotePage />,
            },
            {
              path: 'edit',
              element: <EditPage />,
            },
          ],
        },
        {
          path: '*',
          // loader: () => redirect('/'),
          element: <h1>404 | Not Found</h1>,
        },
      ],
    },
  ],
  { basename: '/git-page/markdown-note-app/' }
);

export default router;
