from library_item import Novel, TextBook, Magazine
from library import Library

def create_sample_data():
    """Fungsi untuk membuat data sampel perpustakaan"""
    # Membuat objek Library
    perpus = Library("Perpustakaan Kota")
    
    # Menambahkan Novel
    perpus.add_item(Novel("Laskar Pelangi", "Andrea Hirata", 2005, "Drama"))
    perpus.add_item(Novel("Bumi Manusia", "Pramoedya Ananta Toer", 1980, "Sejarah"))
    perpus.add_item(Novel("Hujan", "Tere Liye", 2016, "Romance"))
    perpus.add_item(Novel("Cantik Itu Luka", "Eka Kurniawan", 2002, "Drama"))
    perpus.add_item(Novel("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 1997, "Fantasy"))
    perpus.add_item(Novel("The Hunger Games", "Suzanne Collins", 2008, "Dystopian"))
    perpus.add_item(Novel("To Kill a Mockingbird", "Harper Lee", 1960, "Drama"))
    perpus.add_item(Novel("1984", "George Orwell", 1949, "Dystopian"))
    perpus.add_item(Novel("Pride and Prejudice", "Jane Austen", 1813, "Romance"))
    perpus.add_item(Novel("The Great Gatsby", "F. Scott Fitzgerald", 1925, "Drama"))

    # Menambahkan Buku Teks
    perpus.add_item(TextBook("Algoritma dan Pemrograman", "Rinaldi Munir", 2016, "Ilmu Komputer", "2"))
    perpus.add_item(TextBook("Fisika Dasar", "Halliday & Resnick", 2018, "Fisika", "10"))
    perpus.add_item(TextBook("Struktur Data", "Thomas H. Cormen", 2020, "Ilmu Komputer", "3"))
    perpus.add_item(TextBook("Matematika Diskrit", "Kenneth H. Rosen", 2014, "Matematika", "7"))
    perpus.add_item(TextBook("Jaringan Komputer", "Andrew S. Tanenbaum", 2019, "Ilmu Komputer", "5"))
    perpus.add_item(TextBook("Basis Data", "Elmasri & Navathe", 2016, "Ilmu Komputer", "6"))
    perpus.add_item(TextBook("Kalkulus", "James Stewart", 2018, "Matematika", "8"))
    perpus.add_item(TextBook("Fisika Modern", "Kenneth S. Krane", 2017, "Fisika", "9"))
    perpus.add_item(TextBook("Algoritma Genetika", "Melanie Mitchell", 2009, "Ilmu Komputer", "1"))
    perpus.add_item(TextBook("Rekayasa Perangkat Lunak", "Roger Pressman", 2020, "Ilmu Komputer", "10"))

    # Menambahkan Majalah
    perpus.add_item(Magazine("National Geographic", "National Geographic Society", 2023, "Vol. 243"))
    perpus.add_item(Magazine("Tempo", "Tempo Media Group", 2024, "Edisi April"))
    perpus.add_item(Magazine("Bobo", "Kompas Gramedia", 2023, "No. 15"))
    perpus.add_item(Magazine("Time", "Time Inc.", 2024, "March Edition"))
    perpus.add_item(Magazine("Scientific American", "Springer Nature", 2023, "Vol. 208"))
    perpus.add_item(Magazine("Wired", "Condé Nast", 2024, "April Issue"))
    perpus.add_item(Magazine("Forbes", "Forbes Media", 2024, "Edisi Mei"))
    perpus.add_item(Magazine("The Economist", "The Economist Group", 2024, "Global Edition"))
    perpus.add_item(Magazine("The New Yorker", "Condé Nast", 2024, "Edisi Maret"))
    perpus.add_item(Magazine("Newsweek", "Newsweek Media Group", 2024, "April Edition"))
    
    return perpus