'use strict';
// =============================================================================
// Dil seçimi: AZ (əsas), EN, RU.
// Ekran Azərbaycan dilində qurulur, sonra mətnlər bu lüğətlə tərcümə olunur.
// Qəbz, çek və müştəriyə gedən mesajlar həmişə Azərbaycan dilində qalır.
// Lüğət: 'Azərbaycan mətni': ['English', 'Русский']
// =============================================================================
const I18N_DICT = {
  // --- Ümumi
  'Əsas': ['Home', 'Главная'], 'Maşınlar': ['Cars', 'Машины'], 'Kassa': ['Cash desk', 'Касса'], 'Mən': ['Me', 'Я'],
  'Hesabat': ['Report', 'Отчёт'], 'Mallar': ['Goods', 'Товары'], 'Daha': ['More', 'Ещё'], 'Menyu': ['Menu', 'Меню'],
  'Geri': ['Back', 'Назад'], 'Yeni': ['New', 'Новый'], 'Yadda saxla': ['Save', 'Сохранить'], 'Yadda saxlanıldı': ['Saved', 'Сохранено'],
  'Düzəlt': ['Edit', 'Изменить'], 'Dəyiş': ['Change', 'Изменить'], 'Sil': ['Delete', 'Удалить'], 'Axtar': ['Search', 'Поиск'],
  'Hamısı': ['All', 'Все'], 'Hazırdır': ['Done', 'Готово'], 'Əlavə et': ['Add', 'Добавить'], 'Əlavə olundu': ['Added', 'Добавлено'],
  'Xəta': ['Error', 'Ошибка'], 'Yenidən cəhd et': ['Try again', 'Повторить'], 'Ödə': ['Pay', 'Выдать'], 'Qəbul et': ['Accept', 'Принять'],
  'Tarix': ['Date', 'Дата'], 'Tarixçə': ['History', 'История'], 'Telefon': ['Phone', 'Телефон'], 'Ad': ['Name', 'Имя'],
  'Ad, soyad': ['Full name', 'Имя, фамилия'], 'Ünvan': ['Address', 'Адрес'], 'Qeyd': ['Note', 'Примечание'], 'istəyə bağlı': ['optional', 'необязательно'],
  'Başlanğıc': ['From', 'С'], 'Son': ['To', 'По'], 'Dövr': ['Period', 'Период'], 'Bu gün': ['Today', 'Сегодня'], 'Bu həftə': ['This week', 'Эта неделя'], 'Bu ay': ['This month', 'Этот месяц'],
  'Cəmi': ['Total', 'Итого'], 'CƏMİ': ['TOTAL', 'ИТОГО'], 'Məbləğ': ['Amount', 'Сумма'], 'Qiymət': ['Price', 'Цена'], 'Miqdar': ['Quantity', 'Количество'],
  'Nağd': ['Cash', 'Наличные'], 'Kart': ['Card', 'Карта'], 'Bank': ['Bank', 'Банк'], 'Borc': ['Debt', 'Долг'], 'borc': ['debt', 'долг'],
  'Ödəniş': ['Payment', 'Оплата'], 'Ödənişlər': ['Payments', 'Платежи'], 'Ödənib': ['Paid', 'Оплачено'], 'Ödənilib': ['Paid', 'Оплачено'],
  'Usta': ['Mechanic', 'Мастер'], 'Ustalar': ['Mechanics', 'Мастера'], 'Admin': ['Admin', 'Админ'], 'Müştəri': ['Customer', 'Клиент'],
  'Maşın': ['Car', 'Машина'], 'Mal': ['Item', 'Товар'], 'Təmir': ['Repair', 'Ремонт'], 'Yağ': ['Oil', 'Масло'], 'Km': ['Km', 'Км'],
  'Marka': ['Make', 'Марка'], 'Model': ['Model', 'Модель'], 'Özlülük': ['Viscosity', 'Вязкость'], 'Tara': ['Package', 'Тара'], 'Növ': ['Type', 'Тип'],
  'Usta haqqı': ['Mechanic fee', 'Оплата мастера'], 'Usta h.': ['Fee', 'Опл. маст.'], 'Gəlir': ['Income', 'Доход'], 'Xərc': ['Expense', 'Расход'],
  'Xərclər': ['Expenses', 'Расходы'], 'Təhvil': ['Handover', 'Сдача'], 'Düzəliş': ['Correction', 'Корректировка'], 'Faktiki': ['Actual', 'Факт'],
  'Fərq': ['Difference', 'Разница'], 'Açılış': ['Opening', 'Открытие'], 'Olmalı': ['Expected', 'Должно быть'], 'Nağd +': ['Cash +', 'Нал. +'],
  'Çıxış': ['Log out', 'Выйти'], 'Stok': ['Stock', 'Склад'], 'Maya': ['Cost', 'Себестоимость'], 'Satış': ['Sales', 'Продажи'], 'Satılıb': ['Sold', 'Продано'],
  'Mənfəət': ['Profit', 'Прибыль'], 'Qazanc': ['Earnings', 'Заработок'], 'İş': ['Job', 'Работа'], 'iş': ['jobs', 'работ'], 'maşın': ['cars', 'машин'],
  'Rol': ['Role', 'Роль'], 'Aktiv': ['Active', 'Активен'], 'açıq': ['open', 'открыт'], 'Digər': ['Other', 'Другое'], 'Kateqoriya': ['Category', 'Категория'],
  'Servis adı': ['Service name', 'Название сервиса'], 'Təchizatçı': ['Supplier', 'Поставщик'], 'Təchizatçılar': ['Suppliers', 'Поставщики'],
  'Ədəd': ['Piece', 'Штука'], 'Boçka': ['Barrel', 'Бочка'], 'Qab / ədəd': ['Can / piece', 'Банка / шт.'], 'Litr (boçka)': ['Litre (barrel)', 'Литр (бочка)'],
  'Bazar': ['Sunday', 'Воскресенье'], 'Bazar ertəsi': ['Monday', 'Понедельник'], 'Çərşənbə axşamı': ['Tuesday', 'Вторник'], 'Çərşənbə': ['Wednesday', 'Среда'],
  'Cümə axşamı': ['Thursday', 'Четверг'], 'Cümə': ['Friday', 'Пятница'], 'Şənbə': ['Saturday', 'Суббота'],

  // --- Giriş və şifrə
  'Xoş gəlmisiniz, daxil olun': ['Welcome, please sign in', 'Добро пожаловать, войдите'], 'Daxil ol': ['Sign in', 'Войти'],
  'Şifrə': ['Password', 'Пароль'], 'Şifrəni göstər': ['Show password', 'Показать пароль'], 'Şifrəni dəyiş': ['Change password', 'Сменить пароль'],
  'Yeni şifrə təyin edin': ['Set a new password', 'Задайте новый пароль'], 'Şifrədə bunlar olmalıdır:': ['The password must have:', 'Пароль должен содержать:'],
  'ən az 8 simvol': ['at least 8 characters', 'не менее 8 символов'], '1 böyük hərf (A–Z)': ['1 capital letter (A–Z)', '1 заглавную букву (A–Z)'],
  '1 kiçik hərf (a–z)': ['1 small letter (a–z)', '1 строчную букву (a–z)'], '1 rəqəm (0–9)': ['1 digit (0–9)', '1 цифру (0–9)'],
  '1 işarə (məs. ! @ # - _)': ['1 symbol (e.g. ! @ # - _)', '1 символ (напр. ! @ # - _)'], 'iki şifrə eynidir': ['both passwords match', 'пароли совпадают'],
  'Nümunə:': ['Example:', 'Пример:'], '(bu nümunəni işlətməyin, özünüzünkünü yazın)': ['(do not use this example, write your own)', '(не используйте этот пример, придумайте свой)'],
  'Hazırkı şifrə': ['Current password', 'Текущий пароль'], 'Yeni şifrə': ['New password', 'Новый пароль'], 'Yeni şifrə təkrar': ['Repeat new password', 'Повторите новый пароль'],
  'Yeni şifrələr eyni deyil': ['The new passwords do not match', 'Новые пароли не совпадают'], 'Şifrə dəyişdirildi': ['Password changed', 'Пароль изменён'],
  'Şifrə qaydaya uyğun deyil. Yuxarıdakı siyahıya baxın.': ['The password does not follow the rules. See the list above.', 'Пароль не соответствует правилам. См. список выше.'],
  'Müvəqqəti şifrə': ['Temporary password', 'Временный пароль'], 'Müvəqqəti şifrə ver': ['Give temporary password', 'Выдать временный пароль'],
  'üçün müvəqqəti şifrə:': ['— temporary password:', '— временный пароль:'],
  'Bu şifrə yalnız indi görünür. Böyük və kiçik hərflərə diqqət edin. İstifadəçiyə verin — ilk girişdə öz şifrəsini təyin edəcək.': ['This password is shown only now. Mind capital and small letters. Give it to the user — they will set their own password at first sign-in.', 'Этот пароль виден только сейчас. Учитывайте заглавные и строчные буквы. Передайте пользователю — при первом входе он задаст свой пароль.'],
  'Müvəqqəti şifrə verilsin? Köhnə şifrə işləməyəcək və bütün girişlər bağlanacaq.': ['Give a temporary password? The old password will stop working and all sessions will close.', 'Выдать временный пароль? Старый пароль перестанет работать, все сеансы закроются.'],
  'Yadda saxladıqdan sonra müvəqqəti şifrə ekranda göstəriləcək.': ['After saving, the temporary password will be shown on screen.', 'После сохранения временный пароль появится на экране.'],
  'Çıxış edilsin? Növbəti dəfə şifrə soruşulacaq.': ['Log out? The password will be asked next time.', 'Выйти? В следующий раз потребуется пароль.'],

  // --- Usta: əsas ekran
  'Bugünkü iş': ["Today's work", 'Работа за сегодня'], 'Mənim qazancım': ['My earnings', 'Мой заработок'], 'Ödənilməyən': ['Unpaid', 'Не оплачено'],
  'Ödənilməyən işlər': ['Unpaid jobs', 'Неоплаченные работы'], 'Yeni iş': ['New job', 'Новая работа'], 'Nömrə, marka və ya müştəri': ['Plate, make or customer', 'Номер, марка или клиент'],
  'Maşın axtar': ['Search car', 'Поиск машины'], 'Son maşınlar': ['Recent cars', 'Последние машины'], 'Günü bağla': ['Close the day', 'Закрыть день'],
  'Sorğu göndərildi': ['Request sent', 'Запрос отправлен'], 'Hələ iş yoxdur. "Yeni iş" ilə başlayın.': ['No jobs yet. Start with "New job".', 'Работ пока нет. Начните с «Новая работа».'],
  'Günün sonudur? Admin-ə kassanı bağlamaq üçün sorğu göndərilsin?': ['End of the day? Send the Admin a request to close the cash desk?', 'Конец дня? Отправить Админу запрос на закрытие кассы?'],
  'Sorğu Admin-ə göndərildi': ['Request sent to Admin', 'Запрос отправлен Админу'],
  'Admin kassanı bağlayana qədər yeni iş yazmaq olmur.': ['New jobs are blocked until the Admin closes the cash desk.', 'Новые работы недоступны, пока Админ не закроет кассу.'],
  'Admin bağlayana qədər yeni iş yazmaq olmur.': ['New jobs are blocked until the Admin closes it.', 'Новые работы недоступны, пока Админ не закроет.'],
  'Kassa bağlanmayıb:': ['Cash desk not closed:', 'Касса не закрыта:'],

  // --- Maşınlar
  'Maşın seçin': ['Choose a car', 'Выберите машину'], 'Yeni maşın': ['New car', 'Новая машина'], 'Maşını düzəlt': ['Edit car', 'Изменить машину'],
  'Dövlət nömrəsi': ['Plate number', 'Госномер'], 'Fərqli nömrə (xarici, köhnə format)': ['Other plate (foreign, old format)', 'Другой номер (иностранный, старый)'],
  'Buraxılış ili': ['Year', 'Год выпуска'], 'Müştəri adı': ['Customer name', 'Имя клиента'], 'Müştəri telefonu (WhatsApp üçün)': ['Customer phone (for WhatsApp)', 'Телефон клиента (для WhatsApp)'],
  'Siyahıda olmayan marka və ya model yazsanız, bazaya əlavə olunur.': ['A make or model not in the list is added to the database.', 'Марка или модель не из списка будет добавлена в базу.'],
  'Son km': ['Last km', 'Последний пробег'], 'Növbəti yağ dəyişməsi': ['Next oil change', 'Следующая замена масла'],
  'Müştəriyə xatırlatma göndər': ['Send reminder to customer', 'Отправить напоминание клиенту'], 'Bu maşına yeni iş': ['New job for this car', 'Новая работа для этой машины'],
  'Bu maşına hələ iş qeyd olunmayıb.': ['No jobs recorded for this car yet.', 'Для этой машины работ ещё нет.'],
  'Maşına basın və müştəriyə xatırlatma göndərin.': ['Tap the car and send the customer a reminder.', 'Нажмите на машину и отправьте клиенту напоминание.'],
  'maşının yağ dəyişmə vaxtı çatıb': ['car(s) due for oil change', 'машин(ы) пора менять масло'],
  'Tapılmadı. "Yeni" ilə əlavə edin.': ['Not found. Add it with "New".', 'Не найдено. Добавьте через «Новый».'],
  'Xidmət tarixçəsi': ['Service history', 'История обслуживания'], 'Son xidmətlər': ['Recent services', 'Последние услуги'],

  // --- Yeni iş
  'Hazırkı km': ['Current km', 'Текущий пробег'], 'Yağ və mallar': ['Oil and goods', 'Масло и товары'], 'Mal axtar': ['Search goods', 'Поиск товара'],
  'Marka, model, özlülük...': ['Make, model, viscosity...', 'Марка, модель, вязкость...'], 'Say': ['Qty', 'Кол-во'], 'Litr': ['Litres', 'Литры'],
  'Tövsiyə': ['Recommended', 'Рекомендуемая'], '· minimum': ['· minimum', '· минимум'], 'minimumdan aşağı satmaq olmaz': ['selling below minimum is not allowed', 'нельзя продавать ниже минимума'],
  'Malı siyahıdan seçin': ['Choose the item from the list', 'Выберите товар из списка'], 'Təmir işləri': ['Repairs', 'Ремонтные работы'],
  'Təmir işi əlavə et': ['Add repair', 'Добавить ремонт'], 'Təmir işinin adını yazın': ['Write the repair name', 'Укажите название ремонта'], 'İşin adı': ['Job name', 'Название работы'],
  'Yağ dəyişmə üçün Admin-in təyin etdiyi məbləğ.': ['Amount set by the Admin for an oil change.', 'Сумма, заданная Админом за замену масла.'],
  'İşdə yağ yoxdur — usta haqqı yazılmır.': ['No oil in this job — no mechanic fee.', 'В работе нет масла — оплата мастера не начисляется.'],
  'Hamısı nağd': ['All cash', 'Всё наличными'], 'Hamısı kart': ['All card', 'Всё картой'],
  'Neçə aydan sonra': ['After how many months', 'Через сколько месяцев'], 'Admin-ə alış sorğusu göndər': ['Send purchase request to Admin', 'Отправить Админу запрос на закупку'],
  'Alış sorğusu Admin-ə göndərildi': ['Purchase request sent to Admin', 'Запрос на закупку отправлен Админу'],
  'Bu mal üçün sorğu artıq göndərilib': ['A request for this item was already sent', 'Запрос по этому товару уже отправлен'],
  'Alış sorğusu göndərilib, Admin-in cavabı gözlənilir.': ['Purchase request sent, waiting for the Admin.', 'Запрос на закупку отправлен, ожидается ответ Админа.'],
  'Bu malın alışı rədd edildi.': ['Purchase of this item was rejected.', 'Закупка этого товара отклонена.'], 'Yenidən sorğu göndər': ['Send request again', 'Отправить запрос снова'],
  'İş yadda saxlanmayıb. Çıxaq?': ['The job is not saved. Leave?', 'Работа не сохранена. Выйти?'], 'Km yazın': ['Enter km', 'Укажите пробег'],
  'məs. 142350': ['e.g. 142350', 'напр. 142350'], 'məs. 15': ['e.g. 15', 'напр. 15'],
  'ödənilmir və borc kimi qalacaq. Davam edək?': ['is not paid and will remain as debt. Continue?', 'не оплачено и останется долгом. Продолжить?'],

  // --- Qəbz
  'Ödənilməyib:': ['Unpaid:', 'Не оплачено:'], 'Ödənişi qəbul et': ['Accept payment', 'Принять оплату'], 'Qalan borc': ['Remaining debt', 'Остаток долга'],
  'Pul bu günün kassasına düşür.': ["The money goes to today's cash desk.", 'Деньги поступают в сегодняшнюю кассу.'], 'Ödəniş qəbul edildi': ['Payment accepted', 'Оплата принята'],
  'Ödənildi — qəbzə möhür vur': ['Paid — stamp the receipt', 'Оплачено — поставить печать'], 'Qəbzi PDF kimi göndər': ['Send receipt as PDF', 'Отправить чек в PDF'],
  'WhatsApp-a mətn kimi göndər': ['Send as text to WhatsApp', 'Отправить текстом в WhatsApp'], 'İşi ləğv et': ['Cancel job', 'Отменить работу'],
  'İşi ləğv etmək səbəbi:': ['Reason for cancelling:', 'Причина отмены:'], 'İş ləğv edildi': ['Job cancelled', 'Работа отменена'], 'Əsasa qayıt': ['Back to home', 'На главную'],
  'PDF yükləndi. WhatsApp-da fayl kimi əlavə edin.': ['PDF downloaded. Attach it as a file in WhatsApp.', 'PDF загружен. Прикрепите его файлом в WhatsApp.'],
  'Paylaşmaq alınmadı, yenidən basın': ['Sharing failed, tap again', 'Не удалось поделиться, нажмите ещё раз'], 'PDF hazırlanmadı': ['PDF was not created', 'PDF не создан'],

  // --- Mən
  'Qazancım (usta haqqı + təmir)': ['My earnings (fee + repairs)', 'Мой заработок (оплата + ремонт)'], 'İş sayı': ['Jobs', 'Работ'],
  'Nağd hissə': ['Cash part', 'Наличная часть'], 'Kart hissə': ['Card part', 'Карточная часть'], 'Gözləyən usta haqqı': ['Pending fee', 'Ожидаемая оплата'],
  'Gözləyən usta haqqı müştəri borcu ödəyəndə hesablanır.': ['The pending fee is counted when the customer pays the debt.', 'Ожидаемая оплата начисляется, когда клиент погасит долг.'],
  'Müştəri borcları': ['Customer debts', 'Долги клиентов'], 'Cəmi borc': ['Total debt', 'Общий долг'], 'Borc yoxdur.': ['No debt.', 'Долгов нет.'],
  'Alış sorğularım': ['My purchase requests', 'Мои запросы на закупку'], 'Gözləyir': ['Waiting', 'Ожидает'], 'Alındı': ['Bought', 'Закуплено'], 'Rədd edildi': ['Rejected', 'Отклонено'],
  'Səbəb:': ['Reason:', 'Причина:'],

  // --- Kassa
  'Kassada olmalı nağd': ['Cash expected in the desk', 'Наличных должно быть в кассе'], 'Açılış qalığı': ['Opening balance', 'Остаток на начало'],
  'Nağd daxilolma': ['Cash in', 'Поступление наличных'], 'Kart (bankda)': ['Card (in bank)', 'Карта (в банке)'], 'Ustalara ödənib': ['Paid to mechanics', 'Выплачено мастерам'],
  'Təchizatçılara': ['To suppliers', 'Поставщикам'], 'Ustaların payı': ["Mechanics' share", 'Доля мастеров'], 'Nağd qalır': ['Cash due', 'Нал. к выдаче'],
  'Təmir pulu dərhal, usta haqqı müştəri ödədikcə çatır. Kart hissəsi nağd verilmir.': ['Repair money is due at once; the fee is due as the customer pays. The card part is not paid in cash.', 'Деньги за ремонт — сразу, оплата мастера — по мере оплаты клиентом. Карточная часть наличными не выдаётся.'],
  'Kassa tarixçəsi': ['Cash desk history', 'История кассы'], 'Kassanı bağla': ['Close cash desk', 'Закрыть кассу'], 'Gün bağlandı': ['Day closed', 'День закрыт'],
  'Kassanı fiziki sayın, xərcləri yazın, sonra faktiki nağd məbləği yazın. Bu məbləğ növbəti günün açılış qalığı olacaq.': ["Count the cash, enter expenses, then enter the actual cash amount. It becomes the next day's opening balance.", 'Пересчитайте кассу, внесите расходы, затем фактическую сумму наличных. Она станет остатком на начало следующего дня.'],
  'Faktiki nağd məbləğ (₼):': ['Actual cash amount (₼):', 'Фактическая сумма наличных (₼):'], 'Hərəkətlər': ['Movements', 'Движения'],
  'Xərc və ya təhvil': ['Expense or handover', 'Расход или сдача'], 'Ustaya ödəniş': ['Payment to mechanic', 'Выплата мастеру'],
  'ustaya ödənən nağd məbləğ (₼):': ['cash paid to the mechanic (₼):', 'наличные, выплаченные мастеру (₼):'],
  'Bu dövrdə hərəkət yoxdur.': ['No movements in this period.', 'Нет движений за период.'], 'Bağlanmamış gün': ['Unclosed day', 'Незакрытый день'], 'Bağlanmamış gün:': ['Unclosed day:', 'Незакрытый день:'],
  'Bu günü bağlayana qədər ustalar yeni iş yaza bilmir.': ['Mechanics cannot add jobs until you close this day.', 'Мастера не могут добавлять работы, пока день не закрыт.'],
  'Ustalar yeni iş yaza bilmir. Kassanı bağlayın.': ['Mechanics cannot add jobs. Close the cash desk.', 'Мастера не могут добавлять работы. Закройте кассу.'],
  'Kassa bağlama sorğusu': ['Cash desk close request', 'Запрос на закрытие кассы'], 'Kassa bağlama sorğuları': ['Cash desk close requests', 'Запросы на закрытие кассы'],
  'Kassaya keç': ['Go to cash desk', 'Перейти в кассу'], 'Faktiki məbləğə toxunaraq düzəliş edin. Sonrakı günlər yenidən hesablanır.': ['Tap the actual amount to correct it. Later days are recalculated.', 'Нажмите на фактическую сумму, чтобы исправить. Следующие дни пересчитаются.'],
  'Düzəlişin səbəbi:': ['Reason for correction:', 'Причина исправления:'], 'Düzəldildi': ['Corrected', 'Исправлено'], 'Yeni məbləğ (₼):': ['New amount (₼):', 'Новая сумма (₼):'],
  'Düzəldildi, sonrakı günlər yenidən hesablandı': ['Corrected, later days recalculated', 'Исправлено, следующие дни пересчитаны'], 'kassadan nağd': ['in cash from the desk', 'наличными из кассы'], 'bank ilə': ['by bank', 'через банк'],
  'ödənilsin?': ['be paid?', 'оплатить?'], 'Nağd (kassadan)': ['Cash (from desk)', 'Наличные (из кассы)'], 'Bank köçürməsi': ['Bank transfer', 'Банковский перевод'],

  // --- Admin: hesabat, gəlir, stok
  'Ümumi dövriyyə': ['Total turnover', 'Общий оборот'], 'Ən çox satılan': ['Best sellers', 'Самые продаваемые'], 'Bu dövrdə iş yoxdur.': ['No jobs in this period.', 'Нет работ за период.'],
  'Bu gün iş yoxdur.': ['No jobs today.', 'Сегодня работ нет.'], 'Son satışlar': ['Recent sales', 'Последние продажи'],
  'Gəlir və xərc': ['Income and expenses', 'Доходы и расходы'], 'Gəlir-xərc hesabatı': ['Income-expense report', 'Отчёт о доходах и расходах'],
  'Cəmi gəlir': ['Total income', 'Итого доход'], 'Cəmi xərc': ['Total expenses', 'Итого расход'], 'Mal satışı': ['Goods sales', 'Продажа товаров'],
  'Mal mənfəəti': ['Goods profit', 'Прибыль с товаров'], 'Usta xidməti': ['Mechanic service', 'Услуга мастера'],
  'Stok hesabatı': ['Stock report', 'Отчёт по складу'], 'Stok mayası': ['Stock cost', 'Себестоимость склада'], 'Satış dəyəri': ['Sales value', 'Стоимость продаж'],
  'Qalıq, maya, satış dəyəri': ['Balance, cost, sales value', 'Остаток, себестоимость, продажи'], 'Mallar üzrə': ['By goods', 'По товарам'],
  'Satılan (dövr)': ['Sold (period)', 'Продано (период)'], 'Gələn (dövr)': ['Received (period)', 'Поступило (период)'],
  'Satılıb (alış qiyməti ilə)': ['Sold (at purchase price)', 'Продано (по закупочной цене)'], 'Satılıb (alış qiyməti)': ['Sold (purchase price)', 'Продано (закуп. цена)'],
  'Maya (FIFO)': ['Cost (FIFO)', 'Себестоимость (FIFO)'], 'Az qalan': ['Low stock', 'Заканчивается'], 'Mal yoxdur.': ['No goods.', 'Товаров нет.'],
  'Usta borcları': ['Mechanic debts', 'Долги мастеров'], 'Ustaların ödənilməyən borcları': ["Mechanics' unpaid debts", 'Неоплаченные долги мастеров'],
  'Ödənilməyən borc yoxdur.': ['No unpaid debt.', 'Неоплаченных долгов нет.'],

  // --- Admin: mallar, alış, təchizatçı
  'Yeni mal': ['New item', 'Новый товар'], 'Malı düzəlt': ['Edit item', 'Изменить товар'], 'Satış vahidi': ['Sales unit', 'Единица продажи'],
  'Tövsiyə qiyməti (₼)': ['Recommended price (₼)', 'Рекомендуемая цена (₼)'], 'Minimum qiymət (₼)': ['Minimum price (₼)', 'Минимальная цена (₼)'],
  'Az qalma həddi': ['Low stock limit', 'Порог остатка'], 'Aktiv (ustalar görür)': ['Active (mechanics see it)', 'Активен (видят мастера)'],
  'Siyahıda olmayan marka, model və ya özlülük yazsanız, bazaya əlavə olunur.': ['A make, model or viscosity not in the list is added to the database.', 'Марка, модель или вязкость не из списка будет добавлена в базу.'],
  'Alış qeyd et': ['Record purchase', 'Записать закупку'], 'Bu mal üçün alış qeyd et': ['Record purchase for this item', 'Записать закупку этого товара'],
  'Alış qeyd olundu': ['Purchase recorded', 'Закупка записана'], 'Son alışlar': ['Recent purchases', 'Последние закупки'], 'Alış yoxdur.': ['No purchases.', 'Закупок нет.'],
  'Ustanın sorğusu üzrə alış': ["Purchase on a mechanic's request", 'Закупка по запросу мастера'], 'Alınıb': ['Bought', 'Закуплено'],
  'Yeni təchizatçı adı yazsanız, təchizatçı avtomatik yaranır.': ['A new supplier name creates the supplier automatically.', 'Новое имя поставщика создаст поставщика автоматически.'],
  'Yeni təchizatçı': ['New supplier', 'Новый поставщик'], 'Təchizatçını düzəlt': ['Edit supplier', 'Изменить поставщика'],
  'Təchizatçı yoxdur. Alış qeyd edəndə avtomatik yaranır.': ['No suppliers. They are created when you record a purchase.', 'Поставщиков нет. Они создаются при записи закупки.'],
  'Bu təchizatçıdan alış yoxdur.': ['No purchases from this supplier.', 'Закупок у этого поставщика нет.'], 'Təchizatçıya ödəniş': ['Payment to supplier', 'Оплата поставщику'],
  'Ödəniş növü': ['Payment type', 'Способ оплаты'], 'Ödə və çek yarat': ['Pay and create cheque', 'Оплатить и создать чек'], 'Ödəniş qeyd olundu': ['Payment recorded', 'Оплата записана'],
  'Çeki PDF kimi göndər': ['Send cheque as PDF', 'Отправить чек в PDF'], 'Ödəniş yoxdur.': ['No payments.', 'Платежей нет.'], 'Borc, ödəniş, çek': ['Debt, payment, cheque', 'Долг, оплата, чек'],
  'Nağd ödəniş kassadan azalır. Bank köçürməsi kassaya təsir etmir. Borcdan çox ödəniş avans kimi qalır.': ['A cash payment reduces the cash desk. A bank transfer does not. Overpayment stays as an advance.', 'Оплата наличными уменьшает кассу. Банковский перевод — нет. Переплата остаётся авансом.'],
  'Təchizatçıya ödəniş xərc sayılmır: malın xərci "satılan malın mayası" sətrindədir.': ['A supplier payment is not an expense: the goods cost is in the "cost of goods sold" line.', 'Оплата поставщику не расход: стоимость товара — в строке «себестоимость проданного».'],
  'Borcum': ['I owe', 'Мой долг'], 'Avans': ['Advance', 'Аванс'], 'Ümumi borcum': ['Total owed', 'Общий долг'],

  // --- Admin: sorğular, istifadəçilər, parametrlər
  'Sorğular': ['Requests', 'Запросы'], 'Alış sorğuları': ['Purchase requests', 'Запросы на закупку'], 'Sorğulara bax': ['View requests', 'Посмотреть запросы'],
  'Yeni sorğular': ['New requests', 'Новые запросы'], 'Yeni alış sorğusu yoxdur.': ['No new purchase requests.', 'Новых запросов на закупку нет.'], 'Yeni sorğu yoxdur.': ['No new requests.', 'Новых запросов нет.'],
  'Almıram, bağla': ['Not buying, close', 'Не закупаю, закрыть'], 'Sorğu bağlandı': ['Request closed', 'Запрос закрыт'],
  'Alış sorğusunu bağlayırsınız. Usta "rədd edildi" görəcək. Səbəb (istəyə bağlı):': ['You are closing the purchase request. The mechanic will see "rejected". Reason (optional):', 'Вы закрываете запрос на закупку. Мастер увидит «отклонено». Причина (необязательно):'],
  'Alış və kassa bağlama': ['Purchases and cash desk closing', 'Закупки и закрытие кассы'], ' kassa bağlama': [' cash desk closing', ' закрытие кассы'],
  'İstifadəçilər': ['Users', 'Пользователи'], 'Yeni istifadəçi': ['New user', 'Новый пользователь'], 'İstifadəçini düzəlt': ['Edit user', 'Изменить пользователя'],
  'Telefon (giriş üçün)': ['Phone (for sign-in)', 'Телефон (для входа)'], 'Yağ dəyişmənin usta haqqı (₼)': ['Mechanic fee per oil change (₼)', 'Оплата мастеру за замену масла (₼)'],
  'Kassanı görə bilər (yalnız bu gün)': ['Can see the cash desk (today only)', 'Видит кассу (только сегодня)'], 'Usta, usta haqqı, kassa icazəsi': ['Mechanics, fees, cash desk access', 'Мастера, оплата, доступ к кассе'],
  'Hələ daxil olmayıb': ['Not signed in yet', 'Ещё не входил'], 'Çıxış etdir (bütün cihazlar)': ['Log out (all devices)', 'Выйти (на всех устройствах)'],
  'Bu istifadəçi bütün cihazlardan çıxarılsın?': ['Log this user out of all devices?', 'Выйти из аккаунта пользователя на всех устройствах?'], 'İstifadəçi çıxarıldı': ['User logged out', 'Пользователь выведен из системы'],
  'İndi aktiv:': ['Active now:', 'Сейчас активны:'], '· Girişli:': ['· Signed in:', '· В системе:'], '· Ustaların girişi hər gün 00:00-da bitir.': ["· Mechanics' sessions end every day at 00:00.", '· Сеансы мастеров заканчиваются каждый день в 00:00.'],
  'Parametrlər': ['Settings', 'Настройки'], 'Servis, qəbz, interval, xatırlatma': ['Service, receipt, interval, reminder', 'Сервис, чек, интервал, напоминание'],
  'Qəbzin alt qeydi': ['Receipt footer', 'Подпись чека'], 'Xatırlatma mətni': ['Reminder text', 'Текст напоминания'], 'Standart az qalma həddi': ['Default low stock limit', 'Порог остатка по умолчанию'],
  'Server köhnə versiyadadır': ['The server is on an old version', 'Сервер на старой версии'],
  'Apps Script-də yeni Code.gs-i yapışdırın, installTriggers funksiyasını bir dəfə işə salın və Deploy → Manage deployments → Edit → New version → Deploy edin.': ['Paste the new Code.gs in Apps Script, run installTriggers once, then Deploy → Manage deployments → Edit → New version → Deploy.', 'Вставьте новый Code.gs в Apps Script, один раз запустите installTriggers, затем Deploy → Manage deployments → Edit → New version → Deploy.'],

  'Tövsiyə qiymət (₼)': ['Recommended price (₼)', 'Рекомендуемая цена (₼)'], 'Az qalma həddi (boşdursa 2)': ['Low stock limit (empty = 2)', 'Порог остатка (пусто = 2)'],
  'Axtar və ya yaz': ['Search or type', 'Найдите или введите'], 'Axtar və ya yeni ad yaz': ['Search or type a new name', 'Найдите или введите новое имя'],
  'Miqdar (qab və ya litr)': ['Quantity (cans or litres)', 'Количество (банки или литры)'], 'Vahid alış qiyməti (₼)': ['Unit purchase price (₼)', 'Закупочная цена за единицу (₼)'],
  'Qiymət (₼ / ədəd)': ['Price (₼ / piece)', 'Цена (₼ / шт.)'], 'Qiymət (₼ / L)': ['Price (₼ / L)', 'Цена (₼ / л)'], 'Nağd (₼)': ['Cash (₼)', 'Наличные (₼)'], 'Kart (₼)': ['Card (₼)', 'Карта (₼)'],
  'Bu maldan satışdan sonra': ['After this sale there will be', 'После продажи останется'], 'qalacaq.': ['left.', ''],
  'Ödənilməyən hissə borc kimi qalacaq:': ['The unpaid part stays as debt:', 'Неоплаченная часть останется долгом:'],
  'Satılan malın mayası': ['Cost of goods sold', 'Себестоимость проданного'], 'Ustaların payı (usta haqqı + təmir)': ["Mechanics' share (fee + repairs)", 'Доля мастеров (оплата + ремонт)'],
  'Məbləğ (₼)': ['Amount (₼)', 'Сумма (₼)'], 'Faktiki nağd (₼)': ['Actual cash (₼)', 'Фактические наличные (₼)'],
  'Yağ dəyişmə intervalı (km)': ['Oil change interval (km)', 'Интервал замены масла (км)'], 'İnterval (ay)': ['Interval (months)', 'Интервал (мес.)'],
  'Mətndə istifadə edin: {musteri}, {masin}, {nomre}, {servis}, {telefon}': ['Use in the text: {musteri}, {masin}, {nomre}, {servis}, {telefon}', 'Используйте в тексте: {musteri}, {masin}, {nomre}, {servis}, {telefon}'],
  // --- Server xətaları
  'Telefon və ya şifrə yanlışdır': ['Wrong phone or password', 'Неверный телефон или пароль'], 'Sessiya bitib, yenidən daxil olun': ['Session ended, please sign in again', 'Сеанс завершён, войдите снова'],
  'Gün bitdi. Yenidən daxil olun.': ['The day is over. Please sign in again.', 'День закончился. Войдите снова.'], 'Daxil olun': ['Please sign in', 'Войдите'],
  'İstifadəçi deaktivdir': ['The user is deactivated', 'Пользователь отключён'], 'Əvvəlcə şifrəni dəyişin': ['Change your password first', 'Сначала смените пароль'],
  'Hazırkı şifrə yanlışdır': ['The current password is wrong', 'Текущий пароль неверен'], 'Yeni şifrə köhnə şifrə ilə eyni ola bilməz': ['The new password cannot be the same as the old one', 'Новый пароль не может совпадать со старым'],
  'Çox səhv cəhd. Yenidən daxil olun.': ['Too many wrong attempts. Please sign in again.', 'Слишком много ошибок. Войдите снова.'],
  'Bu əməliyyat yalnız Admin üçündür': ['Only the Admin can do this', 'Это действие доступно только Админу'], 'Admin iş qeyd etmir': ['The Admin does not record jobs', 'Админ не записывает работы'],
  'Maşın seçilməyib': ['No car selected', 'Машина не выбрана'], 'Km yazılmayıb': ['Km is missing', 'Пробег не указан'], 'İşdə heç nə yoxdur': ['The job is empty', 'Работа пустая'],
  'Təmir işinin adı və qiyməti lazımdır': ['The repair needs a name and price', 'Укажите название и цену ремонта'], 'İş tapılmadı': ['Job not found', 'Работа не найдена'],
  'Usta yalnız öz işini, həmin gün ləğv edə bilər': ['A mechanic can cancel only own jobs, on the same day', 'Мастер может отменить только свою работу и только в тот же день'],
  'Kassa bağlanıb, Admin-ə müraciət edin': ['The cash desk is closed, contact the Admin', 'Касса закрыта, обратитесь к Админу'],
  'Yalnız öz işinizin borcunu qəbul edə bilərsiniz': ['You can accept debt only for your own jobs', 'Можно принимать долг только по своим работам'],
  'Məbləğ yazın': ['Enter the amount', 'Укажите сумму'], 'Kassaya baxmaq icazəniz yoxdur': ['You have no access to the cash desk', 'У вас нет доступа к кассе'],
  'Sorğu tapılmadı': ['Request not found', 'Запрос не найден'], 'Bu sorğu artıq bağlanıb': ['This request is already closed', 'Этот запрос уже закрыт'],
  'Özünüzü bu yolla çıxara bilməzsiniz': ['You cannot log yourself out this way', 'Так нельзя выйти из своего аккаунта'], 'İstifadəçi tapılmadı': ['User not found', 'Пользователь не найден'],
  'Bu telefon artıq istifadə olunur': ['This phone is already in use', 'Этот телефон уже используется'], 'Ad və telefon lazımdır': ['Name and phone are required', 'Нужны имя и телефон'],
  'Özünüzü deaktiv edə bilməzsiniz': ['You cannot deactivate yourself', 'Нельзя отключить самого себя'], 'Mal tapılmadı': ['Item not found', 'Товар не найден'],
  'Dövlət nömrəsi lazımdır': ['Plate number is required', 'Нужен госномер'], 'Bu gün artıq bağlanıb': ['This day is already closed', 'Этот день уже закрыт'],
  'Bu günün kassası bağlanıb': ["Today's cash desk is closed", 'Сегодняшняя касса закрыта'], 'Faktiki nağd məbləği yazın': ['Enter the actual cash amount', 'Укажите фактическую сумму наличных'],
  'Xərcin kateqoriyasını seçin': ['Choose the expense category', 'Выберите категорию расхода'], 'Düzəlişin səbəbini yazın': ['Write the reason for the correction', 'Укажите причину исправления'],
  'Usta seçilməyib': ['No mechanic selected', 'Мастер не выбран'], 'Təchizatçını seçin': ['Choose the supplier', 'Выберите поставщика'], 'Təchizatçı tapılmadı': ['Supplier not found', 'Поставщик не найден'],
  'Miqdar və ya qiymət yanlışdır': ['Wrong quantity or price', 'Неверное количество или цена'], 'Məbləğ yanlışdır': ['Wrong amount', 'Неверная сумма'],
  'Marka lazımdır': ['Make is required', 'Нужна марка'], 'Ad lazımdır': ['Name is required', 'Нужно имя'], 'Bu adda təchizatçı var': ['A supplier with this name exists', 'Поставщик с таким именем уже есть'],
  'Minimum qiymət tövsiyə qiymətindən böyük ola bilməz': ['The minimum price cannot exceed the recommended price', 'Минимальная цена не может быть выше рекомендуемой'],
  'Rəqəm yanlışdır və ya çox böyükdür': ['The number is wrong or too big', 'Число неверное или слишком большое'], 'Rəqəm çox böyükdür': ['The number is too big', 'Число слишком большое'],
  'İnternet bağlantısını yoxlayın': ['Check your internet connection', 'Проверьте подключение к интернету'],
  'Nömrə 99-OP-304 formatında olmalıdır (fərqli nömrədirsə, "Fərqli nömrə" seçin)': ['The plate must look like 99-OP-304 (for other plates, tick "Other plate")', 'Номер должен быть в формате 99-OP-304 (для другого номера отметьте «Другой номер»)']
};

