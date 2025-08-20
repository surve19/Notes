import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Notes from '../components/Notes/Notes';
import Navbar from '../components/Navbar';
import AddNote from '../components/AddNotes';
import NoteDetails from '../components/NoteDetails';
import EditNote from '../components/EditNote';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes/:folderId" element={<Notes />} />
        <Route path="/note/:noteId" element={<NoteDetails />} />
        <Route path='/notes/:folderId/newnote' element={<AddNote />}/>
        <Route path='/notes/:noteId/edit' element={<EditNote />}/>
      </Routes>
    </>
  )
}

export default App
