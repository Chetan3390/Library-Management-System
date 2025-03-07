package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.dto.BookDto;
import com.example.demo.entity.Book;
import com.example.demo.repository.BookRepository;
import com.example.demo.service.AdminServiceImpl;

@ExtendWith(MockitoExtension.class)
class LmsAdminServicesApplicationTests {

	@Mock
	private BookRepository bookRepository;

	@InjectMocks
	private AdminServiceImpl adminService;

	private Book book;
	private BookDto bookDto;

	@BeforeEach
	void setUp() {
		book = new Book(1L, "Title", "Author", false, false, 0);
		bookDto = new BookDto();
		bookDto.setTitle("New Title");
		bookDto.setAuthor("New Author");
	}

	@Test
	void acceptBookRequest() {
		when(bookRepository.findById(anyLong())).thenReturn(Optional.of(book));
		book.setRequested(true);
		book.setUserId(1);

		adminService.acceptBookRequest(1L, 1);
		assertTrue(book.isAccepted());
		assertFalse(book.isRequested());
	}

	@Test
	void rejectBookRequest() {
		when(bookRepository.findById(anyLong())).thenReturn(Optional.of(book));
		book.setRequested(true);
		book.setUserId(1);

		adminService.rejectBookRequest(1L, 1);
		assertFalse(book.isRequested());
		assertEquals(0, book.getUserId());
	}

	@Test
	void revokeBook() {
		when(bookRepository.findById(anyLong())).thenReturn(Optional.of(book));
		book.setAccepted(true);
		book.setUserId(1);

		adminService.revokeBook(1L, 1);
		assertFalse(book.isAccepted());
		assertFalse(book.isRequested());
		assertEquals(0, book.getUserId());
	}

	@Test
	void addNewBook() {
		when(bookRepository.save(any(Book.class))).thenReturn(book);
		adminService.addNewBook(bookDto);
		verify(bookRepository, times(1)).save(any(Book.class));
	}

	@Test
	void deleteBook() {
		when(bookRepository.existsById(anyLong())).thenReturn(true);

		adminService.deleteBook(1L);
		verify(bookRepository, times(1)).deleteById(1L);
	}

	@Test
	void getAllBooks() {
		List<Book> books = new ArrayList<>();
		books.add(book);
		when(bookRepository.findAll()).thenReturn(books);

		List<Book> result = adminService.getAllBooks();
		assertEquals(books, result);
	}

	@Test
	void requestBook() {
		when(bookRepository.findById(anyLong())).thenReturn(Optional.of(book));

		adminService.requestBook(1L, 1);
		assertTrue(book.isRequested());
		assertEquals(1, book.getUserId());
	}

	@Test
	void returnBook() {
		when(bookRepository.findById(anyLong())).thenReturn(Optional.of(book));
		book.setRequested(true);
		book.setUserId(1);

		String result = adminService.returnBook(1L, 1);
		assertEquals("Book returned successfully", result);
		assertFalse(book.isRequested());
		assertEquals(0, book.getUserId());
	}

	@Test
	void getBookById() {
		when(bookRepository.findById(anyLong())).thenReturn(Optional.of(book));

		Book result = adminService.getBookById(1L);
		assertEquals(book, result);
	}

	@Test
	void updateBook() {
		when(bookRepository.save(any(Book.class))).thenReturn(book);

		adminService.updateBook(book);
		verify(bookRepository, times(1)).save(book);
	}

	@Test
	void getRequestedBooks() {
		List<Book> books = new ArrayList<>();
		books.add(book);
		when(bookRepository.findAll()).thenReturn(books);

		List<Book> result = adminService.getRequestedBooks();
		assertTrue(result.stream().allMatch(Book::isRequested));
	}

	@Test
	void getAcceptedBooks() {
		List<Book> books = new ArrayList<>();
		books.add(book);
		when(bookRepository.findAll()).thenReturn(books);

		List<Book> result = adminService.getAcceptedBooks();
		assertTrue(result.stream().allMatch(Book::isAccepted));
	}
}