// Dəyişən hissəsi olan mətnlər: [nümunə, EN, RU]
const I18N_PAT = [
  [/^Tövsiyə (.+?) · min(?:imum)? (.+?)(?: · maya (.+))?$/, m => `Recommended ${m[1]} · min ${m[2]}${m[3] ? ' · cost ' + m[3] : ''}`, m => `Рекоменд. ${m[1]} · мин. ${m[2]}${m[3] ? ' · себест. ' + m[3] : ''}`],
  [/^: anbarda ([\d\s,.−]+) (qab|ədəd|litr) qalıb\.$/, m => `: ${m[1]} ${m[2] === 'litr' ? 'L' : 'pcs'} left in stock.`, m => `: на складе осталось ${m[1]} ${m[2] === 'litr' ? 'л' : 'шт.'}`],
  [/^Ödənilməyib: (.+) borc$/, m => `Unpaid: ${m[1]} debt`, m => `Не оплачено: долг ${m[1]}`],
  [/^Usta: (.+) · Qəbz №(\d+)$/, m => `Mechanic: ${m[1]} · Receipt №${m[2]}`, m => `Мастер: ${m[1]} · Чек №${m[2]}`],
  [/^Satılıb (.+) · ödənib (.+)$/, m => `Sold ${m[1]} · paid ${m[2]}`, m => `Продано ${m[1]} · оплачено ${m[2]}`],
  [/^Xalis gəlir · (.+)$/, m => `Net income · ${m[1]}`, m => `Чистый доход · ${m[1]}`],
  [/^(\d+) iş · ödənilməyən borc (.+)$/, m => `${m[1]} jobs · unpaid debt ${m[2]}`, m => `Работ: ${m[1]} · неоплаченный долг ${m[2]}`],
  [/^(.*)\(çek №(\d+)\)$/, m => `${m[1]}(cheque №${m[2]})`, m => `${m[1]}(чек №${m[2]})`],
  [/^(\d+) maşın$/, m => `${m[1]} cars`, m => `Машин: ${m[1]}`],
  [/^(\d+) iş$/, m => `${m[1]} jobs`, m => `Работ: ${m[1]}`],
  [/^Tarixçə · (\d+) iş$/, m => `History · ${m[1]} jobs`, m => `История · работ: ${m[1]}`],
  [/^([\d\s,.−]+) (qab|ədəd)$/, m => `${m[1]} pcs`, m => `${m[1]} шт.`],
  [/^([\d\s,.−]+) litr$/, m => `${m[1]} L`, m => `${m[1]} л`],
  [/^İndi aktiv · (\d+) cihaz$/, m => `Active now · ${m[1]} device(s)`, m => `Сейчас активен · устройств: ${m[1]}`],
  [/^Girişli · (\d+) cihaz · son aktivlik (.+)$/, m => `Signed in · ${m[1]} device(s) · last active ${m[2]}`, m => `В системе · устройств: ${m[1]} · был активен ${m[2]}`],
  [/^Çıxış edib · son aktivlik (.+)$/, m => `Logged out · last active ${m[1]}`, m => `Вышел · был активен ${m[1]}`],
  [/^(.*) · son giriş (.+)$/, m => `${tr(m[1])} · last sign-in ${m[2]}`, m => `${tr(m[1])} · последний вход ${m[2]}`],
  [/^Telefon və ya şifrə yanlışdır\. Qalan cəhd: (\d+)$/, m => `Wrong phone or password. Attempts left: ${m[1]}`, m => `Неверный телефон или пароль. Осталось попыток: ${m[1]}`],
  [/^Çox səhv cəhd edildi\. (\d+) dəqiqə sonra yenidən yoxlayın\.$/, m => `Too many wrong attempts. Try again in ${m[1]} minutes.`, m => `Слишком много ошибок. Попробуйте через ${m[1]} мин.`],
  [/^Şifrədə bunlar çatmır: (.+)$/, m => `The password is missing: ${m[1].split(', ').map(tr).join(', ')}`, m => `В пароле не хватает: ${m[1].split(', ').map(tr).join(', ')}`],
  [/^Kassa bağlanmayıb \((.+)\)\. Admin kassanı bağlayana qədər yeni iş yazmaq olmur\.$/, m => `Cash desk not closed (${m[1]}). New jobs are blocked until the Admin closes it.`, m => `Касса не закрыта (${m[1]}). Новые работы недоступны, пока Админ её не закроет.`],
  [/^Nağd \+ kart (?:cəmdən|ümumi məbləğdən) \((.+)\) çox ola bilməz$/, m => `Cash + card cannot exceed the total (${m[1]})`, m => `Наличные + карта не могут превышать сумму (${m[1]})`],
  [/^Məbləğ borcdan \((.+)\) çox ola bilməz$/, m => `The amount cannot exceed the debt (${m[1]})`, m => `Сумма не может превышать долг (${m[1]})`],
  [/^(.+): qiymət minimumdan \((.+)\) aşağı ola bilməz$/, m => `${m[1]}: the price cannot be below the minimum (${m[2]})`, m => `${m[1]}: цена не может быть ниже минимума (${m[2]})`],
  [/^(.+): anbarda yalnız (.+) var$/, m => `${m[1]}: only ${m[2]} in stock`, m => `${m[1]}: на складе только ${m[2]}`],
  [/^Server müvəqqəti cavab vermədi(.*)\. Bir az sonra yenidən cəhd edin\.$/, m => `The server did not answer${m[1]}. Try again a bit later.`, m => `Сервер не ответил${m[1]}. Попробуйте чуть позже.`],
  [/^Əvvəlcə (.+) gününü bağlayın$/, m => `Close ${m[1]} first`, m => `Сначала закройте ${m[1]}`],
  [/^Usta · usta haqqı (.+)$/, m => `Mechanic · fee ${m[1]}`, m => `Мастер · оплата ${m[1]}`],
  [/^(.+) · Usta · usta haqqı (.+?)( · kassa)?$/, m => `${m[1]} · Mechanic · fee ${m[2]}${m[3] ? ' · cash desk' : ''}`, m => `${m[1]} · Мастер · оплата ${m[2]}${m[3] ? ' · касса' : ''}`],
  [/^(\d+) kassa bağlama$/, m => `${m[1]} cash desk closing`, m => `Закрытие кассы: ${m[1]}`],
  [/^(\d+) alış$/, m => `${m[1]} purchase`, m => `Закупки: ${m[1]}`],
  [/^(.+) ödənilmir və borc kimi qalacaq\. Davam edək\?$/, m => `${m[1]} is not paid and will remain as debt. Continue?`, m => `${m[1]} не оплачено и останется долгом. Продолжить?`],
  [/^(.+) · faktiki nağd: (.+)\. Kassanı bağlayaq\?$/, m => `${m[1]} · actual cash: ${m[2]}. Close the cash desk?`, m => `${m[1]} · факт. наличные: ${m[2]}. Закрыть кассу?`],
  [/^(.+) kassadan nağd ödənilsin\?$/, m => `Pay ${m[1]} in cash from the desk?`, m => `Оплатить ${m[1]} наличными из кассы?`],
  [/^(.+) bank ilə ödənilsin\?$/, m => `Pay ${m[1]} by bank?`, m => `Оплатить ${m[1]} через банк?`]
];

