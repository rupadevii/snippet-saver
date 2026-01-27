import Editor from '@monaco-editor/react'
import {Pencil, Trash} from 'lucide-react'
import { useState } from 'react';
import Modal from 'react-modal'
import EditSnippet from './EditSnippet';
import DeleteSnippet from './DeleteSnippet';

export default function SnippetCard({snippet, loadSnippets}) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [action, setAction] = useState(null);
    const [height, setHeight] = useState("20px")

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
            height: (action==="edit" ? "570px" : "162px")
        },
        overlay:{
            backgroundColor : 'rgba(58, 58, 58, 0.7)'
        }
    };
  
    function openModal(actionType) {
        setAction(actionType)
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleMount(editor){
        setHeight(editor.getContentHeight()+42)
    }
    
    return (
        <div className="text-white rounded-xl border-t border-zinc-700 shadow-lg px-8 py-6 my-5">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >   
                {action=== "edit" ? (
                    <EditSnippet snippet={snippet} loadSnippets={loadSnippets} closeModal={closeModal}/>
                ) : (
                    <DeleteSnippet id={snippet.id} loadSnippets={loadSnippets} closeModal={closeModal}/>
                )}
            </Modal>
        <div className='flex justify-between items-center'>
            <div>
                <h2 className="text-4xl font-extrabold inline-block mr-2">{snippet.title}</h2>
                <span className='text-zinc-500 mr-8'><i>{snippet.language}</i></span>
            </div>
            <div className='flex gap-2'>
                <button 
                    className='bg-stone-700 p-2 hover:bg-stone-600 rounded-md'
                    onClick={() => openModal("edit")}>
                    <Pencil size={16}/>
                </button>
                <button 
                    className='bg-red-600 p-2 hover:bg-red-500 rounded-md'
                    onClick={() => openModal("delete")}>
                    <Trash size={16}/>
                </button>
            </div>
        </div>
        <p className="text-zinc-400 mt-2">{snippet.description}</p>
        <Editor 
            width="72vw"
            height={`${height}px`}
            defaultLanguage="javascript" 
            defaultValue="// some comment"
            theme="vs-dark"
            value={snippet.code}
            language={snippet.language} 
            className="mt-5"
            onMount={handleMount}
            options={{
                domReadOnly: true, 
                readOnly:true,  
                readOnlyMessage: { value: "" }, 
                minimap: {enabled: false}, 
                automaticLayout:true,
                scrollbar: {vertical : 'hidden', 
                    horizontal: "hidden",
                    handleMouseWheel: false,
            }}}
        />
        </div>
    )
}
