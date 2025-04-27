# main.py
# Program utama yang mendemonstrasikan berbagai cara import modul

# ===== BERBAGAI CARA IMPORT =====
# 1. Import seluruh modul
import math_operations

# 2. Import fungsi dan konstanta spesifik secara langsung
from math_operations import (
    persegi, persegi_panjang, lingkaran,
    PI, EULER
)

# 3. Import dengan alias modul
import math_operations as mo

# 4. Import fungsi spesifik dengan alias
from math_operations import celcius_ke_fahrenheit as c2f
from math_operations import bunga_kontinyu as bk

# 5. Import beberapa fungsi spesifik dalam satu baris
from math_operations import belah_ketupat, layang_layang, jajar_genjang, trapesium
from math_operations import waktu_paruh, distribusi_normal, entropi_shannon


def garis():
    """Fungsi untuk menampilkan garis pemisah"""
    print("=" * 50)


def tampilkan_hasil_geometri(nama_bentuk, hasil):
    """Menampilkan hasil perhitungan geometri dengan format yang rapi"""
    print(f"\n--- Hasil Perhitungan {nama_bentuk} ---")
    print(f"Luas     : {hasil['luas']:.2f} satuan luas")
    print(f"Keliling : {hasil['keliling']:.2f} satuan panjang")


def menu_geometri():
    """Menu untuk perhitungan geometri"""
    garis()
    print("KALKULATOR GEOMETRI")
    print("1. Persegi (import langsung)")
    print("2. Persegi Panjang (import langsung)")
    print("3. Lingkaran (import langsung)")
    print("4. Belah Ketupat (import grup fungsi)")
    print("5. Layang-layang (import grup fungsi)")
    print("6. Jajar Genjang (import grup fungsi)")
    print("7. Trapesium (import grup fungsi)")
    print("8. Persegi Panjang (melalui namespace modul)")
    print("0. Kembali ke Menu Utama")
    
    pilihan = input("Pilih bentuk geometri (0-8): ")
    
    if pilihan == "1":
        # Menggunakan fungsi yang diimpor langsung
        sisi = float(input("Masukkan panjang sisi: "))
        hasil = persegi(sisi)
        tampilkan_hasil_geometri("Persegi", hasil)
        print("(Memanggil: 'persegi(sisi)' - fungsi yang diimpor langsung)")
    
    elif pilihan == "2":
        # Menggunakan fungsi yang diimpor langsung
        panjang = float(input("Masukkan panjang: "))
        lebar = float(input("Masukkan lebar: "))
        hasil = persegi_panjang(panjang, lebar)
        tampilkan_hasil_geometri("Persegi Panjang", hasil)
        print("(Memanggil: 'persegi_panjang(panjang, lebar)' - fungsi yang diimpor langsung)")
    
    elif pilihan == "3":
        # Menggunakan fungsi yang diimpor langsung
        jari_jari = float(input("Masukkan jari-jari: "))
        hasil = lingkaran(jari_jari)
        tampilkan_hasil_geometri("Lingkaran", hasil)
        print("(Memanggil: 'lingkaran(jari_jari)' - fungsi yang diimpor langsung)")
    
    elif pilihan == "4":
        # Menggunakan fungsi yang diimpor dalam grup
        diagonal1 = float(input("Masukkan diagonal 1: "))
        diagonal2 = float(input("Masukkan diagonal 2: "))
        sisi = float(input("Masukkan panjang sisi: "))
        hasil = belah_ketupat(diagonal1, diagonal2, sisi)
        tampilkan_hasil_geometri("Belah Ketupat", hasil)
        print("(Memanggil: 'belah_ketupat(...)' - diimpor dalam grup fungsi)")
    
    elif pilihan == "5":
        # Menggunakan fungsi yang diimpor dalam grup
        diagonal1 = float(input("Masukkan diagonal 1: "))
        diagonal2 = float(input("Masukkan diagonal 2: "))
        sisi_pendek = float(input("Masukkan sisi pendek: "))
        sisi_panjang = float(input("Masukkan sisi panjang: "))
        hasil = layang_layang(diagonal1, diagonal2, sisi_pendek, sisi_panjang)
        tampilkan_hasil_geometri("Layang-layang", hasil)
        print("(Memanggil: 'layang_layang(...)' - diimpor dalam grup fungsi)")
    
    elif pilihan == "6":
        # Menggunakan fungsi yang diimpor dalam grup
        alas = float(input("Masukkan alas: "))
        tinggi = float(input("Masukkan tinggi: "))
        sisi_miring = float(input("Masukkan sisi miring: "))
        hasil = jajar_genjang(alas, tinggi, sisi_miring)
        tampilkan_hasil_geometri("Jajar Genjang", hasil)
        print("(Memanggil: 'jajar_genjang(...)' - diimpor dalam grup fungsi)")
    
    elif pilihan == "7":
        # Menggunakan fungsi yang diimpor dalam grup
        sisi_atas = float(input("Masukkan sisi atas: "))
        sisi_bawah = float(input("Masukkan sisi bawah: "))
        tinggi = float(input("Masukkan tinggi: "))
        sisi_miring1 = float(input("Masukkan sisi miring 1: "))
        sisi_miring2 = float(input("Masukkan sisi miring 2: "))
        hasil = trapesium(sisi_atas, sisi_bawah, tinggi, sisi_miring1, sisi_miring2)
        tampilkan_hasil_geometri("Trapesium", hasil)
        print("(Memanggil: 'trapesium(...)' - diimpor dalam grup fungsi)")
    
    elif pilihan == "8":
        # Menggunakan fungsi melalui namespace modul
        panjang = float(input("Masukkan panjang: "))
        lebar = float(input("Masukkan lebar: "))
        # Gunakan modul penuh, bukan fungsi yang diimpor langsung
        hasil = math_operations.persegi_panjang(panjang, lebar)
        tampilkan_hasil_geometri("Persegi Panjang", hasil)
        print("(Memanggil: 'math_operations.persegi_panjang(...)' - melalui namespace modul)")
    
    elif pilihan == "0":
        return
    
    else:
        print("Pilihan tidak valid!")


