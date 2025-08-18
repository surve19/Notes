import { useNavigate } from 'react-router-dom';
import editIcon from '../src/assets/edit-text.png';
import deleteIcon from '../src/assets/trash.png';

const NotesCard = ({ title, content, createdAt, id }) => {
  const navigate = useNavigate();
  return (
    <div className='bg-[#f9f9f9] rounded-xl p-4 shadow-md border border-gray-300  flex flex-col min-h-[180px]' onClick={() => navigate(`/note/${id}`)}>
        <div className='flex justify-between items-center mb-3 gap-2'>
            <h3 className='ont-mono text-lg font-bold text-[#03045e]'>{title}</h3>
            <div className='flex '>
              <img src={editIcon} alt="Edit Icon" className=' w-6 h-6 bottom-1 right-10 mr-1 hover:cursor-pointer hover:scale-102'/>
              <img src={deleteIcon} alt="Delete Icon" className=' w-6 h-6 bottom-1 right-1 hover:cursor-pointer hover:scale-102'/>
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
