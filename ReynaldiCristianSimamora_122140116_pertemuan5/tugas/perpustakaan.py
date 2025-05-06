from abc import ABC, abstractmethod
from datetime import datetime
import uuid

class LibraryItem(ABC):
    """Abstract base class untuk semua item perpustakaan"""
    
    def __init__(self, title, author, publication_year):
        self._id = str(uuid.uuid4())[:8]  # Generate ID unik
        self._title = title
        self._author = author
        self._publication_year = publication_year
        self._available = True
        self._date_added = datetime.now()
    
    @property
    def id(self):
        return self._id
    
    @property
    def title(self):
        return self._title
    
    @property
    def author(self):
        return self._author
    
    @property
    def publication_year(self):
        return self._publication_year
    
    @property
    def available(self):
        return self._available
    
    @available.setter
    def available(self, status):
        self._available = status
    
    @abstractmethod
    def display_details(self):
        """Method abstract yang harus diimplementasikan oleh subclass"""
        pass
    
    @abstractmethod
    def get_item_type(self):
        """Method abstract untuk mendapatkan tipe item"""
        pass
    
    def __str__(self):
        status = "Tersedia" if self._available else "Tidak Tersedia"
        return f"ID: {self._id} | {self._title} oleh {self._author} ({self._publication_year}) - {status}"


class Novel(LibraryItem):
    """Subclass untuk item Novel"""
    
    def __init__(self, title, author, publication_year, genre):
        super().__init__(title, author, publication_year)
        self.__genre = genre  # Private attribute
    
    @property
    def genre(self):
        return self.__genre
    
    def display_details(self):
        status = "Tersedia" if self.available else "Tidak Tersedia"
        return f"Novel: {self.title}\nPenulis: {self.author}\nTahun: {self.publication_year}\nGenre: {self.__genre}\nStatus: {status}\nID: {self.id}"
    
    def get_item_type(self):
        return "Novel"


class TextBook(LibraryItem):
    """Subclass untuk item Buku Teks"""
    
    def __init__(self, title, author, publication_year, subject, edition):
        super().__init__(title, author, publication_year)
        self.__subject = subject  # Private attribute
        self.__edition = edition
    
    @property
    def subject(self):
        return self.__subject
    
    @property
    def edition(self):
        return self.__edition
    
    def display_details(self):
        status = "Tersedia" if self.available else "Tidak Tersedia"
        return f"Buku Teks: {self.title}\nPenulis: {self.author}\nTahun: {self.publication_year}\nSubjek: {self.__subject}\nEdisi: {self.__edition}\nStatus: {status}\nID: {self.id}"
    
    def get_item_type(self):
        return "TextBook"


class Magazine(LibraryItem):
    """Subclass untuk item Majalah"""
    
    def __init__(self, title, publisher, publication_year, issue_number):
        super().__init__(title, publisher, publication_year)
        self.__issue_number = issue_number
    
    @property
    def issue_number(self):
        return self.__issue_number
    
    def display_details(self):
        status = "Tersedia" if self.available else "Tidak Tersedia"
        return f"Majalah: {self.title}\nPenerbit: {self.author}\nTahun: {self.publication_year}\nNomor Edisi: {self.__issue_number}\nStatus: {status}\nID: {self.id}"
    
    def get_item_type(self):
        return "Magazine"


