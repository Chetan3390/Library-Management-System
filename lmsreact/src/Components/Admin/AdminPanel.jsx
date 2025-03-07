import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import bookService from '../../Services/bookService';
import BookTable from './BookTable';
import AdminUsers from './AdminUsers';

const AdminPanel = () => {
  // State to store the list of books
  const [books, setBooks] = useState([]);
  // Toggle state for showing accepted/pending book requests
  const [showBookRequests, setShowBookRequests] = useState(false);
  // Toggle state for showing user details
  const [showUsers, setShowUsers] = useState(false);
  // Search query state for filtering books by title or author
  const [bookSearchQuery, setBookSearchQuery] = useState('');

  // react-hook-form for the "Add New Book" form
  const { register, handleSubmit, reset } = useForm();

  // Load all books when the component mounts
  useEffect(() => {
    loadBooks();
  }, []);

  // Function to fetch all books from the backend
  const loadBooks = async () => {
    try {
      const response = await bookService.adminGetAllBooks();
      setBooks(response.data);
    } catch (error) {
      const errorMsg =
        error.response && typeof error.response.data === 'object'
          ? JSON.stringify(error.response.data)
          : error.response?.data || error.message;
      alert("Error fetching books: " + errorMsg);
    }
  };

  // Function to handle submission of new book data
  const onSubmitAddBook = async (data) => {
    try {
      await bookService.addNewBook(data);
      alert("Book added successfully!");
      reset();
      loadBooks();
    } catch (error) {
      alert("Error adding book: " + (error.response?.data || error.message));
    }
  };

  // Action handlers for book operations
  const handleAccept = async (bookId, requestUserId) => {
    try {
      await bookService.acceptBookRequest(bookId, requestUserId);
      alert("Book accepted.");
      loadBooks();
    } catch (error) {
      alert("Error accepting book: " + (error.response?.data || error.message));
    }
  };

  const handleReject = async (bookId, requestUserId) => {
    try {
      await bookService.rejectBookRequest(bookId, requestUserId);
      alert("Book rejected.");
      loadBooks();
    } catch (error) {
      alert("Error rejecting book: " + (error.response?.data || error.message));
    }
  };

  const handleRevoke = async (bookId, requestUserId) => {
    try {
      await bookService.revokeBook(bookId, requestUserId);
      alert("Book revoked.");
      loadBooks();
    } catch (error) {
      alert("Error revoking book: " + (error.response?.data || error.message));
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await bookService.deleteBook(bookId);
      alert("Book deleted.");
      loadBooks();
    } catch (error) {
      alert("Error deleting book: " + (error.response?.data || error.message));
    }
  };

  // Filter books based on search query
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(bookSearchQuery.toLowerCase())
    || book.author.toLowerCase().includes(bookSearchQuery.toLowerCase())
  );

  // Separate the filtered books into accepted and pending lists
  const acceptedBooks = filteredBooks.filter(book =>
    book.accepted === true || book.accepted === "true"
  );
  const pendingBooks = filteredBooks.filter(book =>
    book.requested === true && !(book.accepted === true || book.accepted === "true")
  );

  return (
    <div className="container">
      <h2 className="my-3">Admin Panel</h2>

      {/* Add New Book */}
      <div className="card mb-3 mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h5 className="card-title">Add New Book</h5>
          <form onSubmit={handleSubmit(onSubmitAddBook)}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                {...register('title', { required: 'Title is required' })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Author</label>
              <input
                type="text"
                className="form-control"
                {...register('author', { required: 'Author is required' })}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Book
            </button>
          </form>
        </div>
      </div>

      {/* Search Books */}
      <div className="card mb-3">
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="Search Books"
            value={bookSearchQuery}
            onChange={(e) => setBookSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* All Books */}
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">All Books</h5>
          <BookTable
            books={filteredBooks}
            onAccept={handleAccept}
            onReject={handleReject}
            onRevoke={handleRevoke}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Toggle Book Requests */}
      <div className="card mb-3">
        <div className="card-body">
          <button className="btn btn-primary" onClick={() => setShowBookRequests(prev => !prev)}>
            {showBookRequests ? "Hide Book Requests" : "Show Book Requests"}
          </button>
        </div>
      </div>

      {showBookRequests && (
        <>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Accepted Book Requests</h5>
              <BookTable
                books={acceptedBooks}
                onRevoke={handleRevoke}
                onDelete={handleDelete}
              />
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Pending Book Requests</h5>
              <BookTable
                books={pendingBooks}
                onAccept={handleAccept}
                onReject={handleReject}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </>
      )}

      {/* Toggle User Details */}
      <div className="card mb-3">
        <div className="card-body">
          <button className="btn btn-primary" onClick={() => setShowUsers(prev => !prev)}>
            {showUsers ? "Hide User Details" : "Show User Details"}
          </button>
        </div>
      </div>
      
      {showUsers && <AdminUsers />}
    </div>
  );
};

export default AdminPanel;
