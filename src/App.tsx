import { useState } from 'react'
import './index.css'

import MatchingPage from './pages/matching/MatchingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MatchingPage />
    </>
  )
}

export default App
