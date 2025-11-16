import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { languages } from "../utils/languages";

export default function SnippetForm() {
  const [formData, setFormData] = useState({
    title: "",
    language: "",
    code: "",
    description: "",
  });
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({ title: "", language: "", code: "" });
  const isFormValid = !errors.title && !errors.language && !errors.code;

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim()) setErrors((prev) => ({ ...prev, [key]: "" }));
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let submitErrors = {};

    if (!formData.title) submitErrors.title = "Enter title!";
    if (!formData.language) submitErrors.language = "Select language!";
    if (!formData.code) submitErrors.code = "Enter code!";

    setErrors(submitErrors);

    if (formData.title && formData.language && formData.code) {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`${URL}/snippets/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        await res.json();
        setFormData({ title: "", language: "", code: "", description: "" });

        if (res.ok) {
          setTimeout(() => {
            navigate("/snippets");
          }, 1500);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <main className="flex flex-col pt-6 items-center">
      <h2 className="text-3xl text-center m-5 text-white">Add snippet</h2>
      <div className="rounded-3xl px-10 py-7 text-white">
        <form
          noValidate
          className="flex flex-col"
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
            }}
            value={formData.code}
            className="mt-5 mb-3"
            name="code"
          />
          {errors.code && (
            <p className="text-red-600 self-start ml-3">{errors.code}</p>
          )}

          <button
            type="submit"
            className="bg-purple-900 mx-auto px-3 py-2 rounded-xl mt-2 cursor-pointer hover:bg-purple-800 disabled:bg-purple-950 disabled:cursor-not-allowed"
            disabled={!isFormValid}
          >
            Add snippet
          </button>
        </form>
      </div>
    </main>
  );
}
