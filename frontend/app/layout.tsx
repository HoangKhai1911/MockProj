import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Library - Quản Lý Thư Viện",
  description: "Hệ thống quản lý sách",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} flex flex-col min-h-screen bg-blue-50 text-slate-900`}>
        
        {/* --- Header / Navbar --- */}
        <header className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold flex items-center gap-2 cursor-pointer">
              📚 <span className="tracking-wider">Library</span>
            </div>
            {/* Các link điều hướng (hiện tại làm UI giả lập) */}
            <nav className="hidden md:flex gap-6 font-medium text-white-100">
              <a href="#" className="text-white border-b-2 border-white pb-1">Trang chủ</a>
            </nav>
          </div>
        </header>

        {/* --- Phần nội dung động (Các trang sẽ hiển thị ở đây) --- */}
        <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-8">
          {children}
        </main>

        {/* --- Footer --- */}
        <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm mt-auto">
          <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
            <p>© {new Date().getFullYear()} LibraryManagement System. All rights reserved.</p>
            <p>Phát triển bởi <span className="text-white font-medium">KhaiDNH</span></p>
          </div>
        </footer>

      </body>
    </html>
  );
}