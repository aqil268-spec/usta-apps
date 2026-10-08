# Şifrə Döyüşü

İki nəfərlik onlayn oyun. Hər oyunçu 4 rəqəmli gizli şifrə seçir. Oyunçular növbə ilə rəqibin şifrəsini təxmin edir. Şifrəni birinci tapan qalib olur.

- **Oyun:** `index.html` (GitHub Pages ilə açılır)
- **Server:** `server/Kod.js` (Google Apps Script)
- **Məlumat bazası:** Google Sheet "Şifrə Döyüşü - Məlumatlar" (`Games`, `Guesses` cədvəlləri)

## Serveri qoşmaq

1. Google Sheet-i açın → **Uzantılar → Apps Script**.
2. `server/Kod.js`-in məzmununu `Code.gs`-ə yapışdırın, Save edin.
3. **Deploy → New deployment → Web app**. Execute as: **Me**. Who has access: **Anyone**.
4. `/exec` ilə bitən linki `config.js`-dəki `API_URL`-ə yazın.

Server kodunu dəyişəndə: **Deploy → Manage deployments → Edit → Version: New version**. Belə olanda link dəyişmir.

## Qaydalar

- 🟢: rəqəm var və yeri düzdür. 🟡: rəqəm var, yeri səhvdir.
- Başlayan oyunçu şifrəni tapsa, rəqib eyni sayda gediş edir. O da tapsa, heç-heçədir.
- Oyun bitəndə "Revanş" ilə yeni raund başlayır. Hesab saxlanır.
