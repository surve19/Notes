import { useState, useEffect } from 'react';
import Folder from './Folder';
import folderIcon from '../src/assets/folder.png';
import newFolderIcon from '../src/assets/new-folder.png';


const Home = () => {
  const [folders, setFolders] = useState([]);

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
          </div>
      </div>
    </div>
  )
}

export default Home
