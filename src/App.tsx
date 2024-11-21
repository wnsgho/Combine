import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import Announcement from './pages/guide/Announcement'
import QAndA from './pages/guide/QAndA'
import Facilities from './pages/guide/Facilities'
import WalkingCourse from './pages/guide/WalkingCourse'
import Announcementpost from './pages/guide/Announcementpost'
import QAandApost from './pages/guide/QAandApost'
import Announcementpostcreate from './pages/guide/Announcementpostcreate'
import QAandApostcreate from './pages/guide/QAandApostcreate'

const router = createBrowserRouter([
  {
    path : "/guide",
    element : <Announcement/>
  },
  {
    path : "/guide/announcement",
    element : <Announcement/>
  },
  {
    path : "/guide/qna",
    element : <QAndA/>
  },
  {
    path : "/guide/facilities",
    element : <Facilities/>
  },
  {
    path : "/guide/walking-course",
    element : <WalkingCourse/>
  },
  {
    path : "/guide/announcement/postId",
    element : <Announcementpost/>
  },
  {
    path : "/guide/qna/postId",
    element : <QAandApost/>
  },
  {
    path : "/guide/announcement/create",
    element : <Announcementpostcreate/>
  },
  {
    path : "/guide/qna/create",
    element : <QAandApostcreate/>
  },
])

function App() {
  return <RouterProvider router={router} />;
  
}

export default App
