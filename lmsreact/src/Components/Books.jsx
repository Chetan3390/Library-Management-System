import React, { useEffect, useState } from 'react'; // Import React and necessary hooks from React library.
import bookService from '../Services/bookService'; // Import bookService to handle API calls for fetching books.
import BookCard from './BookCard'; ; // Import the BookCard component which displays individual book details.

const Books = () => {
  // Define state variables using useState hook.
  const [books, setBooks] = useState([]); // 'books' will store the array of books.
  const [tab, setTab] = useState('all'); // 'tab' will control which set of books to display: 'all', 'accepted', 'pending', 'search'.
  const [searchQuery, setSearchQuery] = useState(''); // 'searchQuery' will store the user's search input.
  
  // Retrieve userId and userRole from local storage to identify the logged-in user and their role.
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole === 'ADMIN'; // Check if the logged-in user is an admin.

  

  // useEffect hook to run loadBooks function when component mounts or when 'tab', 'searchQuery', or 'isAdmin' changes.
  useEffect(() => {
    if (!isAdmin) {
      loadBooks();
    }
  }, [tab, searchQuery, isAdmin]);

  // Function to load books from backend using bookService.
  const loadBooks = async () => {
    try {
      let response;
      // Fetch books based on the selected tab.
      if (tab === 'all') {
        response = await bookService.getAllBooks(); // Fetch all books.
      } else if (tab === 'accepted') {
        response = await bookService.getAcceptedBooks(userId); // Fetch books accepted by the user.
      } else if (tab === 'pending') {
        response = await bookService.getRequestedBooks(userId); // Fetch books requested by the user.
      } else if (tab === 'search') {
        response = await bookService.getAllBooks(); // Fetch all books for client-side filtering.
      }
      let data = response.data;
      ;
      // If in search mode, filter books based on the search query.
      if (tab === 'search' && searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        data = data.filter(book =>
          book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q)
        );
      }
      setBooks(data); // Update the 'books' state with the fetched data.
    } catch (error) {
      const errorMsg = error.response && typeof error.response.data === 'object'
        ? JSON.stringify(error.response.data)
        : error.response?.data || error.message;
      alert("Error fetching books: " + errorMsg); // Show an error alert if fetching books fails.
    }
  };


// If user is an admin, display a message that they should use the Admin Panel.
  if (isAdmin) {
    return (
      <div className="container text-center my-3">
        <h5>Users Only</h5>
        <p>Admins should view books via the Admin Panel.</p>
      </div>
    );
  }

  // Handler function to request a book.
  const handleRequest = async (bookId) => {
    try {
      await bookService.requestBook(bookId, userId); // Make API call to request the book.
      alert("Book requested successfully."); // Show success alert.
      loadBooks(); // Reload the books after requesting a book.
    } catch (error) {
      const errorMsg = error.response && typeof error.response.data === 'object'
        ? JSON.stringify(error.response.data)
        : error.response?.data || error.message;
      alert("Error requesting book: " + errorMsg); // Show an error alert if requesting book fails.
    }
  };

  // Handler function to return a book.
  const handleReturn = async (bookId) => {
    try {
      const response = await bookService.returnBook(bookId, userId); // Make API call to return the book.
      alert(response.data); // Show success alert.
      loadBooks(); // Reload the books after returning a book.
    } catch (error) {
      const errorMsg = error.response && typeof error.response.data === 'object'
        ? JSON.stringify(error.response.data)
        : error.response?.data || error.message;
      alert("Error returning book: " + errorMsg); // Show an error alert if returning book fails.
    }
  };

  // Filter books based on search query (title or author).
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h4 className="mb-3">My Books</h4>
      
      {/* Buttons for controlling tab & search */}
      <div className="mb-3 d-flex flex-wrap align-items-center">
        <button className="btn btn-primary me-2 mb-2" onClick={() => { setTab('all'); setSearchQuery(''); }}>
          All Books
        </button>
        <button className="btn btn-primary me-2 mb-2" onClick={() => { setTab('accepted'); setSearchQuery(''); }}>
          My Accepted Books
        </button>
        <button className="btn btn-primary me-2 mb-2" onClick={() => { setTab('pending'); setSearchQuery(''); }}>
          My Pending Requests
        </button>
        <button className="btn btn-primary me-2 mb-2" onClick={() => setTab('search')}>
          Search Books
        </button>
        {tab === 'search' && (
          <input
            type="text"
            className="form-control d-inline-block ms-2 mb-2"
            style={{ maxWidth: '250px' }}
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}
      </div>

      {/* Flex-based board for books */}
      <div className="d-flex flex-wrap">
        {filteredBooks.map(book => (
          <div key={book.id} className="p-2" style={{ flex: '1 0 250px' }}>
            <BookCard book={book} onRequest={handleRequest} onReturn={handleReturn} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
