# Ay'a İlk Temas 🚀🌙 (AYAP-3)

Türkiye Uzay Ajansı'nın (TUA) Ay Araştırma Programı'nı (AYAP) temel alan, oyunculara hem eğitici bilimsel bilgiler sunan hem de aksiyon dolu görevler yaşatan **interaktif bir uzay simülasyon ve hikaye oyunudur.**

[GitHub Repository - Anka-1623/astrocode](https://github.com/Anka-1623/astrocode)

---

## 📖 Hikaye ve Evren

Oyun, Türkiye'nin Ay'a ulaşma serüveninin büyük finali olan **AYAP-3** (2038) mürettebatlı uçuşunu konu almaktadır. Senaryo, oyuncunun TUA tarafından bu tarihi görev için seçilmesi ile başlar. İşlenen görevlerin tarihsel süreci şu şekildedir:

| 🚀 Görev Adı | 🌕 Görev Tipi | 🎯 Temel Amaç | 📌 Durum |
| :--- | :--- | :--- | :--- |
| **AYAP-1** | Sert İniş | Yerli uzay teknolojilerini test etmek ve veri toplamak. | 🟢 Başarılı |
| **AYAP-2** | Yumuşak İniş | Ay yüzeyinde aktif sistem kurmak ve ileri teknoloji testi. | 🟢 Başarılı |
| **AYAP-3** | Mürettebatlı Uçuş | İnsanlı Ay inişi, yüzey analizi ve uzay aracı modülasyonu. | 🟠 Devam Ediyor |

Oyuncular görevde farklı uzmanlık alanlarına sahip karakterleri seçerek Ay'a iniş sürecini ve Ay yüzeyindeki bilimsel araştırmaları deneyimler:

| 🎭 Rol | 🧑‍🚀 Karakter | 🎯 Ana Sorumluluklar | 🧩 Oyun İçi Deneyimleri |
| :--- | :--- | :--- | :--- |
| **Uzay Mühendisi** | **?** | Uzay aracının teknik altyapısını yönetmek. | Isı/radyasyon kalkanı optimizasyonu, uzay rotası güvenliği sağlama. |
| **Gezegen Bilimcisi** | **?** | Ay'ın jeolojik yapısını incelemek. | Maria, Terrae ve krater analizi, sismik sensör kalibrasyonu, bilimsel numune toplama. |
| **Uzay Yer Kontrol M.** | *(Gizli Karakter)* | Dünya üzerinden kesintisiz iletişimi sağlamak. | Yörüngedeki uydu iletişim noktalarını hizalama ve sistem sorunlarını giderme. |

### 🦠 Astro'ya Merhaba Deyin!
Gemide size yol göstermek ve bilimsel bilgiler vermek için özel geliştirilmiş bir yapay zeka yardımcısı var: **Astro.**
Kendisi bir Tardigrad (Su ayısı) modeli olarak tasarlandı. Oyun boyunca Ay depremleri, manyetize olmuş Ay kayaçları ve Ay tozunun etkileri gibi bilinmeyen gerçekleri oyuncuyla paylaşıyor.

---

## 🛠 Teknik Detaylar ve Mimari

Proje, herhangi bir devasa oyun motoru kullanılmadan tarayıcı üzerinde yüksek performansla çalışabilmesi için **Vanilla Teknolojileri (HTML5, CSS3, JavaScript)** ile geliştirilmiştir. Ek oyun sahneleri ve mekanikler için de **Phaser.js** entegrasyonuna sahiptir.

Aşağıdaki tabloda projenin mimarisini oluşturan temel bileşenler özetlenmiştir:

| ⚙️ Dosya / Modül | 🛠️ Teknoloji | 📋 İşlev ve Sorumluluklar |
| :--- | :--- | :--- |
| `engine.js` | *Vanilla JS* | **Özel Oyun Motoru:** DOM manipülasyonu, sahne geçişleri (fade in/out), daktilo (typewriter) efektleri, html5 algoritmik meteor/yıldız arka plan renderı. |
| `game.js` | *Vanilla JS* | **Durum (State) Yönetimi:** `SCENE_MAP` mimarisi ile oyun akışı, sahneler ve diyaloglar arası mantıksal geçişler (State Machine). |
| `lang.js` | *Vanilla JS* | **Gerçek Zamanlı Çeviri (Localization):** Çift dilli (TR-EN) anlık çeviri, `data-tr-text` yapısıyla arayüz güncellemeleri. (Dış kütüphane gerektirmez) |
| `main.js` | *Phaser.js* | **Fizik Tabanlı Simülasyonlar:** Drag & Drop mekanikli roket/rover montajı, zıplama (platformer) mekanikli maden toplama ve arcade uzay simülasyonları. |
| `style.css` | *CSS3* | **Tasarım Sistemi:** 72KB+ ölçeğinde Glassmorphism, neon animasyonlar, karanlık uzay estetiği ve özel `@keyframes` duyarlı (responsive) animasyonlar. |
| `localStorage` | *HTML5 API* | **Kayıt / Save Sistemi:** Oyuncu ilerlemesini ve kararlarını tarayıcıda tutarak stabil "Oyuna Devam Et" mekanizması sunar. |

---

## 🚀 Çalıştırma ve Kurulum

Projeyi yerel makinenizde çalıştırmak çok basittir:

1. Repoyu klonlayın:
   ```bash
   git clone https://github.com/Anka-1623/astrocode.git
   ```
2. Klasör içerisine girin:
   ```bash
   cd astrocode
   ```
3. Herhangi bir yerel HTTP sunucusu ile başlatın. Örneğin Node.js yüklüyse:
   ```bash
   npx http-server . -p 8080
   ```
4. Tarayıcınızda `http://localhost:8080` adresine giderek Ay'a ilk temasınızı gerçekleştirin!

---
> **"Göklere Hükmeden, Dünyaya Hükmeder."** - *AYAP-3 Ekibi*
