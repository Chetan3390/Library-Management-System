package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Book;

public interface BookService {

	List<Book> getAllBooks();

	List<Book> getRequestedBooks(int userId);

	List<Book> getAcceptedBooks(int userId);

	List<Book> getRequestedBooks();

	List<Book> getAcceptedBooks();

	void requestBook(Long bookId, int userId);

	String returnBook(Long bookId, int userId);

	void acceptBookRequest(Long bookId, int userId);

	void rejectBookRequest(Long bookId, int userId);

	void revokeBook(Long bookId, int userId);

}
