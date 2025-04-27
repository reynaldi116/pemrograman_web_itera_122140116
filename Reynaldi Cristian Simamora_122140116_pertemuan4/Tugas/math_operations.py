# math_operations.py
# Modul matematika dengan fungsi geometri dan konversi suhu

# Konstanta
PI = 3.14159
EULER = 2.71828

# ===== FUNGSI GEOMETRI =====

def persegi(sisi):
    """
    Menghitung luas dan keliling persegi
    """
    luas = sisi * sisi
    keliling = 4 * sisi
    return {"luas": luas, "keliling": keliling}

def persegi_panjang(panjang, lebar):
    """
    Menghitung luas dan keliling persegi panjang
    """
    luas = panjang * lebar
    keliling = 2 * (panjang + lebar)
    return {"luas": luas, "keliling": keliling}

def lingkaran(jari_jari):
    """
    Menghitung luas dan keliling lingkaran
    """
    luas = PI * jari_jari * jari_jari
    keliling = 2 * PI * jari_jari
    return {"luas": luas, "keliling": keliling}

def belah_ketupat(diagonal1, diagonal2, sisi):
    """
    Menghitung luas dan keliling belah ketupat
    """
    luas = 0.5 * diagonal1 * diagonal2
    keliling = 4 * sisi
    return {"luas": luas, "keliling": keliling}

def layang_layang(diagonal1, diagonal2, sisi_pendek, sisi_panjang):
    """
    Menghitung luas dan keliling layang-layang
    """
    luas = 0.5 * diagonal1 * diagonal2
    keliling = 2 * (sisi_pendek + sisi_panjang)
    return {"luas": luas, "keliling": keliling}

def jajar_genjang(alas, tinggi, sisi_miring):
    """
    Menghitung luas dan keliling jajar genjang
    """
    luas = alas * tinggi
    keliling = 2 * (alas + sisi_miring)
    return {"luas": luas, "keliling": keliling}

def trapesium(sisi_atas, sisi_bawah, tinggi, sisi_miring1, sisi_miring2):
    """
    Menghitung luas dan keliling trapesium
    """
    luas = 0.5 * (sisi_atas + sisi_bawah) * tinggi
    keliling = sisi_atas + sisi_bawah + sisi_miring1 + sisi_miring2
    return {"luas": luas, "keliling": keliling}

# ===== FUNGSI KONVERSI SUHU =====

def celcius_ke_reamur(celcius):
    """
    Konversi suhu dari Celcius ke Reamur
    """
    return (4/5) * celcius

def celcius_ke_fahrenheit(celcius):
    """
    Konversi suhu dari Celcius ke Fahrenheit
    """
    return (9/5) * celcius + 32

def celcius_ke_kelvin(celcius):
    """
    Konversi suhu dari Celcius ke Kelvin
    """
    return celcius + 273.15

def reamur_ke_celcius(reamur):
    """
    Konversi suhu dari Reamur ke Celcius
    """
    return (5/4) * reamur

def reamur_ke_fahrenheit(reamur):
    """
    Konversi suhu dari Reamur ke Fahrenheit
    """
    return (9/4) * reamur + 32

def reamur_ke_kelvin(reamur):
    """
    Konversi suhu dari Reamur ke Kelvin
    """
    return (5/4) * reamur + 273.15

def fahrenheit_ke_celcius(fahrenheit):
    """
    Konversi suhu dari Fahrenheit ke Celcius
    """
    return (5/9) * (fahrenheit - 32)

def fahrenheit_ke_reamur(fahrenheit):
    """
    Konversi suhu dari Fahrenheit ke Reamur
    """
    return (4/9) * (fahrenheit - 32)

def fahrenheit_ke_kelvin(fahrenheit):
    """
    Konversi suhu dari Fahrenheit ke Kelvin
    """
    return (5/9) * (fahrenheit - 32) + 273.15

def kelvin_ke_celcius(kelvin):
    """
    Konversi suhu dari Kelvin ke Celcius
    """
    return kelvin - 273.15

