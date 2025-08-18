import { useState } from 'react';
import folderIcon from '../src/assets/folder.png';
import { ChevronRight, Type, FileText } from 'lucide-react';

const AddNotes = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleInputChange = (field, value) => {
        if (field === 'title') setTitle(value);
        if (field === 'content') setContent(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert("Please fill out both fields.");
            return;
        }
        console.log("Note saved:", { title, content });

        setTitle("");
        setContent("");
    };

    return (
        <div className='p-4'>
            
            <div className='flex p-4 items-center'>
                <img src={folderIcon} alt="Folder Icon" className='w-18 h-12' />
                <ChevronRight size={48} />
                <h2 className='font-mono text-3xl font-bold text-[#03045e] mt-4 mb-4'>Daily</h2>
                <ChevronRight size={48} />
                <h2 className='font-mono text-3xl font-bold text-[#03045e] mt-4 mb-4'>New Note</h2>
            </div>

            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-3xl m-auto items-center'>
                <form 
                    className="max-w-2xl mx-auto space-y-4"
                    onSubmit={handleSubmit}
                >
                    <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
                        <Type size={24} />
                        Note Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter note title..."
                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-lg"
                    />

                    <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
                        <FileText size={22} />
                        Content
                    </label>
                    <textarea
                        id="content-textarea"
                        value={content}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        placeholder="Start writing your note..."
                        className="w-full px-4 py-4 min-h-[300px] border-2 rounded-lg focus:outline-none resize-none"
                        style={{ fontFamily: 'inherit' }}
                    />

                    <button
                        type="submit"
                        className="bg-[#03045e] text-lg text-white font-bold font-mono px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Save Note
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNotes;
