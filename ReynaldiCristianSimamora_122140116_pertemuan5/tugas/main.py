from datetime import datetime
import os
from library_item import Novel, TextBook, Magazine
from library import Library
from sample_data import create_sample_data

def clear_screen():
    """Membersihkan layar konsol"""
    os.system('cls' if os.name == 'nt' else 'clear')

def tampilkan_menu(perpus):
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

def tambah_item(perpus):
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

def lihat_semua_item(perpus):
    """Menampilkan semua item perpustakaan"""
    clear_screen()
    print("\n==== DAFTAR SEMUA ITEM ====")
    print(perpus.display_all_items())
    input("\nTekan Enter untuk kembali ke menu...")

def cari_item(perpus):
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

def hapus_item(perpus):
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

def filter_item(perpus):
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

def main():
    """Fungsi utama program"""
    # Membuat library dengan data sampel
    print("Memuat data perpustakaan...")
    perpus = create_sample_data()
    
    # Loop menu utama
    while True:
        pilihan = tampilkan_menu(perpus)
        
        if pilihan == "0":
            print("\nTerima kasih telah menggunakan Sistem Manajemen Perpustakaan!")
            break
        elif pilihan == "1":
            lihat_semua_item(perpus)
        elif pilihan == "2":
            tambah_item(perpus)
        elif pilihan == "3":
            cari_item(perpus)
        elif pilihan == "4":
            hapus_item(perpus)
        elif pilihan == "5":
            filter_item(perpus)
        else:
            input("Pilihan tidak valid. Tekan Enter untuk melanjutkan...")

if __name__ == "__main__":
    main()