def menu_konversi_suhu():
    """Menu untuk konversi suhu"""
    garis()
    print("KONVERSI SUHU")
    print("1. Celcius ke Fahrenheit (fungsi alias)")
    print("2. Reamur ke lainnya (modul alias)")
    print("3. Fahrenheit ke lainnya (namespace penuh)")
    print("4. Kelvin ke lainnya (namespace penuh)")
    print("0. Kembali ke Menu Utama")
    
    pilihan = input("Pilih konversi suhu (0-4): ")
    
    if pilihan == "1":
        celcius = float(input("Masukkan suhu dalam Celcius: "))
        print(f"\n--- Hasil Konversi dari {celcius}°C ---")
        # Menggunakan fungsi dengan alias
        fahrenheit = c2f(celcius)
        print(f"Fahrenheit : {fahrenheit:.2f}°F")
        print("(Memanggil: 'c2f(celcius)' - fungsi alias)")
    
    elif pilihan == "2":
        reamur = float(input("Masukkan suhu dalam Reamur: "))
        print(f"\n--- Hasil Konversi dari {reamur}°R ---")
        # Menggunakan modul dengan alias
        celcius = mo.reamur_ke_celcius(reamur)
        fahrenheit = mo.reamur_ke_fahrenheit(reamur)
        kelvin = mo.reamur_ke_kelvin(reamur)
        print(f"Celcius    : {celcius:.2f}°C")
        print(f"Fahrenheit : {fahrenheit:.2f}°F")
        print(f"Kelvin     : {kelvin:.2f}K")
        print("(Memanggil: 'mo.reamur_ke_xxx(...)' - modul alias)")
    
    elif pilihan == "3":
        fahrenheit = float(input("Masukkan suhu dalam Fahrenheit: "))
        print(f"\n--- Hasil Konversi dari {fahrenheit}°F ---")
        # Menggunakan namespace modul penuh
        celcius = math_operations.fahrenheit_ke_celcius(fahrenheit)
        reamur = math_operations.fahrenheit_ke_reamur(fahrenheit)
        kelvin = math_operations.fahrenheit_ke_kelvin(fahrenheit)
        print(f"Celcius    : {celcius:.2f}°C")
        print(f"Reamur     : {reamur:.2f}°R")
        print(f"Kelvin     : {kelvin:.2f}K")
        print("(Memanggil: 'math_operations.fahrenheit_ke_xxx(...)' - namespace penuh)")
    
    elif pilihan == "4":
        kelvin = float(input("Masukkan suhu dalam Kelvin: "))
        print(f"\n--- Hasil Konversi dari {kelvin}K ---")
        # Menggunakan namespace modul penuh
        celcius = math_operations.kelvin_ke_celcius(kelvin)
        reamur = math_operations.kelvin_ke_reamur(kelvin)
        fahrenheit = math_operations.kelvin_ke_fahrenheit(kelvin)
        print(f"Celcius    : {celcius:.2f}°C")
        print(f"Reamur     : {reamur:.2f}°R")
        print(f"Fahrenheit : {fahrenheit:.2f}°F")
        print("(Memanggil: 'math_operations.kelvin_ke_xxx(...)' - namespace penuh)")
    
    elif pilihan == "0":
        return
    
    else:
        print("Pilihan tidak valid!")


