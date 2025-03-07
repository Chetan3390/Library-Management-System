package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.BookDto;
import com.example.demo.entity.Book;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final BookRepository bookRepository;
//	 private final UserFeignClient userFeignClient;

	private static final String BOOK_NOT_FOUND = "Book not found";

	@Override
	public void acceptBookRequest(Long bookId, int userId) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new ResourceNotFoundException(BOOK_NOT_FOUND));
		if (!book.isRequested() || book.getUserId() != userId) {
			throw new IllegalStateException("Book is not requested by this user");
		}
		book.setAccepted(true);
		book.setRequested(false);
		bookRepository.save(book);
	}

	@Override
	public void rejectBookRequest(Long bookId, int userId) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new ResourceNotFoundException(BOOK_NOT_FOUND));
		if (!book.isRequested() || book.getUserId() != userId) {
			throw new IllegalStateException("Book is not requested by this user");
		}
		book.setRequested(false);
		book.setUserId(0);
		bookRepository.save(book);
	}

	@Override
    public void revokeBook(Long bookId, int userId) {
        Book book = bookRepository.findById(bookId)
            .orElseThrow(() -> new ResourceNotFoundException("Book not found or cannot revoke a book which is not accepted"));
        if (book.getUserId() != userId) {
            throw new IllegalStateException("Book is not accepted by this user");
        }
        book.setAccepted(false);
        book.setRequested(false);
        book.setUserId(0); // Reset userId
        bookRepository.save(book);
	}

	@Override
	public void addNewBook(BookDto bookDto) {
		Book newBook = new Book();
		newBook.setTitle(bookDto.getTitle());
		newBook.setAuthor(bookDto.getAuthor());
		newBook.setAccepted(false);
		newBook.setRequested(false);
		bookRepository.save(newBook);

	}

	@Override
	public void deleteBook(Long bookId) {
		if (!bookRepository.existsById(bookId)) {
			throw new ResourceNotFoundException(BOOK_NOT_FOUND);
		}
		bookRepository.deleteById(bookId);

	}

	@Override
	public List<Book> getAllBooks() {
		return bookRepository.findAll();
	}

	@Override
    public void requestBook(Long bookId, int userId) {
        Book book = bookRepository.findById(bookId)
            .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

        // Check if the book is already requested
        if (book.isRequested()) {
            // Handle the case where the book is already requested
            throw new IllegalStateException("Book is already requested by another user");
        }

        // Set the requested status and userId
        else {
        book.setRequested(true);
        book.setUserId(userId);
        bookRepository.save(book);
	}
	}

	@Override
	public String returnBook(Long bookId, int userId) {
		Book book = bookRepository.findById(bookId).orElseThrow(() -> new IllegalStateException(BOOK_NOT_FOUND));
		if (book.isAccepted() && book.getUserId() == userId) {
			book.setAccepted(false);
			book.setRequested(false);
			book.setUserId(0); // Reset userId
			bookRepository.save(book); // Update book
			return "Book returned successfully";
		} else {
			throw new IllegalStateException("Book is not currently borrowed by this user");
		}
	}

	@Override
	public Book getBookById(Long id) {
		return bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(BOOK_NOT_FOUND));
	}

	@Override
	public void updateBook(Book book) {
		bookRepository.save(book);
	}

	@Override
	public List<Book> getRequestedBooks() {
		return bookRepository.findAll().stream().filter(Book::isRequested).toList();
	}

	@Override
	public List<Book> getAcceptedBooks() {
		return bookRepository.findAll().stream().filter(Book::isAccepted).toList();
	}

}