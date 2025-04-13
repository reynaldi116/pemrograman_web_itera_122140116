# 📅 Personal Schedule Dashboard

Aplikasi web interaktif untuk mengelola jadwal kuliah mahasiswa. Aplikasi ini memungkinkan pengguna menambahkan, mengedit, dan menghapus informasi jadwal kuliah dengan antarmuka yang sederhana dan penyimpanan berbasis localStorage agar data tetap tersimpan meskipun browser ditutup.

---

## 🎯 Fitur Utama

- 🔄 **CRUD Jadwal Kuliah**
  - Tambah, edit, dan hapus jadwal kuliah.
  - Tampilkan seluruh jadwal dalam bentuk kartu interaktif.

- 🕒 **Jam dan Tanggal Real-Time**
  - Waktu lokal ditampilkan di bagian atas dan terus diperbarui setiap detik.

- 💾 **Penyimpanan Lokal (localStorage)**
  - Data jadwal tetap tersimpan meskipun halaman direfresh atau browser ditutup.

- 💡 **Antarmuka Interaktif**
  - Modal pop-up untuk tambah/edit.
  - Konfirmasi hapus dengan dialog khusus.
  - Feedback pengguna instan melalui update real-time tampilan.

---

## ✨ Fitur Modern ES6+ yang Digunakan

| Fitur             | Deskripsi                                                                 |
|------------------|---------------------------------------------------------------------------|
| `let` dan `const`| Digunakan secara tepat untuk mendeklarasikan variabel agar lebih aman.    |
| Arrow Function    | Lebih dari 3 fungsi menggunakan arrow syntax (misal `() => { ... }`).     |
| Template Literals | Untuk render HTML dinamis (jadwal, waktu, pesan kosong, dll).            |
| `async/await`     | Simulasi pemrosesan data asinkron saat submit jadwal.                    |
| Class             | `ScheduleManager` dan `UIController` didefinisikan sebagai class ES6.    |
| Modul JS          | Kode dipisahkan modular: `main.js`, `data.js`, `utils.js`.               |

---

## 🖼️ Screenshot Aplikasi

> Berikut adalah tampilan aplikasi saat dijalankan di browser:

### 💻 Tampilan Dashboard Jadwal
![Screenshot Dashboard](./image/Screenshot%202025-04-13%20215121.png)

### ➕ Tambah Jadwal
![Screenshot Modal](./image/Screenshot%202025-04-13%20214922.png)

### ➕ Edit Jadwal
![Screenshot Modal](./image/Screenshot%202025-04-13%20220004.png)

### ➕ Hapus Jadwal
![Screenshot Modal](./image/Screenshot%202025-04-13%20220043.png)

---
