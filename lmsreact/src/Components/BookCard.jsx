// src/Components/BookCard.jsx
import React from 'react';

const BookCard = ({ book, onRequest, onReturn }) => {
  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text mb-1">Author: {book.author}</p>
        <p className="card-text mb-1">
          Requested: {book.requested ? 'Yes' : 'No'} <br />
          Accepted: {book.accepted ? 'Yes' : 'No'}
        </p>
        <div className="mt-auto">
          {(!book.requested && !book.accepted) && (
            <button className="btn btn-primary btn-sm" onClick={() => onRequest(book.id)}>
              Request
            </button>
          )}
          {(book.accepted && Number(book.userId) === Number(localStorage.getItem('userId'))) && (
            <button className="btn btn-secondary btn-sm" onClick={() => onReturn(book.id)}>
              Return
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
