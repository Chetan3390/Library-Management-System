package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.client.UserFeignClient;
import com.example.demo.dto.BookDto;
import com.example.demo.entity.Book;
import com.example.demo.entity.User;
import com.example.demo.service.AdminService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {

	// Dependency Injection of AdminService
	private final AdminService adminService;
	
	private UserFeignClient userFeignClient;

	// Endpoint to accept a book request
	@PostMapping("/accept/{bookId}/{userId}")
	public ResponseEntity<String> acceptBookRequest(@PathVariable Long bookId, @PathVariable int userId) {
		adminService.acceptBookRequest(bookId, userId);
		return ResponseEntity.ok("Book request accepted successfully for user " + userId);
	}

	// Endpoint to reject a book request
	@PostMapping("/reject/{bookId}/{userId}")
	public ResponseEntity<String> rejectBookRequest(@PathVariable Long bookId, @PathVariable int userId) {
		adminService.rejectBookRequest(bookId, userId);
		return ResponseEntity.ok("Book request rejected successfully for user " + userId);
	}

	// Endpoint to revoke a book
	@PostMapping("/revoke/{bookId}/{userId}")
	public ResponseEntity<String> revokeBook(@PathVariable Long bookId, @PathVariable int userId) {
		adminService.revokeBook(bookId, userId);
		return ResponseEntity.ok("Book revoked successfully for user " + userId);
	}

	// Endpoint to add a new book
	@PostMapping("/add")
	public ResponseEntity<String> addNewBook(@Valid @RequestBody BookDto bookDto) {
		adminService.addNewBook(bookDto);
		return ResponseEntity.ok("New book added successfully");
	}

	// Endpoint to delete a book
	@DeleteMapping("/delete/{bookId}")
	public ResponseEntity<String> deleteBook(@PathVariable Long bookId) {
		adminService.deleteBook(bookId);
		return ResponseEntity.ok("Book deleted successfully");
	}

	// Endpoint to get all books
	@GetMapping("/books")
	public ResponseEntity<List<Book>> getAllBooks() {
		List<Book> books = adminService.getAllBooks();
		return ResponseEntity.ok(books);
	}

	// Endpoint to return a book (invoked by BookService)
	@PutMapping("/return/{bookId}/{userId}")
	public String returnBook(@PathVariable Long bookId, @PathVariable int userId) {
		return adminService.returnBook(bookId, userId);
	}

	// Endpoint to request a book
	@PutMapping("/request/{bookId}/{userId}")
	public void requestBook(@PathVariable Long bookId, @PathVariable int userId) {
		adminService.requestBook(bookId, userId);
	}
	
	@GetMapping("/book/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = adminService.getBookById(id);
        return ResponseEntity.ok(book);
    }

    @PutMapping("/update")
    public ResponseEntity<Void> updateBook(@RequestBody Book book) {
        adminService.updateBook(book);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/books/requested")
    public ResponseEntity<List<Book>> getRequestedBooks() {
        List<Book> books = adminService.getRequestedBooks();
        return ResponseEntity.ok(books);
    }

    @GetMapping("/books/accepted")
    public ResponseEntity<List<Book>> getAcceptedBooks() {
        List<Book> books = adminService.getAcceptedBooks();
        return ResponseEntity.ok(books);
    }
    
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<User> users = userFeignClient.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching user details: " + e.getMessage());
        }
    }

}