def tampilkan_konstanta():
    """Menampilkan nilai konstanta dari modul"""
    garis()
    print("NILAI KONSTANTA")
    print("Menggunakan berbagai cara import:")
    
    # 1. Konstanta yang diimpor langsung
    print(f"PI    = {PI} (Import langsung)")
    print(f"EULER = {EULER} (Import langsung)")
    
    # 2. Konstanta melalui namespace modul penuh
    print(f"PI    = {math_operations.PI} (Namespace modul penuh)")
    
    # 3. Konstanta melalui alias modul
    print(f"EULER = {mo.EULER} (Alias modul)")


def menu_keuangan_statistik():
    """Menu untuk fungsi keuangan dan statistik"""
    garis()
    print("KEUANGAN DAN STATISTIK")
    print("1. Bunga Majemuk (namespace modul)")
    print("2. Bunga Kontinyu (fungsi alias)")
    print("3. Peluruhan Eksponensial (modul alias)")
    print("4. Waktu Paruh (import grup)")
    print("5. Distribusi Normal (import grup)")
    print("6. Entropi Shannon (import grup)")
    print("0. Kembali ke Menu Utama")
    
    pilihan = input("Pilih fungsi (0-6): ")
    
    if pilihan == "1":
        pokok = float(input("Masukkan nilai pokok awal: "))
        suku_bunga = float(input("Masukkan suku bunga tahunan (dalam desimal, misal 0.05 untuk 5%): "))
        waktu = float(input("Masukkan jangka waktu (tahun): "))
        frekuensi = int(input("Masukkan frekuensi pemberian bunga per tahun: "))
        # Menggunakan namespace modul penuh
        hasil = math_operations.bunga_majemuk(pokok, suku_bunga, waktu, frekuensi)
        print(f"\nHasil investasi setelah {waktu} tahun: {hasil:.2f}")
        print("(Memanggil: 'math_operations.bunga_majemuk(...)' - namespace modul penuh)")
    
    elif pilihan == "2":
        pokok = float(input("Masukkan nilai pokok awal: "))
        suku_bunga = float(input("Masukkan suku bunga tahunan (dalam desimal, misal 0.05 untuk 5%): "))
        waktu = float(input("Masukkan jangka waktu (tahun): "))
        # Menggunakan fungsi alias
        hasil = bk(pokok, suku_bunga, waktu)
        print(f"\nHasil investasi dengan bunga kontinyu setelah {waktu} tahun: {hasil:.2f}")
        print(f"(Menggunakan konstanta EULER = {EULER})")
        print("(Memanggil: 'compound_continuous(...)' - fungsi alias)")
    
    elif pilihan == "3":
        jumlah_awal = float(input("Masukkan jumlah awal: "))
        konstanta_peluruhan = float(input("Masukkan konstanta peluruhan: "))
        waktu = float(input("Masukkan waktu yang telah berlalu: "))
        # Menggunakan modul alias
        hasil = mo.peluruhan_eksponensial(jumlah_awal, konstanta_peluruhan, waktu)
        print(f"\nJumlah yang tersisa setelah peluruhan: {hasil:.4f}")
        print(f"(Menggunakan konstanta EULER = {EULER})")
        print("(Memanggil: 'mo.peluruhan_eksponensial(...)' - modul alias)")
    
    elif pilihan == "4":
        konstanta_peluruhan = float(input("Masukkan konstanta peluruhan: "))
        # Menggunakan fungsi yang diimpor dalam grup
        hasil = waktu_paruh(konstanta_peluruhan)
        print(f"\nWaktu paruh: {hasil:.4f}")
        print("(Memanggil: 'waktu_paruh(...)' - diimpor dalam grup fungsi)")
    
    elif pilihan == "5":
        x = float(input("Masukkan nilai x: "))
        mu = float(input("Masukkan nilai rata-rata (mu): "))
        sigma = float(input("Masukkan nilai standar deviasi (sigma): "))
        # Menggunakan fungsi yang diimpor dalam grup
        hasil = distribusi_normal(x, mu, sigma)
        print(f"\nNilai PDF pada x={x}: {hasil:.6f}")
        print(f"(Menggunakan konstanta EULER = {EULER} dan PI = {PI})")
        print("(Memanggil: 'distribusi_normal(...)' - diimpor dalam grup fungsi)")
    
    elif pilihan == "6":
        print("Masukkan probabilitas (dipisahkan dengan spasi, jumlah = 1): ")
        prob_input = input()
        probabilitas = [float(p) for p in prob_input.split()]
        # Periksa apakah total probabilitas ≈ 1
        if abs(sum(probabilitas) - 1.0) > 0.001:
            print("Peringatan: Jumlah probabilitas tidak sama dengan 1")
        # Menggunakan fungsi yang diimpor dalam grup
        hasil = entropi_shannon(probabilitas)
        print(f"\nEntropi Shannon: {hasil:.4f}")
        print(f"(Menggunakan konstanta EULER = {EULER} untuk logaritma natural)")
        print("(Memanggil: 'entropi_shannon(...)' - diimpor dalam grup fungsi)")
    
    elif pilihan == "0":
        return
    
    else:
        print("Pilihan tidak valid!")


def menu_utama():
    """Menu utama program"""
    while True:
        garis()
        print("\nAPLIKASI MATEMATIKA PYTHON")
        print("1. Perhitungan Geometri")
        print("2. Konversi Suhu")
        print("3. Keuangan dan Statistik")
        print("4. Lihat Nilai Konstanta")
        print("0. Keluar")
        
        pilihan = input("Pilih menu (0-4): ")
        
        if pilihan == "1":
            menu_geometri()
        elif pilihan == "2":
            menu_konversi_suhu()
        elif pilihan == "3":
            menu_keuangan_statistik()
        elif pilihan == "4":
            tampilkan_konstanta()
        elif pilihan == "0":
            print("Terima kasih telah menggunakan aplikasi ini!")
            break
        else:
            print("Pilihan tidak valid!")


# Menjalankan program
if __name__ == "__main__":
    menu_utama()