def kelvin_ke_reamur(kelvin):
    """
    Konversi suhu dari Kelvin ke Reamur
    """
    return (4/5) * (kelvin - 273.15)

def kelvin_ke_fahrenheit(kelvin):
    """
    Konversi suhu dari Kelvin ke Fahrenheit
    """
    return (9/5) * (kelvin - 273.15) + 32

# Fungsi yang menggunakan konstanta EULER

def bunga_majemuk(pokok, suku_bunga, waktu, frekuensi=1):
    """
    Menghitung jumlah akhir dari investasi dengan bunga majemuk
    menggunakan rumus: P(1 + r/n)^(nt)
    
    Parameters:
    pokok (float): Nilai pokok investasi awal
    suku_bunga (float): Suku bunga tahunan (dalam desimal, misal 0.05 untuk 5%)
    waktu (float): Jangka waktu investasi (dalam tahun)
    frekuensi (int): Frekuensi pemberian bunga per tahun (default=1)
    
    Returns:
    float: Jumlah akhir investasi
    """
    return pokok * ((1 + suku_bunga/frekuensi) ** (frekuensi * waktu))

def bunga_kontinyu(pokok, suku_bunga, waktu):
    """
    Menghitung jumlah akhir dari investasi dengan bunga majemuk kontinyu
    menggunakan rumus: P * e^(rt)
    
    Parameters:
    pokok (float): Nilai pokok investasi awal
    suku_bunga (float): Suku bunga tahunan (dalam desimal, misal 0.05 untuk 5%)
    waktu (float): Jangka waktu investasi (dalam tahun)
    
    Returns:
    float: Jumlah akhir investasi
    """
    return pokok * (EULER ** (suku_bunga * waktu))

def peluruhan_eksponensial(jumlah_awal, konstanta_peluruhan, waktu):
    """
    Menghitung jumlah yang tersisa setelah peluruhan eksponensial
    menggunakan rumus: N(t) = N₀ * e^(-λt)
    
    Parameters:
    jumlah_awal (float): Jumlah awal
    konstanta_peluruhan (float): Konstanta peluruhan (lambda)
    waktu (float): Waktu yang telah berlalu
    
    Returns:
    float: Jumlah yang tersisa
    """
    return jumlah_awal * (EULER ** (-konstanta_peluruhan * waktu))

def waktu_paruh(konstanta_peluruhan):
    """
    Menghitung waktu paruh dari konstanta peluruhan
    menggunakan rumus: t₁/₂ = ln(2)/λ
    
    Parameters:
    konstanta_peluruhan (float): Konstanta peluruhan (lambda)
    
    Returns:
    float: Waktu paruh
    """
    return (0.693147180559945) / konstanta_peluruhan  # ln(2) ≈ 0.693147180559945

def distribusi_normal(x, mu, sigma):
    """
    Menghitung nilai fungsi kepadatan probabilitas dari distribusi normal
    pada titik x dengan rata-rata mu dan standar deviasi sigma
    
    Parameters:
    x (float): Titik untuk menghitung PDF
    mu (float): Rata-rata distribusi
    sigma (float): Standar deviasi distribusi
    
    Returns:
    float: Nilai PDF pada titik x
    """
    import math
    coefficient = 1 / (sigma * math.sqrt(2 * PI))
    exponent = -((x - mu) ** 2) / (2 * sigma ** 2)
    return coefficient * (EULER ** exponent)

def entropi_shannon(probabilitas):
    """
    Menghitung entropi Shannon dari distribusi probabilitas
    
    Parameters:
    probabilitas (list): Daftar probabilitas dari semua kejadian
    
    Returns:
    float: Nilai entropi Shannon
    """
    import math
    entropi = 0
    for p in probabilitas:
        if p > 0:  # Hindari log(0)
            entropi -= p * math.log(p, EULER)  # Menggunakan log basis e (natural log)
    return entropi