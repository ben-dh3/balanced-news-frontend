// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import Headlines from './pages/Headlines';
import Articles from './pages/Articles';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Headlines />,
  },
  {
    path: '/story/:storyId',
    element: <Articles />,
  },
]);

export default router;