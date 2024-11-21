import { createBrowserRouter } from 'react-router-dom';

import MatchingPage from './pages/matching/MatchingPage';
import DetailPage from './pages/matching/DetailPage';

export const router = createBrowserRouter([
  {
    path: '/matchingPage',
    Component: MatchingPage
  },
  {
    path: '/datailPage',
    Component: DetailPage
  }
]);