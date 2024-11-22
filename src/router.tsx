import { createBrowserRouter } from 'react-router-dom';

import MatchingPage from './pages/matching/MatchingPage';

export const router = createBrowserRouter([
  {
    path: '/matching',
    Component: MatchingPage
  }
]);