# Reynaldi Cristian Simamora
# 122140116
# Pemrograman Web Praktikum 6 RB
# Manajemen Mata Kuliah

Aplikasi ini merupakan sistem manajemen mata kuliah berbasis web yang dibangun menggunakan Python, Pyramid, dan Alembic. Aplikasi ini menyediakan fitur CRUD untuk entitas terkait mata kuliah serta mendukung pengujian endpoint API.

---

## 🚀 Memulai Proyek

Ikuti langkah-langkah berikut untuk menyiapkan dan menjalankan proyek ini secara lokal:

### 1. Pindah ke Direktori Proyek

```
cd matakuliah
```
### 2. Buat dan Aktifkan Virtual Environment

```
python3 -m venv env
Aktifkan environment:

Windows:
venv\Scripts\activate

Linux/macOS:
source env/bin/activate
```

### 3. Perbarui Tools Packaging
```
pip install --upgrade pip setuptools
```
### 4. Instalasi Proyek
Instalasi dalam mode editable beserta dependensi untuk testing:
```
pip install -e ".[testing]"
```

## 🗄️ Inisialisasi dan Migrasi Database
Proyek ini menggunakan Alembic untuk mengelola migrasi skema database.

### 1. Buat Revisi Awal
```
alembic -c development.ini revision --autogenerate -m "init"
```
### 2. Terapkan Migrasi ke Database

```
alembic -c development.ini upgrade head
```

## 📥 Memuat Data Awal
Untuk mengisi data default ke dalam database, jalankan perintah:
```
python -m pyramid_mahasiswa.scripts.initialize_db development.ini
```

## ▶️ Menjalankan Aplikasi
Gunakan perintah berikut untuk menjalankan server pengembangan:
```
pserve development.ini
```
Server akan berjalan dan API siap untuk diuji.

## ✅ Pengujian Endpoint API
Aplikasi ini mendukung pengujian endpoint API untuk memastikan semua fungsionalitas berjalan dengan baik:

<li> GET – Mengambil data

<li> POST – Menambahkan data baru

<li> PUT – Memperbarui data yang sudah ada

<li> DELETE – Menghapus data

Gunakan tools seperti Postman atau curl untuk menguji endpoint.


## 📁 Struktur Proyek (Ringkasan)
```
manajemen_mk/ – Kode sumber utama aplikasi

development.ini – Konfigurasi environment

alembic/ – Direktori migrasi database

tests/ – Modul pengujian
```
## 🧪 Folder Pengujian API

Semua skrip dan hasil pengujian endpoint API dapat ditemukan di:

📁 `./matakuliah/api-test`

Atau buka langsung: [./matakuliah/api_test](./matakuliah/api_test)