package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.BookDto;
import com.example.demo.entity.Book;

public interface AdminService {
	
	void acceptBookRequest(Long bookId, int userId);
    void rejectBookRequest(Long bookId, int userId);
    void revokeBook(Long bookId, int userId);
    void addNewBook(BookDto bookDto);
    void deleteBook(Long bookId);
    List<Book> getAllBooks();
    void requestBook(Long bookId, int userId);
    String returnBook(Long bookId, int userId);
    
    Book getBookById(Long id);
    void updateBook(Book book);
	
    List<Book> getRequestedBooks();
    List<Book> getAcceptedBooks();
}