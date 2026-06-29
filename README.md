# Automated Regression Testing - Sistem Supply Chain B2B

Repositori ini berisi skenario **Automated Regression Testing** menggunakan **Selenium WebDriver** dengan **JavaScript (Node.js)** untuk menguji fungsionalitas utama aplikasi **Supply Chain & Distribusi Bahan Bakar B2B**.

## 📌 Prasyarat (Prerequisites)

Pastikan perangkat Anda telah menginstal:

1. Node.js versi 14 atau lebih baru
2. Google Chrome
3. ChromeDriver (opsional pada Selenium versi terbaru, tetapi disarankan menyesuaikan dengan versi Google Chrome yang digunakan)

## 📁 Struktur Proyek

```
project-folder/
│── regression-test.js
│── package.json
└── README.md
```

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone <link-github-kamu>
```

### 2. Masuk ke Folder Project

```bash
cd <nama-folder-project>
```

### 3. Install Dependencies

```bash
npm install
```

Perintah tersebut akan menginstal library Selenium WebDriver yang diperlukan.

## ▶️ Menjalankan Pengujian

Jalankan seluruh skenario regression test menggunakan salah satu perintah berikut:

```bash
npm test
```

atau

```bash
node regression-test.js
```

## 📝 Catatan Penting

- Pastikan aplikasi utama atau mock server telah berjalan di:

```
http://localhost:8000
```

- Jika menggunakan server atau URL production, ubah nilai variabel `BASE_URL` pada file `regression-test.js`.

- Pastikan elemen HTML pada aplikasi sesuai dengan locator yang digunakan pada script Selenium.

## 📦 Dependencies

Project ini menggunakan dependency berikut:

- selenium-webdriver ^4.19.0

Dependency akan diinstal secara otomatis melalui:

```bash
npm install
```
