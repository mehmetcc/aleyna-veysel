# Aleyna & Veysel - Düğün Web Sitesi & RSVP Sistemi

Bu proje, **Aleyna & Veysel** çiftinin 19 Eylül 2026 tarihindeki düğünleri için özel olarak tasarlanmış, şık ve mobil uyumlu bir tek sayfalık davetiye sitesidir. Misafirler, site üzerinden düğün detaylarına ulaşabilir, haritada konumu görebilir ve katılım durumlarını bildirebilirler. Katılım bildirimleri (RSVP) doğrudan bir Google E-Tablosuna (Google Sheets) kaydedilir.

---

## 🚀 Proje Kurulumu ve Çalıştırma

### 1. Yerel Çalıştırma (Development)
Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edin:

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Geliştirici sunucusunu başlatın:
   ```bash
   npm run dev
   ```
3. Tarayıcınızda `http://localhost:5173` adresini açarak siteyi görüntüleyin.

### 2. Yayına Hazırlama (Build)
Sitenin optimize edilmiş üretim sürümünü oluşturmak için:
```bash
npm run build
```
Bu komut, `dist/` klasöründe tarayıcıda doğrudan çalışabilecek HTML/CSS/JS dosyalarını oluşturur. Sitenizi Netlify, Vercel veya GitHub Pages gibi ücretsiz platformlarda barındırabilirsiniz.

---

## 📊 Google Sheets RSVP Entegrasyonu

Bu web sitesindeki LCV (Katılım Bildirimi) formu, verileri doğrudan Google E-Tablonuza kaydeder. Bunu yapmak için bir Google Apps Script kullanır. Aşağıdaki adımları sırayla uygulayarak entegrasyonu tamamlayın:

### Adım 1: Google E-Tablo Hazırlama
1. [Google Drive](https://drive.google.com/) hesabınızda yeni bir **Google E-Tablo** oluşturun.
2. E-tablonuza dilediğiniz bir isim verin (Örn: `Aleyna & Veysel RSVP Katılımcı Listesi`).
3. Tablonun ilk satırını başlıklar için rezerve edin. Manuel başlık ekleyebilir veya aşağıdaki kodda yer alan otomatik kurulumu kullanabilirsiniz.

### Adım 2: Google Apps Script Bağlantısı
1. E-tablonuzun üst menüsünden **Uzantılar > Apps Script** seçeneğine tıklayın.
2. Açılan editördeki tüm varsayılan kodları silin.
3. Aşağıdaki **Google Apps Script Kod Şablonu**nu kopyalayıp editöre yapıştırın.

#### Google Apps Script Kod Şablonu
```javascript
// POST İsteklerini Karşılar (Form gönderildiğinde çalışır)
function doPost(e) {
  try {
    // Aktif sayfayı al
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Gelen JSON verisini parse et
    var data = JSON.parse(e.postData.contents);
    
    // Eğer tablo boşsa veya başlıklar yoksa otomatik oluştur
    if (sheet.getLastRow() === 0) {
      setupSheet();
    }
    
    // Verileri yeni bir satır olarak ekle
    sheet.appendRow([
      data.tarih,          // A Kolonu: Tarih
      data.ad,             // B Kolonu: Ad
      data.soyad,          // C Kolonu: Soyad
      data.telefon,        // D Kolonu: Telefon Numarası
      data.katilimDurumu,  // E Kolonu: Katılım Durumu
      data.davetliTaraf,   // F Kolonu: Kimin Davetlisi
      data.kisiSayisi,     // G Kolonu: Kişi Sayısı
      data.konaklama,      // H Kolonu: Otel Konaklama (Evet/Hayır)
      data.mesaj           // I Kolonu: Çiftimize Mesaj
    ]);
    
    // CORS engellerini aşmak için JSON formatında başarı yanıtı döndür
    return ContentService.createTextOutput(JSON.stringify({
      "status": "success",
      "message": "RSVP başarıyla kaydedildi."
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Hata durumunda hata mesajını döndür
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error",
      "message": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// GET İsteklerini Karşılar (Test etmek amacıyla tarayıcıdan açılabilir)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    "status": "success",
    "message": "RSVP API Online!"
  })).setMimeType(ContentService.MimeType.JSON);
}

// E-Tablo Başlıklarını Otomatik Yapılandırma Fonksiyonu
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var headers = [
    "Tarih",
    "Ad",
    "Soyad",
    "Telefon Numarası",
    "Katılım Durumu",
    "Kimin Davetlisi",
    "Kişi Sayısı",
    "Otelde Konaklama",
    "Mesaj"
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
}
```

### Adım 3: Scripti Yayınlama (Deployment)
1. Apps Script ekranında sağ üstte bulunan **Dağıt (Deploy) > Yeni dağıtım (New deployment)** butonuna tıklayın.
2. Tür seçimi olarak dişli simgesinden **Web uygulaması (Web app)** seçin.
3. Ayarları şu şekilde yapın:
   - **Açıklama (Description):** `RSVP API v1`
   - **Web uygulamasını şu kişi olarak yürüt (Execute as):** `Ben (E-posta adresiniz)`
   - **Erişimi olanlar (Who has access):** `Herkes (Anyone)`
4. **Dağıt (Deploy)** butonuna basın. (Gerekli izinleri onaylamanız istenecektir, hesabınızı seçip "Gelişmiş > Güvenli değil sayfasına git" diyerek izin verin).
5. Dağıtım tamamlandığında size bir **Web Uygulaması URL'si (Web App URL)** verilecektir. Bu URL'yi kopyalayın.

---

## 🛠️ Çevre Değişkeni (Environment Variable) Tanımlama

Kopyaladığınız Web Uygulaması URL'sini React projesine bağlamak için:

1. Projenin ana dizininde `.env` adında bir dosya oluşturun:
   ```bash
   touch .env
   ```
2. Dosya içerisine kopyaladığınız URL'yi aşağıdaki formatta ekleyin:
   ```env
   VITE_RSVP_SHEET_URL=https://script.google.com/macros/s/BURAYA_APPS_SCRIPT_URL_GELECEK/exec
   ```
3. Değişikliklerin devreye girmesi için eğer yerel sunucunuz çalışıyorsa kapatıp (`Ctrl + C`) `npm run dev` ile yeniden başlatın.

---

## 🎨 Tasarım Detayları

- **Tema:** Botanik ve Minimalist
- **Renkler:** Krem ve fildişi zemin tonları, derin orman yeşili aksanlar (`#2C4A3E`), zarif altın varak çizgiler.
- **Yazı Tipleri:** 
  - *Great Vibes* (İsimler ve İmzalar için İtalyan El Yazısı)
  - *Cormorant Garamond* (Bölüm Başlıkları için Klasik Roman Serif)
  - *Inter* (Okunabilir gövde metinleri için Sans-Serif)
