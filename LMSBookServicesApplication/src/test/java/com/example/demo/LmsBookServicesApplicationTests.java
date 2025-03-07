package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.client.AdminFeignClient;
import com.example.demo.entity.Book;
import com.example.demo.service.BookServiceImpl;

@ExtendWith(MockitoExtension.class)
public class LmsBookServicesApplicationTests {

	@Mock
	private AdminFeignClient adminFeignClient;

	@InjectMocks
	private BookServiceImpl bookService;

	private Book book1;
	private Book book2;

	@BeforeEach
	void setUp() {
		book1 = new Book(1L, "Title1", "Author1", false, false, 123);
		book2 = new Book(2L, "Title2", "Author2", true, false, 456);
	}

	@Test
	void testGetAllBooks() {
		when(adminFeignClient.getAllBooks()).thenReturn(Arrays.asList(book1, book2));

		List<Book> books = bookService.getAllBooks();
		assertEquals(2, books.size());
		verify(adminFeignClient, times(1)).getAllBooks();
	}

	@Test
	void testGetRequestedBooks() {
		when(adminFeignClient.getAllBooks()).thenReturn(Arrays.asList(book1, book2));

		List<Book> books = bookService.getRequestedBooks(123);
		assertEquals(0, books.size()); // None of the books are requested for userId 123

		book1.setRequested(true);
		when(adminFeignClient.getAllBooks()).thenReturn(Arrays.asList(book1, book2));
		books = bookService.getRequestedBooks(123);
		assertEquals(1, books.size());
		verify(adminFeignClient, times(2)).getAllBooks();
	}

	@Test
	void testRequestBook() {
		when(adminFeignClient.getBookById(anyLong())).thenReturn(book1);

		bookService.requestBook(1L, 123);
		verify(adminFeignClient, times(1)).requestBook(1L, 123);
	}

	@Test
	void testReturnBook() {
		when(adminFeignClient.returnBook(anyLong(), anyInt())).thenReturn("Book returned successfully");

		String response = bookService.returnBook(1L, 123);
		assertEquals("Book returned successfully", response);
		verify(adminFeignClient, times(1)).returnBook(1L, 123);
	}

	@Test
	void testAcceptBookRequest() {
		bookService.acceptBookRequest(1L, 123);
		verify(adminFeignClient, times(1)).acceptBookRequest(1L, 123);
	}

	@Test
	void testRejectBookRequest() {
		bookService.rejectBookRequest(1L, 123);
		verify(adminFeignClient, times(1)).rejectBookRequest(1L, 123);
	}

	@Test
	void testRevokeBook() {
		bookService.revokeBook(1L, 123);
		verify(adminFeignClient, times(1)).revokeBook(1L, 123);
	}
}
