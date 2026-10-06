# AQQA Servis — usta tətbiqi

Yağ dəyişmə və təmir servisi üçün mobil tətbiq (PWA). Usta işləri yazır, admin hesabatı, kassanı, stoku və təchizatçıları idarə edir.

- **Tətbiq (ekran):** bu repo, GitHub Pages ilə açılır.
- **Server:** Google Apps Script (`Code.gs`). Server kodu bu repoda **saxlanmır**, yalnız Apps Script redaktorundadır.
- **Məlumat bazası:** Google Sheets.

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

### Server (Apps Script)
1. Yeni `Code.gs`-in məzmununu Apps Script redaktoruna yapışdırın və Save edin.
2. **Deploy → Manage deployments → Edit → New version → Deploy.**
3. Linki dəyişməyin. Link dəyişsə, `config.js`-də `API_URL`-i yeniləyin.

## Apps Script funksiyaları (əl ilə işə salınır)

| Funksiya | Nə vaxt |
|---|---|
| `setup` | İlk dəfə. Cədvəlləri və admini yaradır |
| `installTriggers` | İlk dəfə. Gecə backup, sessiya təmizliyi, keş |
| `sifirla` | Test bitəndə. İstifadəçilərdən başqa hər şeyi silir (əvvəl backup çıxarır) |
| `backup` | İstənilən vaxt. "AQQA Backup" qovluğuna surət |
| `clearCache` | Cədvəli əl ilə dəyişəndən sonra |

## Malları cədvələ əl ilə yazmaq

`Products` vərəqinə yazın. Nümunə: `templates/products.csv`.

- Məcburi: `product_id` (təkrarlanmayan), `marka`, `vahid` (`qab` və ya `litr`), `aktiv` (`1`).
- `nov`: `yag`, `filtr` və ya `diger`.
- Stok `qaliq` sütunundan götürülmür. Stoku tətbiqdə **Alış** ilə daxil edin.

## Təhlükəsizlik

- Şifrələr cədvəldə HMAC-SHA256 hash kimi saxlanır. Açar (`SALT`) Script Properties-dədir, bu repoda yoxdur.
- Repoya heç vaxt `Code.gs`, şifrə, `SALT` və ya cədvəlin ID-sini yazmayın.