class Library:
    """Class untuk mengelola koleksi item perpustakaan"""
    
    def __init__(self, name):
        self.__name = name
        self.__items = []
    
    @property
    def name(self):
        return self.__name
    
    @property
    def item_count(self):
        return len(self.__items)
    
    def add_item(self, item):
        """Menambahkan item ke perpustakaan"""
        if isinstance(item, LibraryItem):
            self.__items.append(item)
            return True
        return False
    
    def remove_item_by_id(self, item_id):
        """Menghapus item berdasarkan ID"""
        for i, item in enumerate(self.__items):
            if item.id == item_id:
                del self.__items[i]
                return True
        return False
    
    def remove_item_by_title(self, title):
        """Menghapus item berdasarkan judul"""
        for i, item in enumerate(self.__items):
            if item.title.lower() == title.lower():
                del self.__items[i]
                return True
        return False
    
    def search_by_id(self, item_id):
        """Mencari item berdasarkan ID"""
        for item in self.__items:
            if item.id == item_id:
                return item
        return None
    
    def search_by_title(self, title):
        """Mencari item berdasarkan judul"""
        results = []
        for item in self.__items:
            if title.lower() in item.title.lower():
                results.append(item)
        return results
    
    def display_all_items(self):
        """Menampilkan semua item di perpustakaan"""
        if not self.__items:
            return "Perpustakaan kosong."
        
        result = f"Daftar Item di {self.__name} (Total: {self.item_count}):\n"
        for i, item in enumerate(self.__items, 1):
            result += f"{i}. {item}\n"
        return result
    
    def filter_by_type(self, item_type=None):
        """Filter item berdasarkan tipe"""
        if item_type is None or item_type.lower() == "all":
            return self.__items
        
        filtered_items = []
        for item in self.__items:
            if item.get_item_type().lower() == item_type.lower():
                filtered_items.append(item)
        return filtered_items


