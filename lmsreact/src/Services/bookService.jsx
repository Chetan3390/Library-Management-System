import api from './api';

// This service contains functions for book-related API calls.

const BOOK_API = 'http://localhost:9091/books'; // Adjust based on your backend API URLs
const ADMIN_API = 'http://localhost:9091/admin';

const bookService = {
  // User endpoints
  getAllBooks: () => api.get(`${BOOK_API}/all`),
  requestBook: (bookId, userId) => api.put(`${BOOK_API}/request/${bookId}/${userId}`),
  returnBook: (bookId, userId) => api.put(`${BOOK_API}/return/${bookId}/${userId}`),
  getRequestedBooks: (userId) => api.get(`${BOOK_API}/requested/${userId}`),
  getAcceptedBooks: (userId) => api.get(`${BOOK_API}/accepted/${userId}`),

  // Admin endpoints
  adminGetAllBooks: () => api.get(`${ADMIN_API}/books`),
  acceptBookRequest: (bookId, userId) => api.post(`${ADMIN_API}/accept/${bookId}/${userId}`),
  rejectBookRequest: (bookId, userId) => api.post(`${ADMIN_API}/reject/${bookId}/${userId}`),
  revokeBook: (bookId, userId) => api.post(`${ADMIN_API}/revoke/${bookId}/${userId}`),
  addNewBook: (book) => api.post(`${ADMIN_API}/add`, book),
  deleteBook: (bookId) => api.delete(`${ADMIN_API}/delete/${bookId}`)
};

export default bookService;
