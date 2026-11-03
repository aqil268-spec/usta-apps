# AQQA Servis — usta tətbiqi

Yağ dəyişmə və təmir servisi üçün mobil tətbiq (PWA). Usta işləri yazır, admin hesabatı, kassanı, stoku və təchizatçıları idarə edir.

- **Tətbiq (ekran):** bu repo, GitHub Pages ilə açılır.
- **Server və məlumat bazası:** ayrıca, gizli yerdə saxlanılır. Bu repoda server kodu, açar və ya şifrə yoxdur.
- Ekran serverlə yalnız `config.js`-dəki ünvan (`API_URL`) üzərindən danışır. Təhlükəsizlik bu ünvanın gizli olmasına yox, girişə və icazələrə əsaslanır.

## Qovluqlar

| Yer | Nə var |
|---|---|
| `index.html` | Əsas səhifə, stillər, açılış animasiyası |
| `app.js` | Bütün ekranlar və məntiq |
| `i18n.js` | Tərcümələr (AZ, EN, RU) |
| `config.js` | Serverin linki (`API_URL`) |
| `sw.js` | Service worker (offline keş) |
| `manifest.json` | Telefona quraşdırma (PWA) |
| `icons/` | Tətbiqin ikonları |
| `lib/` | PDF üçün kitabxanalar (html2canvas, jsPDF) |
| `templates/products.csv` | Malları toplu yükləmək üçün nümunə |

## Yeniləmə qaydası

### Ekran faylları (GitHub)
1. Dəyişən faylları **bir commit-də** yükləyin. Faylları bir-bir yükləsəniz, GitHub Pages build-ləri bir-birini dayandırır ("cancelled").
2. `sw.js`-də `CACHE` versiyasını artırın (məs. `aqqa-v18` → `aqqa-v19`). Belə olanda telefonlar yeni versiyanı dərhal alır.

### Server
Server kodu bu repoda deyil. Server yenilənəndə ekranda heç nə dəyişmək lazım deyil (ünvan dəyişməsə).

## Malların nümunə faylı

Nümunə: `templates/products.csv`.

- Məcburi: `product_id` (təkrarlanmayan), `marka`, `vahid` (`qab` və ya `litr`), `aktiv` (`1`).
- `nov`: `yag`, `filtr` və ya `diger`.
- `barkod`: istəyə bağlı, təkrarlanmamalıdır. Sütun mətn formatında olmalıdır (öndəki sıfırlar itməsin).
- `deyisme_haqqi`: yağdəyişmə (usta) haqqı, ₼. Mal işə əlavə olunanda çekə yazılır, ustaya çatır. Usta çekdə dəyişə və ya silə bilər.
- Stok `qaliq` sütunundan götürülmür. Stoku tətbiqdə **Alış** ilə daxil edin.

## Təhlükəsizlik

- Şifrələr açıq mətn kimi saxlanmır (HMAC-SHA256 hash). Hash açarı yalnız serverdədir.
- Bu repo açıqdır: buraya heç vaxt server kodu, şifrə, açar, baza ünvanı və ya şəxsi məlumat yazmayın.
