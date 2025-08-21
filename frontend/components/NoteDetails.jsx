import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import folderIcon from '../src/assets/folder.png';
import { ChevronRight, Type, FileText } from 'lucide-react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const NoteDetails = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [folder, setFolder] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/note/${noteId}`)
      .then(res => res.json())
      .then(data => {
        setNote(data)
        return fetch(`http://localhost:5000/${data.folderId}`)
      })
      .then(res => res.json())
      .then(folderData => {setFolder(...folderData)})
      .catch(err =>{
         console.error(err)
  });
  }, [noteId]);
  if (!note) return <p className="p-4">Loading...</p>;

  return (
    <div className='p-4'>
      <div className='flex p-4 items-center'>
        <img src={folderIcon} alt="Folder Icon" className='w-18 h-12 cursor-pointer' onClick={() => {navigate('/')}}/>
        <ChevronRight size={48} />
        <h2 className='font-mono text-xl sm:text-3xl font-bold text-[#03045e] mt-4 mb-4 cursor-pointer' onClick={() => navigate(`/notes/${note.folderId}`)}>{folder.title}</h2>
        <ChevronRight size={48} />
        <h2 className='font-mono text-xl font-bold text-[#03045e] mt-4 mb-4 sm:text-3xl'>{note.title}</h2>
      </div>

      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-3xl m-auto'>
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <Type size={24} />
              Title
            </label>
            <p className="mt-2 text-lg font-semibold">{note.title}</p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <FileText size={22} />
              Content
            </label>
            <div className="mt-2 whitespace-pre-wrap text-gray-800 leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;
