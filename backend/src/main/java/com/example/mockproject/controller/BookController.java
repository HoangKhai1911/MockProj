package com.example.mockproject.controller;

import com.example.mockproject.model.Book;
import com.example.mockproject.service.BookService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    // GET /api/books
    @GetMapping
    public List<Book> getAll() {
        return service.getAll();
    }

    // GET /api/books/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Book> getById(@PathVariable("id") Long id) {

        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());

    }

    // GET /api/books/search?title=...
    @GetMapping("/search")
    public List<Book> search(@RequestParam("title") String title) {
        return service.searchByTitle(title);
    }

    // POST /api/books
    @PostMapping
    public ResponseEntity<Book> create(@Valid @RequestBody Book book) {
        Book created = service.create(book);
        return ResponseEntity.status(201).body(created);
    }

    // PUT /api/books/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Book> update(
            @PathVariable("id") Long id,
            @RequestBody Book book) {

        return service.update(id, book)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/books/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        boolean deleted = service.delete(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build(); // 204
    }
}