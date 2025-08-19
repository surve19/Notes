import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import Folder from './Folder';
import axios from 'axios';
import folderIcon from '../src/assets/folder.png';
import newFolderIcon from '../src/assets/new-folder.png';
import { FolderDownIcon } from 'lucide-react';


const Home = () => {
  const [folders, setFolders] = useState([]);
  const [title, setTitle] = useState("");
  const [isPopUpOpen, setPopUpOpen] = useState(false);

  const handleInputChange = (e) => {
        setTitle(e.target.value);
    };

  const handleSubmit = async (e) => {
        e.preventDefault();

        // const title = title;
        console.log(title);
        
        await axios.post("http://localhost:5000",{ title })
        .then((res) => {
          console.log(res)
          setTitle(title);
        })
        .catch(err => console.error(err));
        console.log("Note saved:", { title });

        setTitle("");
        setPopUpOpen(false);
        window.location.reload();
    };

  useEffect(() => {
    fetch("http://localhost:5000")
    .then((res) => res.json())
    .then((data) => setFolders(data))
    .catch((err) => {
      console.log(err)
    });
  },[]);

  return (
    <div className='p-4 m-4'>
      <h1 className='font-mono text-3xl font-bold text-[#03045e] mt-2 mb-4 ml-4'>My Space</h1>
      <div className='flex gap-8'>
            {folders.map((folder) => (
              <Folder key={folder._id} folderName={folder.title} folderId={folder._id}/>
            ))}
          {/* New Folder */}
          <div className='relative w-52 h-46 p-8 shadow-2xl rounded-xl items-center bg-white-0'>
            <img src={folderIcon} alt="Folder Icon" className='w-36 h-28 shadow-sm blur-sm'/>
            <img src={newFolderIcon} alt="New Folder Icon" className='absolute w-22 h-16 bottom-[35%] right-[30%] px-1'/>
            <span className='absolute font-mono text-xl font-semibold text-[#03045e] bottom-7 right-10 px-1'>New Folder</span>
            <Popup 
            display="center" 
            open={isPopUpOpen} 
            onClose={() => setPopUpOpen(false)}
            >
              <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-3xl m-auto items-center flex'>
                <form 
                      className="max-w-2xl mx-auto space-y-4"
                      onSubmit={handleSubmit}
                      method='POST'
                >
                      <label className="flex items-center gap-2 text-xl font-semibold text-[#03045e]">
                          <FolderDownIcon size={24} />
                          Folder Title
                      </label>
                      <input
                          type="text"
                          value={title}
                          onChange={handleInputChange}
                          placeholder="Enter note title..."
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-lg"
                      />
                      <div className='flex flex-row gap-4'>
                        <button type='submit' className='flex w-38 h-14 rounded-xl gap-3 border-2 text-white text-md font-semibold bg-[#03045e] mx-auto justify-center items-center'>
                        Save
                      </button>
                      <button onClick={() => setPopUpOpen(false)} className='flex w-38 h-14 rounded-xl gap-3 border-2 text-white text-lg font-semibold bg-[#03045e] mx-auto justify-center items-center'>
                        Close
                      </button>
                      </div>
                  </form>
              </div>
            </Popup>
          </div>
          
      </div>
    </div>
  )
}

export default Home
