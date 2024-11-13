# HerbHub - Ensiklopedia Tanaman Herbal

HerbHub adalah aplikasi ensiklopedia tanaman herbal yang membantu pengguna mengenal berbagai tanaman herbal beserta manfaatnya. Aplikasi ini memungkinkan pengguna untuk melihat daftar tanaman, menambahkan tanaman baru, mengelola favorit, dan melihat detail dari setiap tanaman.

## Fitur Utama

- **Daftar Tanaman**: Lihat berbagai tanaman herbal yang tersedia di aplikasi.
- **Tambah Tanaman Baru**: Tambahkan tanaman baru dengan detail seperti nama, kategori, deskripsi, dan gambar.
- **Detail Tanaman**: Lihat informasi lengkap tentang tanaman herbal, termasuk manfaat dan deskripsi singkat.
- **Kelola Favorit**: Tandai tanaman favorit dan akses mereka dengan mudah dari bagian favorit.
- **Hapus Tanaman**: Hapus tanaman yang tidak diinginkan dari daftar.
  
## Teknologi yang Digunakan

- **React Native**: Untuk pembuatan antarmuka pengguna aplikasi seluler.
- **Express.js**: Untuk server API dan pengelolaan data tanaman.
- **Axios**: Untuk komunikasi HTTP antara aplikasi dan server.
- **Cloudinary**: Untuk penyimpanan gambar tanaman.

## Struktur Folder

```plaintext
HerbHub/
├── src/
│   ├── components/
│   │   ├── PlantList.js            # Komponen daftar tanaman
│   │   ├── PlantDetail.js          # Komponen detail tanaman
│   │   └── PlantForm.js            # Komponen formulir tambah/edit tanaman
│   └── axiosInstance.js            # Pengaturan axios untuk API
├── App.js                          # Entry point aplikasi
└── README.md                       # Dokumentasi aplikasi
```

## Instalasi

1. **Clone Repository**:
   ```bash
   git clone https://github.com/username/herbhub.git
   cd herbhub
   ```

2. **Instalasi Dependency**:
   Instalasi semua dependency untuk aplikasi dan server.
   ```bash
   npm install          # Instalasi dependency aplikasi
   cd server && npm install   # Instalasi dependency server
   ```

3. **Menjalankan Server**:
   Jalankan server Express.js untuk API tanaman di port 3000.
   ```bash
   node server.js
   ```

4. **Menjalankan Aplikasi**:
   Jalankan aplikasi di emulator atau perangkat fisik.
   ```bash
   npm run android     # Untuk Android
   npm run ios         # Untuk iOS
   ```

## API Endpoints

### Tanaman
- **GET /plants**: Mendapatkan daftar semua tanaman
- **POST /plants**: Menambahkan tanaman baru
- **GET /plants/:id**: Mendapatkan detail tanaman berdasarkan ID
- **PUT /plants/:id**: Memperbarui tanaman berdasarkan ID
- **DELETE /plants/:id**: Menghapus tanaman berdasarkan ID

### Favorit
- **GET /favorites**: Mendapatkan daftar tanaman favorit
- **POST /favorites/:id**: Menambahkan tanaman ke favorit
- **DELETE /favorites/:id**: Menghapus tanaman dari favorit

## Penggunaan

1. **Melihat Tanaman**: Pengguna dapat menelusuri daftar tanaman herbal yang tersedia di halaman utama.
2. **Menambahkan Tanaman Baru**: Klik tombol **Add New Plant** dan isi detail tanaman untuk menambahkannya ke daftar.
3. **Menandai Favorit**: Tandai tanaman yang disukai sebagai favorit untuk akses cepat.
4. **Mengelola Tanaman**: Hapus tanaman yang tidak diinginkan, atau perbarui informasi tanaman melalui fitur edit.

## Screenshot
![Screenshot_2024-11-13-03-00-20-693_com herbhub](https://github.com/user-attachments/assets/608b7a60-4a76-4ab4-914f-f1f99a7d3e54)
![Screenshot_2024-11-13-03-02-34-058_com herbhub](https://github.com/user-attachments/assets/24af02b8-cb8c-49a9-b2cb-ef4e1539945b)
![Screenshot_2024-11-13-03-02-49-295_com herbhub](https://github.com/user-attachments/assets/bed872c1-916b-495e-a426-12ed55b20872)
![Screenshot_2024-11-13-03-03-13-448_com herbhub](https://github.com/user-attachments/assets/d242c757-52b3-4a50-a621-cfd2ddec84be)
![Screenshot_2024-11-13-03-03-40-438_com herbhub](https://github.com/user-attachments/assets/82b01dbf-c676-42a2-940a-04c45ec6ae97)

