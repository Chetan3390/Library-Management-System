import React from 'react';

const BookTable = ({ books, onAccept, onReject, onRevoke, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Requested</th>
            <th>Accepted</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.requested ? 'Yes' : 'No'}</td>
              <td>{book.accepted ? 'Yes' : 'No'}</td>
              <td>{book.userId}</td>
              <td>
                {book.requested && onAccept && (
                  <>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      onClick={() => onAccept(book.id, book.userId)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm me-1"
                      onClick={() => onReject(book.id, book.userId)}
                    >
                      Reject
                    </button>
                  </>
                )}
                {book.accepted && onRevoke && (
                  <button
                    className="btn btn-secondary btn-sm me-1"
                    onClick={() => onRevoke(book.id, book.userId)}
                  >
                    Revoke
                  </button>
                )}
                {onDelete && (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onDelete(book.id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
