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