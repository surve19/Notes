import folderIcon from '../src/assets/folder.png';
import deleteIcon from '../src/assets/trash.png';
import editIcon from '../src/assets/edit-text.png'
import { useNavigate } from 'react-router-dom';



const Folder = ({folderName, folderId}) => {
    const navigate = useNavigate();

    return (
        <div className='relative w-52 h-46 shadow-2xl rounded-xl items-center bg-white-0'>
            <div className='w-48 h-38 p-6 relative items-center hover:cursor-pointer hover:scale-103' onClick={() => navigate(`/notes/${folderId}`)}>
                <img src={folderIcon} alt="Folder Icon" className='w-36 h-28 shadow-sm'/>
                <span className='absolute font-mono text-xl text-end font-semibold text-[#03045e] bottom-6 right-7 px-1'>{folderName}</span>
            </div>
            <div>
                <img src={editIcon} alt="Edit Icon" className='absolute w-8 h-8 bottom-1 right-10 mr-1 hover:cursor-pointer hover:scale-102'/>
                <img src={deleteIcon} alt="Delete Icon" className='absolute w-8 h-8 bottom-1 right-1 hover:cursor-pointer hover:scale-102'/>
            </div>
        </div>
    )
}

export default Folder