const LANGS = [['az', 'AZ'], ['en', 'EN'], ['ru', 'RU']];
let LANG = (() => { try { const l = localStorage.getItem('lang'); return ['az', 'en', 'ru'].includes(l) ? l : 'az'; } catch (e) { return 'az'; } })();
const I18N_MISS = new Set();

/** Bir mətni seçilmiş dilə çevirir. Tapılmasa, mətn olduğu kimi qalır. */
function tr(s) {
  if (LANG === 'az' || s == null) return s;
  const str = String(s), key = str.trim();
  if (!key) return str;
  const li = LANG === 'en' ? 0 : 1;
  const wrap = out => str.replace(key, out);
  const hit = I18N_DICT[key];
  if (hit) return wrap(hit[li]);
  for (const [re, en, ru] of I18N_PAT) { const m = key.match(re); if (m) return wrap((LANG === 'en' ? en : ru)(m)); }
  // "A · B · C": yalnız bütün hissələr məlum mətn, rəqəm və ya tarixdirsə (mal adları kimi data toxunulmur)
  if (key.includes(' · ')) {
    const parts = key.split(' · ');
    const plain = p => /^[\d\s.,:−+%₼№/-]*$/.test(p);
    if (parts.some(p => I18N_DICT[p]) && parts.every(p => I18N_DICT[p] || plain(p))) return wrap(parts.map(p => I18N_DICT[p] ? I18N_DICT[p][li] : p).join(' · '));
  }
  if (/[əğıöşüçƏĞİÖŞÜÇ]/.test(key)) I18N_MISS.add(key);
  return str;
}

/** Ekranı tərcümə edir. Qəbz, çek və sənədlər (data-noi18n, .receipt, .doc) toxunulmur. */
const I18N_SKIP = '[data-noi18n],.receipt,.doc,#rcpt,#cheque,script,style,textarea';
function translateDom(root) {
  if (LANG === 'az' || !root) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: n => (n.parentElement && n.parentElement.closest(I18N_SKIP)) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
  });
  const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
  nodes.forEach(n => { const t = tr(n.nodeValue); if (t !== n.nodeValue) n.nodeValue = t; });
  root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(el => {
    if (el.closest(I18N_SKIP)) return;
    ['placeholder', 'aria-label', 'title'].forEach(a => { const v = el.getAttribute(a); if (v) { const t = tr(v); if (t !== v) el.setAttribute(a, t); } });
  });
}

function setLang(l) {
  LANG = ['az', 'en', 'ru'].includes(l) ? l : 'az';
  try { localStorage.setItem('lang', LANG); } catch (e) { /* yaddaş bağlıdır */ }
  document.documentElement.lang = LANG;
}
document.documentElement.lang = LANG;
