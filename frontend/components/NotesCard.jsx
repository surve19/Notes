import { useNavigate } from 'react-router-dom';
import editIcon from '../src/assets/edit-text.png';
import deleteIcon from '../src/assets/trash.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NotesCard = ({ title, content, createdAt, id }) => {
  const navigate = useNavigate();
  const {folderId} = useParams();
  const handleDelete = async () => {
    try{
      await axios.delete(`http://localhost:5000/notes/${id}`);
      window.location.reload(); // Reload the page to reflect changes
      // navigate(`/notes/${folderId}`); // Navigate back to the folder after deletion
    }
    catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  const handleEdit = () => {
    navigate(`/notes/${id}/edit`);
    console.log("Edit functionality not implemented yet");
  }
  return (
    <div className='bg-[#f9f9f9] rounded-xl p-4 shadow-md border border-gray-300  flex flex-col min-h-[180px]' >
        <div className='flex justify-between items-center mb-3 gap-2'>
            <h3 className='ont-mono text-lg font-bold text-[#03045e] cursor-pointer' onClick={() => navigate(`/note/${id}`)}>{title}</h3>
            <div className='flex '>
              <img src={editIcon} alt="Edit Icon" onClick={handleEdit} className=' w-6 h-6 bottom-1 right-10 mr-1 hover:cursor-pointer hover:scale-102'/>
              <img src={deleteIcon} alt="Delete Icon" onClick={handleDelete} className=' w-6 h-6 bottom-1 right-1 hover:cursor-pointer hover:scale-102'/>
            </div>
        </div>

        <div className="text-gray-600 text-md leading-relaxed flex-1 overflow-hidden">
            <div className="line-clamp-6">
              {content}
            </div>
        </div>

        <div className="flex justify-between items-center pt-3 mt-auto border-t border-gray-50">
            <div className="flex items-center gap-1 text-gray-400 text-s">
            <span>{createdAt}</span>
            </div>
        </div>
    </div>
  )
}

export default NotesCard
