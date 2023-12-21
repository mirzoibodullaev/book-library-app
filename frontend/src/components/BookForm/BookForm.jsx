import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    addBook,
    fetchBook,
    selectIsLoadingViaAPI,
} from "../../redux/slices/booksSlice";
import { createBookWithID } from "../../utils/createBookWithID";
import booksData from "../../data/books.json";
import "./BookForm.css";
import { setError } from "../../redux/slices/errorSlice";
import { FaSpinner } from "react-icons/fa";

export const BookForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);
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
        const randomBookWithID = createBookWithID(randomBook, "random");

        dispatch(addBook(randomBookWithID));
        toast.success("Book added successfully");
        return <ToastContainer position="top-right" autoClose={2000} />;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title && author) {
            const book = createBookWithID({ title, author }, "manual");

            dispatch(addBook(book));
            setTitle("");
            setAuthor("");
            toast.success("Book added successfully");
            return <ToastContainer position="top-right" autoClose={2000} />;
        } else {
            dispatch(setError("You must fill title and author!"));
        }
    };
    const handleAddRandomBookViaAPI = () => {
        dispatch(fetchBook("http://localhost:4000/random-book-delayed"));
        toast.success("Book added successfully");
        return <ToastContainer position="top-right" autoClose={2000} />;
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
                <button
                    onClick={handleAddRandomBookViaAPI}
                    type="button"
                    disabled={isLoadingViaAPI}
                >
                    {isLoadingViaAPI ? (
                        <>
                            <span>Loading Book...</span>
                            <FaSpinner className="spinner" />
                        </>
                    ) : (
                        "Add Random via API"
                    )}
                </button>
            </form>
        </div>
    );
};
