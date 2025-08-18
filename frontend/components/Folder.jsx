import { useState } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';
import folderIcon from '../src/assets/folder.png';
import deleteIcon from '../src/assets/trash.png';
import editIcon from '../src/assets/edit-text.png'
import { useNavigate } from 'react-router-dom';
import { FolderDownIcon } from 'lucide-react';


const Folder = ({folderName, folderId}) => {
    const [title, setTitle] = useState("");
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        await axios.delete(`http://localhost:5000/${folderId}`)
        .then((res) => {
        console.log(res)
        })
        .catch(err => console.error(err));
        
        window.location.reload();
    };

    const handleInputChange = (e) => {
        setTitle(e.target.value);
    };

    const handleUpdate = async (e) => {
        await axios.patch(`http://localhost:5000/${folderId}`, {title})
        .then(res => console.log(res))
        .catch(err => console.error(err));
        console.log(title)
        window.location.reload();
    }

    return (
        <div className='relative w-52 h-46 shadow-2xl rounded-xl items-center bg-white-0'>
            <div className='w-48 h-38 p-6 relative items-center hover:cursor-pointer hover:scale-103' onClick={() => navigate(`/notes/${folderId}`)}>
                <img src={folderIcon} alt="Folder Icon" className='w-36 h-28 shadow-sm'/>
                <span className='absolute font-mono text-xl text-end font-semibold text-[#03045e] bottom-6 right-7 px-1'>{folderName}</span>
            </div>
            <div>
                <img src={editIcon} alt="Edit Icon" className='absolute w-8 h-8 bottom-1 right-10 mr-1 hover:cursor-pointer hover:scale-102' onClick={() => {
                    setTitle(folderName);
                    setPopUpOpen(true)}}/>
                <img src={deleteIcon} alt="Delete Icon" className='absolute w-8 h-8 bottom-1 right-1 hover:cursor-pointer hover:scale-102'onClick={handleDelete}/>
                <Popup 
                    display="center" 
                    open={isPopUpOpen} 
                    onClose={() => setPopUpOpen(false)}
                >
                    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-3xl m-auto items-center flex'>
                        <form 
                            className="max-w-2xl mx-auto space-y-4"
                            onSubmit={handleUpdate}
                        >
                            <label className="flex items-center gap-2 text-xl font-semibold text-[#03045e]">
                                <FolderDownIcon size={24} />
                                Update Title
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
    )
}

export default Folder