# Sistem perpustakaan dengan menu interaktif
if __name__ == "__main__":
    # Membuat perpustakaan baru
    perpus = Library("Perpustakaan Kota")
    
    # Menambahkan beberapa data awal
    perpus.add_item(Novel("Laskar Pelangi", "Andrea Hirata", 2005, "Drama"))
    perpus.add_item(Novel("Bumi Manusia", "Pramoedya Ananta Toer", 1980, "Sejarah"))
    perpus.add_item(TextBook("Algoritma dan Pemrograman", "Rinaldi Munir", 2016, "Ilmu Komputer", "2"))
    perpus.add_item(Magazine("National Geographic", "National Geographic Society", 2023, "Vol. 243"))

    def clear_screen():
        """Membersihkan layar konsol"""
        import os
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def tampilkan_menu():
        """Menampilkan menu utama"""
        clear_screen()
        print(f"\n==== SISTEM MANAJEMEN {perpus.name.upper()} ====")
        print(f"Total Item: {perpus.item_count}")
        print("\nMENU:")
        print("1. Lihat Semua Item")
        print("2. Tambah Item Baru")
        print("3. Cari Item")
        print("4. Hapus Item")
        print("5. Filter Item")
        print("0. Keluar")
        return input("\nPilih menu (0-5): ")
    
    def tambah_item():
        """Menu untuk menambahkan item baru"""
        clear_screen()
        print("\n==== TAMBAH ITEM BARU ====")
        print("Pilih jenis item:")
        print("1. Novel")
        print("2. Buku Teks")
        print("3. Majalah")
        print("0. Kembali")
        
        pilihan = input("\nPilih jenis item (0-3): ")
        
        if pilihan == "0":
            return
        
        title = input("Judul: ")
        if pilihan == "1":
            author = input("Penulis: ")
            try:
                year = int(input("Tahun Terbit: "))
            except ValueError:
                print("Tahun harus berupa angka. Menggunakan tahun saat ini.")
                year = datetime.now().year
            genre = input("Genre: ")
            item = Novel(title, author, year, genre)
            perpus.add_item(item)
            print(f"\nNovel '{title}' telah ditambahkan dengan ID: {item.id}")
        
        elif pilihan == "2":
            author = input("Penulis: ")
            try:
                year = int(input("Tahun Terbit: "))
            except ValueError:
                print("Tahun harus berupa angka. Menggunakan tahun saat ini.")
                year = datetime.now().year
            subject = input("Subjek/Bidang: ")
            edition = input("Edisi: ")
            item = TextBook(title, author, year, subject, edition)
            perpus.add_item(item)
            print(f"\nBuku Teks '{title}' telah ditambahkan dengan ID: {item.id}")
        
        elif pilihan == "3":
            publisher = input("Penerbit: ")
            try:
                year = int(input("Tahun Terbit: "))
            except ValueError:
                print("Tahun harus berupa angka. Menggunakan tahun saat ini.")
                year = datetime.now().year
            issue = input("Nomor Edisi: ")
            item = Magazine(title, publisher, year, issue)
            perpus.add_item(item)
            print(f"\nMajalah '{title}' telah ditambahkan dengan ID: {item.id}")
        
        input("\nTekan Enter untuk kembali ke menu...")
    
    def lihat_semua_item():
        """Menampilkan semua item perpustakaan"""
        clear_screen()
        print("\n==== DAFTAR SEMUA ITEM ====")
        print(perpus.display_all_items())
        input("\nTekan Enter untuk kembali ke menu...")
    
    def cari_item():
        """Menu pencarian item"""
        clear_screen()
        print("\n==== CARI ITEM ====")
        print("1. Cari berdasarkan Judul")
        print("2. Cari berdasarkan ID")
        print("0. Kembali")
        
        pilihan = input("\nPilih metode pencarian (0-2): ")
        
        if pilihan == "0":
            return
        elif pilihan == "1":
            keyword = input("Masukkan judul atau kata kunci: ")
            results = perpus.search_by_title(keyword)
            
            if not results:
                print(f"\nTidak ditemukan item dengan judul mengandung '{keyword}'")
            else:
                print(f"\nDitemukan {len(results)} item:")
                for i, item in enumerate(results, 1):
                    print(f"\n--- Item {i} ---")
                    print(item.display_details())
        
        elif pilihan == "2":
            item_id = input("Masukkan ID item: ")
            item = perpus.search_by_id(item_id)
            
            if not item:
                print(f"\nTidak ditemukan item dengan ID '{item_id}'")
            else:
                print("\nItem ditemukan:")
                print(item.display_details())
        
        input("\nTekan Enter untuk kembali ke menu...")
    
    def hapus_item():
        """Menu untuk menghapus item"""
        clear_screen()
        print("\n==== HAPUS ITEM ====")
        print("1. Hapus berdasarkan Judul")
        print("2. Hapus berdasarkan ID")
        print("0. Kembali")
        
        pilihan = input("\nPilih metode penghapusan (0-2): ")
        
        if pilihan == "0":
            return
        elif pilihan == "1":
            title = input("Masukkan judul item yang akan dihapus: ")
            if perpus.remove_item_by_title(title):
                print(f"\nItem dengan judul '{title}' berhasil dihapus")
            else:
                print(f"\nTidak ditemukan item dengan judul '{title}'")
        
        elif pilihan == "2":
            item_id = input("Masukkan ID item yang akan dihapus: ")
            if perpus.remove_item_by_id(item_id):
                print(f"\nItem dengan ID '{item_id}' berhasil dihapus")
            else:
                print(f"\nTidak ditemukan item dengan ID '{item_id}'")
        
        input("\nTekan Enter untuk kembali ke menu...")
    
    def filter_item():
        """Menu untuk memfilter item berdasarkan tipe"""
        clear_screen()
        print("\n==== FILTER ITEM ====")
        print("1. Tampilkan semua item (all)")
        print("2. Filter hanya Novel")
        print("3. Filter hanya Buku Teks")
        print("4. Filter hanya Majalah")
        print("0. Kembali")
        
        pilihan = input("\nPilih filter (0-4): ")
        
        if pilihan == "0":
            return
        
        filter_type = None
        if pilihan == "1":
            filter_type = "all"
            print("\n=== SEMUA ITEM ===")
        elif pilihan == "2":
            filter_type = "Novel"
            print("\n=== DAFTAR NOVEL ===")
        elif pilihan == "3":
            filter_type = "TextBook"
            print("\n=== DAFTAR BUKU TEKS ===")
        elif pilihan == "4":
            filter_type = "Magazine"
            print("\n=== DAFTAR MAJALAH ===")
        
        if filter_type:
            items = perpus.filter_by_type(filter_type)
            if not items:
                print(f"Tidak ada item dengan tipe {filter_type}")
            else:
                for i, item in enumerate(items, 1):
                    print(f"{i}. {item}")
        
        input("\nTekan Enter untuk kembali ke menu...")
    
    # Loop menu utama
    while True:
        pilihan = tampilkan_menu()
        
        if pilihan == "0":
            print("\nTerima kasih telah menggunakan Sistem Manajemen Perpustakaan!")
            break
        elif pilihan == "1":
            lihat_semua_item()
        elif pilihan == "2":
            tambah_item()
        elif pilihan == "3":
            cari_item()
        elif pilihan == "4":
            hapus_item()
        elif pilihan == "5":
            filter_item()
        else:
            input("Pilihan tidak valid. Tekan Enter untuk melanjutkan...")