package com.example.demo.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.entity.Book;

//Feign client interface to communicate with the Admin Service
@FeignClient(name = "admin-service")
public interface AdminFeignClient {

	@GetMapping("/admin/book/{id}")
	Book getBookById(@PathVariable Long id);

	@GetMapping("/admin/books/requested")
	List<Book> getRequestedBooks();

	@GetMapping("/admin/books/accepted")
	List<Book> getAcceptedBooks();

	@GetMapping("/admin/books")
	List<Book> getAllBooks();

	@PutMapping("/admin/request/{bookId}/{userId}")
	void requestBook(@PathVariable Long bookId, @PathVariable int userId);

	@PostMapping("/admin/accept/{bookId}/{userId}")
	void acceptBookRequest(@PathVariable Long bookId, @PathVariable int userId);

	@PostMapping("/admin/reject/{bookId}/{userId}")
	void rejectBookRequest(@PathVariable Long bookId, @PathVariable int userId);

	@PostMapping("/admin/revoke/{bookId}/{userId}")
	void revokeBook(@PathVariable Long bookId, @PathVariable int userId);

	@PutMapping("/admin/return/{bookId}/{userId}")
	String returnBook(@PathVariable Long bookId,@PathVariable int userId);
}