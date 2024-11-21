import { useState } from 'react'
import './index.css'

import MatchingPage from './pages/matching/MatchingPage'
import DetailPage from './pages/matching/DetailPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DetailPage />
    </>
  )
}

export default App
