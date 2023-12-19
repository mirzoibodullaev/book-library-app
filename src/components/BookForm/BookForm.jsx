import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../redux/slices/booksSlice";
import { createBookWithID } from "../../utils/createBookWithID";
import booksData from "../../data/books.json";
import "./BookForm.css";

export const BookForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const dispatch = useDispatch();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    };

    const handleAddRandomBook = () => {
        const randomIndex = Math.floor(Math.random() * booksData.length);
        const randomBook = booksData[randomIndex];
        const randomBookWithID = createBookWithID(randomBook);

        dispatch(addBook(randomBookWithID));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title && author) {
            const book = createBookWithID({ title, author });

            dispatch(addBook(book));
            setTitle("");
            setAuthor("");
        }
    };

    return (
        <div className="app-block book-form">
            <h2>Add a new Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author: </label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </div>
                <button type="submit">Add Book</button>
                <button type="button" onClick={handleAddRandomBook}>
                    Add Random
                </button>
            </form>
        </div>
    );
};