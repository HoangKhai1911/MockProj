"use client";

import { useState, useEffect } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
}

const API_URL = "http://localhost:8081/api/books";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  useEffect(() => {
    let ignore = false;
    const fetchInitialBooks = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (!ignore) setBooks(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
    fetchInitialBooks();
    return () => { ignore = true; };
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    try {
      const url = query ? `${API_URL}/search?title=${query}` : API_URL;
      const res = await fetch(url);
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
    }
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });
      const addedBook = await res.json();
      setBooks([addedBook, ...books]);
      setNewBook({ title: "", author: "" });
    } catch (error) {
      console.error("Lỗi khi thêm sách:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa sách:", error);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Khối Thống kê nhanh / Tiêu đề */}
      <div className="flex justify-between items-end border-b border-blue-200 pb-4">
        <div>
          {/* Đổi màu tiêu đề cho "sáng" và nổi bật hơn (dùng màu xanh blue sáng) */}
          <h1 className="text-3xl font-extrabold text-blue-600">Danh sách ấn phẩm</h1>
          <p className="text-blue-400 font-medium mt-1">Quản lý và cập nhật kho sách của bạn</p>
        </div>
        <div className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full shadow-sm">
          Tổng cộng: {books.length} quyển
        </div>
      </div>

      {/* Grid chứa Form thêm và Thanh tìm kiếm */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Cột trái: Tìm kiếm */}
        <div className="md:col-span-1 bg-white p-5 rounded-2xl shadow-md border border-gray-100 h-fit">
          <h2 className="font-semibold text-blue-600 mb-4">🔍 Tìm kiếm</h2>
          <input
            type="text"
            placeholder="Nhập tên sách..."
            /* text-black: chữ khi gõ màu đen | placeholder:text-gray-500: chữ mờ màu xám đậm | bg-gray-50: nền ô nhập sáng nhẹ */
            className="w-full border border-gray-300 bg-gray-50 text-black placeholder:text-gray-500 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            value={search}
            onChange={handleSearch}
          />
        </div>

        {/* Cột phải: Form thêm sách */}
        <div className="md:col-span-2 bg-white p-5 rounded-2xl shadow-md border border-gray-100">
           <h2 className="font-semibold text-blue-600 mb-4">✨ Thêm sách mới</h2>
          <form onSubmit={handleAddBook} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Tên sách"
              className="border border-gray-300 bg-gray-50 text-black placeholder:text-gray-500 p-3 rounded-xl flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tác giả"
              className="border border-gray-300 bg-gray-50 text-black placeholder:text-gray-500 p-3 rounded-xl flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            />
            <button type="submit" className="bg-blue-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-500 shadow-md shadow-blue-200 transition duration-200 whitespace-nowrap">
              + Thêm
            </button>
          </form>
        </div>

      </div>

      {/* Danh sách Sách */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        {books.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 text-lg">Trống rỗng! Hãy thử thêm một quyển sách mới.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {books.map((book) => (
              <li key={book.id} className="flex justify-between items-center p-6 hover:bg-blue-50 transition duration-150 group">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-16 bg-blue-100 rounded flex items-center justify-center text-2xl shadow-inner">
                    📖
                  </div>
                  <div>
                    {/* Tên sách màu đen đậm */}
                    <h3 className="font-bold text-lg text-black group-hover:text-blue-600 transition">{book.title}</h3>
                    <p className="text-gray-600 font-medium text-sm mt-1">{book.author}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg font-medium transition duration-200"
                  title="Xóa sách này"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}