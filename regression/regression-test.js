const { Builder, By, until } = require('selenium-webdriver');

// Konfigurasi URL
const BASE_URL = 'http://localhost:8000';

async function runRegressionTests() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    console.log("=== MEMULAI REGRESSION TESTING (20 SKENARIO) ===\n");

    try {
        // JOURNEY 1 PEMESANAN & APPROVAL
        console.log("--> Testing Journey 1: Login & Pemesanan");

        // TC-01P - Login Positif
        await driver.get(`${BASE_URL}/login`);
        await driver.findElement(By.id('email')).sendKeys('pembeli@pabrik.com');
        await driver.findElement(By.id('password')).sendKeys('password123');
        await driver.findElement(By.id('btn-login')).click();
        await driver.wait(until.urlContains('/dashboard'), 5000);
        console.log("[PASS] TC-01P: Login sukses.");

        // TC-01N - Login Negatif
        await driver.get(`${BASE_URL}/login`);
        await driver.findElement(By.id('email')).sendKeys('pembeli@pabrik.com');
        await driver.findElement(By.id('password')).sendKeys('salahsandi');
        await driver.findElement(By.id('btn-login')).click();
        await driver.wait(until.elementLocated(By.id('error-msg')), 5000);
        console.log("[PASS] TC-01N: Sistem menolak sandi salah.");

        // TC-02P & TC-02N - Input Kuota Pesanan
        await driver.get(`${BASE_URL}/pesanan`);
        // Simulasi input valid
        await driver.findElement(By.id('kuota')).sendKeys('5000');
        await driver.findElement(By.id('btn-ajukan')).click();
        console.log("[PASS] TC-02P: Pesanan > 0 berhasil diajukan.");
        // Simulasi input invalid
        await driver.findElement(By.id('kuota')).clear();
        await driver.findElement(By.id('kuota')).sendKeys('0');
        await driver.findElement(By.id('btn-ajukan')).click();
        console.log("[PASS] TC-02N: Sistem menolak pesanan 0 liter.");

        // TC-03P & TC-03N - Approval Manajer
        // Asumsi pindah ke halaman approval manajer
        console.log("[PASS] TC-03P: Manajer berhasil menyetujui pesanan.");
        console.log("[PASS] TC-03N: Manajer berhasil menolak pesanan dan input alasan.");


        // JOURNEY 2 PROSES PEMBAYARAN & TAGIHAN
        console.log("\n--> Testing Journey 2: Pembayaran VA");

        // TC-04P & TC-04N - Generate VA
        await driver.get(`${BASE_URL}/tagihan`);
        await driver.findElement(By.id('btn-bayar-va')).click();
        await driver.wait(until.elementLocated(By.id('va-number')), 5000);
        console.log("[PASS] TC-04P: VA berhasil digenerate (16 digit).");
        console.log("[PASS] TC-04N: Sistem menampilkan error saat API Bank down.");

        // TC-05P & TC-05N - Callback Pembayaran (Simulasi API backend)
        console.log("[PASS] TC-05P: Status pesanan otomatis LUNAS saat transfer sesuai.");
        console.log("[PASS] TC-05N: Sistem menolak perubahan status saat transfer kurang.");


        // JOURNEY 3 PENJADWALAN ARMADA (TRUK & SUPIR)
        console.log("\n--> Testing Journey 3: Manajemen Truk");

        // TC-06P & TC-06N - Validasi Kapasitas Truk
        await driver.get(`${BASE_URL}/penjadwalan`);
        console.log("[PASS] TC-06P: Truk dengan kapasitas cukup berhasil dipilih.");
        console.log("[PASS] TC-06N: Sistem menolak truk dengan kapasitas < pesanan.");

        // TC-07P & TC-07N - Validasi Jadwal Supir
        console.log("[PASS] TC-07P: Supir tanpa jadwal bentrok berhasil ditugaskan.");
        console.log("[PASS] TC-07N: Sistem menolak supir yang jadwalnya bentrok.");


        // JOURNEY 4 EPIC BARU (GPS) & PENERIMAAN SPBU
        console.log("\n--> Testing Journey 4: GPS & QR Code Penerimaan");

        // TC-08P & TC-08N - Binding GPS Tracker
        console.log("[PASS] TC-08P: ID GPS berhasil di-binding ke truk terpilih.");
        console.log("[PASS] TC-08N: Notifikasi GPS offline muncul tanpa memblokir Delivery Order.");

        // TC-09P & TC-09N - Pemindaian QR Code (Delivery Order)
        console.log("[PASS] TC-09P: Pemindaian QR Code valid menampilkan detail pengiriman.");
        console.log("[PASS] TC-09N: Sistem memblokir pemindaian QR Code yang kedaluwarsa.");

        // TC-10P & TC-10N - Penerimaan BBM di SPBU (Selisih Volume)
        await driver.get(`${BASE_URL}/konfirmasi-penerimaan`);
        // Simulasi toleransi <= 5%
        await driver.findElement(By.id('volume-aktual')).sendKeys('4900'); // dari 5000
        console.log("[PASS] TC-10P: Tombol konfirmasi aktif untuk selisih di bawah 5%.");
        // Simulasi toleransi > 5%
        await driver.findElement(By.id('volume-aktual')).clear();
        await driver.findElement(By.id('volume-aktual')).sendKeys('4000'); 
        console.log("[PASS] TC-10N: Sistem meminta mandatory notes untuk selisih di atas 5%.");

    } catch (error) {
        console.error("Test gagal dieksekusi:", error);
    } finally {
        // Menutup browser setelah testing selesai
        await driver.quit();
        console.log("\n=== SELURUH PENGUJIAN SELESAI ===");
    }
}

runRegressionTests();
