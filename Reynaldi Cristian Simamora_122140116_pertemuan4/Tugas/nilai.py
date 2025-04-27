# Program Pengelolaan Data Nilai Mahasiswa

def hitung_nilai_akhir(nilai_uts, nilai_uas, nilai_tugas):
    """
    Menghitung nilai akhir berdasarkan bobot:
    - 30% dari nilai UTS
    - 40% dari nilai UAS
    - 30% dari nilai tugas
    """
    return (0.3 * nilai_uts) + (0.4 * nilai_uas) + (0.3 * nilai_tugas)

def tentukan_grade(nilai_akhir):
    """
    Menentukan grade berdasarkan nilai akhir:
    - A: nilai akhir 80 atau lebih
    - B: nilai akhir 70 sampai 79
    - C: nilai akhir 60 sampai 69
    - D: nilai akhir 50 sampai 59
    - E: nilai akhir kurang dari 50
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"

def tampilkan_tabel(data_mahasiswa):
    """
    Menampilkan data mahasiswa dalam format tabel
    """
    # Header tabel
    print("\n" + "="*100)
    print("| {:<4} | {:<20} | {:<10} | {:<8} | {:<8} | {:<10} | {:<11} | {:<6} |".format(
        "No", "Nama", "NIM", "UTS", "UAS", "Tugas", "Nilai Akhir", "Grade"))
    print("="*100)
    
    # Isi tabel
    for i, mhs in enumerate(data_mahasiswa, 1):
        print("| {:<4} | {:<20} | {:<10} | {:<8} | {:<8} | {:<10} | {:<11.2f} | {:<6} |".format(
            i,
            mhs["nama"],
            mhs["nim"],
            mhs["nilai_uts"],
            mhs["nilai_uas"],
            mhs["nilai_tugas"],
            mhs["nilai_akhir"],
            mhs["grade"]
        ))
    
    print("="*100)

def tampilkan_nilai_tertinggi_terendah(data_mahasiswa):
    """
    Menampilkan mahasiswa dengan nilai tertinggi dan terendah
    """
    # Cari mahasiswa dengan nilai tertinggi dan terendah
    nilai_tertinggi = max(data_mahasiswa, key=lambda x: x["nilai_akhir"])
    nilai_terendah = min(data_mahasiswa, key=lambda x: x["nilai_akhir"])
    
    # Tampilkan informasi
    print("\nMahasiswa dengan nilai tertinggi:")
    print(f"Nama: {nilai_tertinggi['nama']}")
    print(f"NIM: {nilai_tertinggi['nim']}")
    print(f"Nilai Akhir: {nilai_tertinggi['nilai_akhir']:.2f}")
    print(f"Grade: {nilai_tertinggi['grade']}")
    
    print("\nMahasiswa dengan nilai terendah:")
    print(f"Nama: {nilai_terendah['nama']}")
    print(f"NIM: {nilai_terendah['nim']}")
    print(f"Nilai Akhir: {nilai_terendah['nilai_akhir']:.2f}")
    print(f"Grade: {nilai_terendah['grade']}")

def main():
    # Daftar data mahasiswa (nama, nim, nilai_uts, nilai_uas, nilai_tugas)
    data_mahasiswa = [
        {
            "nama": "Budi Santoso",
            "nim": "A12345678",
            "nilai_uts": 85,
            "nilai_uas": 90,
            "nilai_tugas": 88
        },
        {
            "nama": "Ani Wijaya",
            "nim": "B12345678",
            "nilai_uts": 75,
            "nilai_uas": 82,
            "nilai_tugas": 78
        },
        {
            "nama": "Dedi Kurniawan",
            "nim": "C12345678",
            "nilai_uts": 65,
            "nilai_uas": 70,
            "nilai_tugas": 75
        },
        {
            "nama": "Eka Putri",
            "nim": "D12345678",
            "nilai_uts": 90,
            "nilai_uas": 95,
            "nilai_tugas": 92
        },
        {
            "nama": "Farhan Rahman",
            "nim": "E12345678",
            "nilai_uts": 55,
            "nilai_uas": 45,
            "nilai_tugas": 60
        },
        {
            "nama": "Gita Nirmala",
            "nim": "F12345678",
            "nilai_uts": 78,
            "nilai_uas": 65,
            "nilai_tugas": 70
        }
    ]
    
    # Hitung nilai akhir dan tentukan grade untuk setiap mahasiswa
    for mhs in data_mahasiswa:
        mhs["nilai_akhir"] = hitung_nilai_akhir(mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"])
        mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])
    
    # Tampilkan judul program
    print("\n" + " PROGRAM PENGELOLAAN DATA NILAI MAHASISWA ".center(100, "="))
    
    # Tampilkan data dalam bentuk tabel
    tampilkan_tabel(data_mahasiswa)
    
    # Tampilkan mahasiswa dengan nilai tertinggi dan terendah
    tampilkan_nilai_tertinggi_terendah(data_mahasiswa)

# Jalankan program
if __name__ == "__main__":
    main()

    