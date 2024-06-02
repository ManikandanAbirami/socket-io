import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

const BookForm = ({ book = {}, onSubmit }) => {
    const [title, setTitle] = useState(book.title || '');
    const [author, setAuthor] = useState(book.author || '');
    const [description, setDescription] = useState(book.description || '');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('description', description);
        if (image) formData.append('image', image);

        onSubmit(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' required />
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='Author' required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description'></textarea>
            <input type="file" onChange={handleImageChange} />
            <button type='submit'>Save</button>
        </form>
    )
}

export default BookForm