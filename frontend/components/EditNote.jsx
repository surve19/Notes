import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import folderIcon from '../src/assets/folder.png';
import { ChevronRight, Type, FileText } from 'lucide-react';
import axios from 'axios';


const EditNote = () => {
  const { noteId } = useParams();
  const navigate = useNavigate(); 
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [folder, setFolder] = useState('');

  const getResponse = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/note/${noteId}`);
      console.log("Response from server", response);
      setNote((prev) => {
        return { ...prev, ...response.data };
      });

      const folderRes = await axios.get(`http://localhost:5000/${response.data.folderId}`);
      setFolder(folderRes.data[0]);
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };



  useEffect(() => {
    getResponse();
    // console.log("note", note);
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




  // const [title, setTitle] = useState(note.title);
  // const [content, setContent] = useState(note.content || "");

  const handleChange = (e) => {
    console.log(e.target.name);
    setNote((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    });
    // console.log("Updated note", note);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response =await axios.patch(`http://localhost:5000/note/${noteId}`, {
      title: note.title,
      content: note.content
    });
    console.log("Response from server", response);
    navigate(`/notes/${note.folderId}`);
    navigate(`/notes/${note.folderId}`);
  }

  if (!note) return <p className="p-4">Loading...</p>;

  return (
    <div className='p-4'>
      <div className='flex p-4 items-center'>
        <img src={folderIcon} alt="Folder Icon" className='w-18 h-12 cursor-pointer' onClick={() => {navigate('/')}}/>
        <ChevronRight size={48} />
        <h2 className='font-mono text-2xl sm:text-3xl font-bold text-[#03045e] mt-4 mb-4'>Folder</h2>
        <ChevronRight size={48} />
        <h2 className='font-mono text-2xl sm:text-3xl font-bold text-[#03045e] mt-4 mb-4'>{note.title}</h2>
      </div>

      {/* <form action="" onSubmit={handleSubmit} >
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-3xl m-auto'>
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
                <Type size={24} />
                Title
              </label>
              <input className="mt-2 p-3 text-lg font-semibold border border-black-100 rounded-md w-100" name='title' value={note.title} onChange={handleChange} />
            </div>
            <div>
              <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
                <FileText size={22} />
                Content
              </label>
              <textarea className="p-3 border border-black-100 rounded-md mt-2 whitespace-pre-wrap text-gray-800 leading-relaxed h-50 w-100" name='content' onChange={handleChange} value={note.content}></textarea>
            </div>
            <button
                        type="submit"
                        className="bg-[#03045e] text-lg text-white font-bold font-mono px-4 py-2 rounded-lg hover:bg-white hover:text-[#03045e] hover:border-1 hover:border-[#03045e]"
                    >
                        Save Note
            </button>
          </div>
        </div>
      </form> */}

      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-3xl m-auto items-center'>
                <form 
                    className="max-w-2xl mx-auto space-y-4"
                    onSubmit={handleSubmit}
                >
                    <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
                        <Type size={24} />
                        Title
                    </label>
                    <input
                        type="text"
                        value={note.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-lg"
                    />

                    <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
                        <FileText size={22} />
                        Content
                    </label>
                    <textarea
                        id="content-textarea"
                        name='content'
                        value={note.content}
                        onChange={handleChange}
                        className="w-full px-4 py-4 min-h-[300px] border-2 rounded-lg focus:outline-none resize-none"
                        style={{ fontFamily: 'inherit' }}
                    />

                    <button
                        type="submit"
                        className="bg-[#03045e] text-lg text-white font-bold font-mono px-4 py-2 rounded-lg hover:bg-white hover:text-[#03045e] hover:border-2 hover:border-[#03045e]"
                    >
                        Save Note
                    </button>
                </form>
            </div>

    </div>
  );
};

export default EditNote;