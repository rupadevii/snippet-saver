import React, { useContext, useState } from 'react'
import { languages } from '../utils/languages';
import { Editor } from '@monaco-editor/react';
import { fetchAPI } from '../utils/api';
import { AuthContext } from '../context/AuthContext';

export default function EditSnippet({snippet, loadSnippets, closeModal}) {
    const [formData, setFormData] = useState(() => ({
        title: snippet.title,
        description: snippet.description,
        language: snippet.language,
        code: snippet.code
    }))
    const [errors, setErrors] = useState({})
    const isFormValid = !errors.title && !errors.language && !errors.code;
    const token = useContext(AuthContext)
    
    function handleChange(e){
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value.trim()}));
        if(value.trim()) setErrors((prev) => ({...prev, [name] : ""}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let submitErrors = {};
    
        if (!formData.title) submitErrors.title = "Enter title!";
        if (!formData.language) submitErrors.language = "Select language!";
        if (!formData.code) submitErrors.code = "Enter code!";
    
        setErrors(submitErrors);
    
        if (formData.title && formData.language && formData.code) {
            try {
                const data = await fetchAPI(`snippets/${snippet.id}`, "PUT", {formData, token})

                setFormData({ title: "", language: "", code: "", description: "" });
                if(data){
                    loadSnippets();
                    setTimeout(() => {
                        closeModal()
                    }, 1500);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className='w-275 bg-stone-900 p-10 text-white overflow-auto'>
            <h1 className='text-2xl text-white'>Edit</h1>
            <form
            noValidate
            className="flex flex-col m-5"
            onSubmit={handleSubmit}
            >
                <input
                    name="title"
                    type="text"
                    placeholder="Enter title"
                    className="my-3 p-3 w-full border border-zinc-500 rounded-sm"
                    value={formData.title}
                    onChange={handleChange}
                />
                {errors.title && (
                    <p className="text-red-600 self-start ml-3">{errors.title}</p>
                )}

                <textarea
                    name="description"
                    rows="1"
                    placeholder="Enter description (Optional)"
                    className="my-3 p-3 w-[60vw] rounded-sm border-b border-gray-400"
                    value={formData.description}
                    onChange={handleChange}
                />

                <label htmlFor="language" className="mt-3">Choose language:</label>
                <select
                    name="language"
                    id="language"
                    className="p-3 my-3 border w-100 border-zinc-500 rounded-sm"
                    onChange={handleChange}
                > 
                    <option>Select</option>
                    {languages.map((language, index) => (
                    <option className="bg-zinc-900" value={language} key={index}>
                        {language}
                    </option>
                    ))}
                </select>

                {errors.language && (
                    <p className="text-red-600 self-start ml-3">
                    {errors.language}
                    </p>
                )}

                <Editor
                    height="90vh"
                    width="60vw"
                    language="javascript"
                    theme="vs-dark"
                    defaultValue="// some comment"
                    onChange={(value) => {
                    setFormData((prev) => ({ ...prev, code: value }));
                    setErrors((prev) => ({...prev, code: ""}))
                    }}
                    value={formData.code}
                    className="mt-5 mb-3"
                    name="code"
                    options={{
                        minimap: {enabled: false},
                    }}
                />
                {errors.code && (
                    <p className="text-red-600 self-start ml-3">{errors.code}</p>
                )}

                <div>
                    <button
                        type="submit"
                        className="bg-purple-900 mx-auto px-3 py-2 rounded-xl mt-2 mr-3 cursor-pointer hover:bg-purple-800 disabled:bg-purple-950 disabled:cursor-not-allowed"
                        disabled={!isFormValid}
                    >
                        Save
                    </button>
                    <button
                        className="bg-purple-300 text-black mx-auto px-3 py-1.5 rounded-xl mt-2 cursor-pointer hover:bg-purple-800 disabled:bg-purple-950 disabled:cursor-not-allowed">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
