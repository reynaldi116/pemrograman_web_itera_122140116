# Program Penghitung BMI (Body Mass Index)

def hitung_bmi(berat, tinggi):
    """
    Fungsi untuk menghitung BMI dan menentukan kategorinya
    Parameter:
        berat: berat badan dalam kg
        tinggi: tinggi badan dalam meter
    Return:
        tuple berisi nilai BMI dan kategorinya
    """
    # Hitung BMI
    bmi = berat / (tinggi * tinggi)
    
    # Tentukan kategori BMI
    if bmi < 18.5:
        kategori = "Berat badan kurang"
    elif 18.5 <= bmi < 25:
        kategori = "Berat badan normal"
    elif 25 <= bmi < 30:
        kategori = "Berat badan berlebih"
    else:  # BMI >= 30
        kategori = "Obesitas"
    
    return bmi, kategori

def main():
    print("KALKULATOR BMI (BODY MASS INDEX)")
    print("--------------------------------")
    
    # Input dari pengguna
    try:
        berat = float(input("Masukkan berat badan (kg): "))
        tinggi = float(input("Masukkan tinggi badan (m): "))
        
        # Validasi input
        if berat <= 0 or tinggi <= 0:
            print("Error: Berat dan tinggi harus lebih dari 0")
            return
        
        # Hitung BMI dan dapatkan kategori
        bmi, kategori = hitung_bmi(berat, tinggi)
        
        # Tampilkan hasil
        print("\nHasil Perhitungan:")
        print(f"BMI = {bmi:.2f}")
        print(f"Kategori: {kategori}")
        
    except ValueError:
        print("Error: Masukkan angka yang valid")
    except Exception as e:
        print(f"Terjadi kesalahan: {e}")

# Jalankan program
if __name__ == "__main__":
    main()
    