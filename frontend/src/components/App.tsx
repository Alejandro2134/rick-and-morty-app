import CharacterDetail from './CharacterDetail/CharacterDetail'
import CharacterLists from './CharacterLists/CharacterLists'
import { Routes, Route } from 'react-router'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CharacterLists />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
    </Routes>
  )
}

export default App
