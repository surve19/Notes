import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import folderIcon from '../src/assets/folder.png';
import { ChevronRight, Type, FileText } from 'lucide-react';
import axios from 'axios';

const EditNote = () => {
  const { noteId } = useParams();
  console.log("noteId", noteId);
  const [note, setNote] = useState({});

    const getResponse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/note/${noteId}`);
        console.log("Response from server", response);
        setNote((prev)=>
        {
            return {    ...prev, ...response.data };
        });
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    

  useEffect(() => {
    getResponse();
  }, []);
  
//   useEffect(() => {
//     const response = await axios.get(`http://localhost:5000/note/${noteId}`);
//     console.log("Response from server", response);
//     // fetch(`http://localhost:5000/note/${noteId}`)
//     //   .then(res =>
//     //     {
//     //          const RR = res.json();
//     //          console.log("Response from server",RR);
//     //     })
//     //   .then(data => setNote(data))
//     //   .catch(err => console.error(err));
//   }, []);


    console.log("note", note);

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content || "");

  console.log("title", title);
  console.log("asdf",note.title);

  const handleChange = (field, value) => {
    if (field === 'title') setTitle(value);
    if (field === 'content') setContent(value);
  }


  if (!note) return <p className="p-4">Loading...</p>;

  return (
    <div className='p-4'>
      <div className='flex p-4 items-center'>
        <img src={folderIcon} alt="Folder Icon" className='w-18 h-12' />
        <ChevronRight size={48} />
        <h2 className='font-mono text-3xl font-bold text-[#03045e] mt-4 mb-4'>Folder</h2>
        <ChevronRight size={48} />
        <h2 className='font-mono text-3xl font-bold text-[#03045e] mt-4 mb-4'>{note.title}</h2>
      </div>

      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-3xl m-auto'>
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
              <Type size={24} />
              {note.title}
            </label>
            <input className="mt-2 text-lg font-semibold" value={note.title} onChange={handleChange} />
          </div>
          <div>
            <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
              <FileText size={22} />
              {note.content}
            </label>
            <div className="mt-2 whitespace-pre-wrap text-gray-800 leading-relaxed">
              {note.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNote;