import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Notes from '../components/Notes';
import Navbar from '../components/Navbar';
import AddNote from '../components/AddNotes';
import NoteDetails from '../components/NoteDetails';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes/:folderId" element={<Notes />} />
        <Route path="/note/:noteId" element={<NoteDetails />} />
        <Route path='/notes/newnote' element={<AddNote />}/>
      </Routes>
    </>
  )
}

export default App
