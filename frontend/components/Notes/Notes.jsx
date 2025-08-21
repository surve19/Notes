import { useState, useEffect } from 'react';
import folderIcon from '../../src/assets/folder.png';
import newIcon from '../../src/assets/add.png';
import NotesCard from '../NotesCard';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Notes.module.css';

const Notes = () => {
  const { folderId } = useParams();
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  
    useEffect(() => {
      fetch(`http://localhost:5000/notes/${folderId}`)
        .then(res => res.json())
        .then(data => setNotes(data))
        .catch(err => console.log(err));

      fetch(`http://localhost:5000/${folderId}`)
      .then(res => res.json())
      .then(data => setFolders(data))
      .catch(err => console.error(err));

    }, [folderId]);
  const navigate = useNavigate();

  return (
    <div className='p-4 '>
      <div className='flex justify-between p-4 items-center'>
        <div className='flex p-4'>
          <img src={folderIcon} alt="Folder Icon" className='w-18 h-12 cursor-pointer' onClick={() => {navigate('/')}}/>
          <ChevronRight size={48}/>
          
          {folders.map(folder => (
            <h1 className='font-mono   font-bold text-[#03045e] mt-2 mb-4'>{folder.title}</h1>
          ))}
          
        </div>
        <button className={`flex w-38 h-14 rounded-xl gap-3 border-2 border-[#03045e] justify-center items-center ${styles.plusButton}`} onClick={() => {navigate(`newnote`)}}>
          <img src={newIcon} alt="New Note Icon" className='w-10 h-10'/>
          <h3 className={`text-lg font-mono font-bold text-[#03045e] cursor-pointer ${styles.newNote}`}>New Note</h3>
        </button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {notes.map((note) => (
            <NotesCard
              key={note._id}
              title={note.title}
              content={note.content}
              createdAt={new Date(note.createdAt).toLocaleString()}
              id={note._id}
            />
          ))}
      </div>
    </div>
  )
}

export default Notes
