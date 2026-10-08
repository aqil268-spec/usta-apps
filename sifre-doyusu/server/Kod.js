/**
 * Şifrə Döyüşü — server (Google Apps Script)
 *
 * QURAŞDIRMA:
 * 1. "Şifrə Döyüşü - Məlumatlar" cədvəlini açın.
 * 2. Uzantılar (Extensions) → Apps Script.
 * 3. Bu faylın bütün məzmununu Code.gs-ə yapışdırın, Save edin.
 * 4. Deploy → New deployment → Type: Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 5. Deploy basın, icazələri verin, "/exec" ilə bitən linki kopyalayın.
 */

const SPREADSHEET_ID = '17_-FiiEG6NiRgnhpHcPE115DDwtV13662SwfBRgiruQ';

// Games cədvəlinin sütunları (0-dan başlayır)
const G = {
  id: 0, created: 1, status: 2,
  p1Name: 3, p1Token: 4, p1Secret: 5,
  p2Name: 6, p2Token: 7, p2Secret: 8,
  turn: 9, starter: 10, winner: 11,
  p1Wins: 12, p2Wins: 13, round: 14, updated: 15
};
const NCOL = 16;
const NAME_MAX = 16;

// ---------- Giriş nöqtələri ----------

function doGet(e) {
  return out(handle((e && e.parameter) || {}));
}

function doPost(e) {
  let p = {};
  try { p = JSON.parse(e.postData.contents); } catch (x) {}
  return out(handle(p));
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function handle(p) {
  try {
    const a = p.action;
    if (a === 'ping') return { ok: true };
    if (a === 'state') return state(p);

    const lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try {
      if (a === 'create') return createGame(p);
      if (a === 'join') return joinGame(p);
      if (a === 'secret') return setSecret(p);
      if (a === 'guess') return makeGuess(p);
      if (a === 'rematch') return rematch(p);
      return fail('Naməlum əməliyyat');
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return fail(String((err && err.message) || err));
  }
}

function fail(msg) { return { ok: false, error: msg }; }

// ---------- Cədvəl köməkçiləri ----------

function book() {
  try {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (x) {}
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function gamesSheet() { return book().getSheetByName('Games'); }
function guessesSheet() { return book().getSheetByName('Guesses'); }

function findGame(id) {
  id = String(id || '').toUpperCase().trim();
  if (!id) return null;
  const s = gamesSheet();
  const last = s.getLastRow();
  if (last < 2) return null;
  const ids = s.getRange(2, 1, last - 1, 1).getDisplayValues();
  for (let i = ids.length - 1; i >= 0; i--) {
    if (ids[i][0] === id) {
      const row = i + 2;
      const v = s.getRange(row, 1, 1, NCOL).getDisplayValues()[0];
      return { row: row, v: v };
    }
  }
  return null;
}

function saveGame(g) {
  g.v[G.updated] = String(Date.now());
  gamesSheet().getRange(g.row, 1, 1, NCOL).setValues([g.v.map(String)]);
}

function seatOf(g, token) {
  if (!token) return 0;
  if (token === g.v[G.p1Token]) return 1;
  if (token === g.v[G.p2Token]) return 2;
  return 0;
}

function code4(v) {
  // Sheet "0123" kimi kodu rəqəmə çevirə bilər. Rəqəmlər təkrarlanmadığı üçün
  // ən çox bir sıfır itə bilər, padStart onu bərpa edir.
  const s = String(v || '');
  return s ? s.padStart(4, '0') : '';
}

function validCode(c) {
  return /^\d{4}$/.test(c) && new Set(c.split('')).size === 4;
}

function cleanName(n) {
  return String(n || '').replace(/[<>]/g, '').trim().slice(0, NAME_MAX);
}

function newId() {
  const abc = 'ABCDFGHJKLMNPQRSTUVWXYZ'; // E və I yoxdur: rəqəmə çevrilmir, qarışmır
  let id = '';
  for (let i = 0; i < 5; i++) id += abc[Math.floor(Math.random() * abc.length)];
  return id;
}

// ---------- Əməliyyatlar ----------

function createGame(p) {
  const name = cleanName(p.name);
  if (!name) return fail('Adınızı yazın');
  let id = newId();
  while (findGame(id)) id = newId();
  const token = Utilities.getUuid();
  const row = new Array(NCOL).fill('');
  row[G.id] = id;
  row[G.created] = Utilities.formatDate(new Date(), 'Asia/Baku', 'yyyy-MM-dd HH:mm:ss');
  row[G.status] = 'waiting';
  row[G.p1Name] = name;
  row[G.p1Token] = token;
  row[G.p1Wins] = '0';
  row[G.p2Wins] = '0';
  row[G.round] = '1';
  row[G.updated] = String(Date.now());
  gamesSheet().appendRow(row);
  return { ok: true, gameId: id, token: token, seat: 1 };
}

function joinGame(p) {
  const g = findGame(p.gameId);
  if (!g) return fail('Oyun tapılmadı');
  const seat = seatOf(g, p.token);
  if (seat) return { ok: true, gameId: g.v[G.id], token: p.token, seat: seat };
  if (!g.v[G.p2Token]) {
    const name = cleanName(p.name);
    if (!name) return fail('Adınızı yazın');
    const token = Utilities.getUuid();
    g.v[G.p2Name] = name;
    g.v[G.p2Token] = token;
    g.v[G.status] = 'setup';
    saveGame(g);
    return { ok: true, gameId: g.v[G.id], token: token, seat: 2 };
  }
  return { ok: true, gameId: g.v[G.id], token: '', seat: 0 }; // izləyici
}

function setSecret(p) {
  const g = findGame(p.gameId);
  if (!g) return fail('Oyun tapılmadı');
  const seat = seatOf(g, p.token);
  if (!seat) return fail('Siz bu oyunda oyunçu deyilsiniz');
  const st = g.v[G.status];
  if (st !== 'waiting' && st !== 'setup') return fail('Şifrəni indi dəyişmək olmaz');
  const code = String(p.code || '');
  if (!validCode(code)) return fail('Şifrə 4 fərqli rəqəmdən ibarət olmalıdır');
  g.v[seat === 1 ? G.p1Secret : G.p2Secret] = code;
  if (g.v[G.p1Secret] && g.v[G.p2Secret] && g.v[G.p2Token]) {
    const starter = String(Math.random() < 0.5 ? 1 : 2);
    g.v[G.status] = 'playing';
    g.v[G.starter] = starter;
    g.v[G.turn] = starter;
  }
  saveGame(g);
  return { ok: true };
}

function makeGuess(p) {
  const g = findGame(p.gameId);
  if (!g) return fail('Oyun tapılmadı');
  const seat = seatOf(g, p.token);
  if (!seat) return fail('Siz bu oyunda oyunçu deyilsiniz');
  const st = g.v[G.status];
  if (st !== 'playing' && st !== 'lastchance') return fail('Oyun gedişə açıq deyil');
  if (String(seat) !== g.v[G.turn]) return fail('Növbə sizdə deyil');
  const guess = String(p.guess || '');
  if (!validCode(guess)) return fail('Təxmin 4 fərqli rəqəmdən ibarət olmalıdır');

  const other = seat === 1 ? 2 : 1;
  const secret = code4(g.v[other === 1 ? G.p1Secret : G.p2Secret]);
  let bulls = 0, cows = 0;
  for (let i = 0; i < 4; i++) {
    if (guess[i] === secret[i]) bulls++;
    else if (secret.indexOf(guess[i]) >= 0) cows++;
  }

  guessesSheet().appendRow([
    g.v[G.id], g.v[G.round], String(seat), guess, String(bulls), String(cows),
    Utilities.formatDate(new Date(), 'Asia/Baku', 'yyyy-MM-dd HH:mm:ss')
  ]);

  const starter = Number(g.v[G.starter]);
  if (st === 'playing') {
    if (bulls === 4) {
      if (seat === starter) {
        // Başlayan tapdı: rəqibə bərabər sayda gediş üçün son şans verilir
        g.v[G.status] = 'lastchance';
        g.v[G.turn] = String(other);
      } else {
        finish(g, String(seat));
      }
    } else {
      g.v[G.turn] = String(other);
    }
  } else { // lastchance
    finish(g, bulls === 4 ? 'draw' : String(starter));
  }
  saveGame(g);
  return { ok: true, bulls: bulls, cows: cows };
}

function finish(g, winner) {
  g.v[G.status] = 'finished';
  g.v[G.winner] = winner;
  g.v[G.turn] = '';
  if (winner === '1') g.v[G.p1Wins] = String(Number(g.v[G.p1Wins] || 0) + 1);
  if (winner === '2') g.v[G.p2Wins] = String(Number(g.v[G.p2Wins] || 0) + 1);
}

function rematch(p) {
  const g = findGame(p.gameId);
  if (!g) return fail('Oyun tapılmadı');
  if (!seatOf(g, p.token)) return fail('Siz bu oyunda oyunçu deyilsiniz');
  if (g.v[G.status] !== 'finished') return { ok: true }; // rəqib artıq başladıb
  g.v[G.round] = String(Number(g.v[G.round] || 1) + 1);
  g.v[G.status] = 'setup';
  g.v[G.p1Secret] = '';
  g.v[G.p2Secret] = '';
  g.v[G.turn] = '';
  g.v[G.starter] = '';
  g.v[G.winner] = '';
  saveGame(g);
  return { ok: true };
}

function state(p) {
  const g = findGame(p.gameId);
  if (!g) return fail('Oyun tapılmadı');
  const v = g.v;
  const seat = seatOf(g, p.token);
  const round = v[G.round];
  const finished = v[G.status] === 'finished';

  const res = {
    ok: true,
    gameId: v[G.id],
    status: v[G.status],
    seat: seat,
    round: Number(round),
    turn: Number(v[G.turn]) || 0,
    starter: Number(v[G.starter]) || 0,
    winner: v[G.winner],
    updated: v[G.updated],
    p1: { name: v[G.p1Name], ready: !!v[G.p1Secret], wins: Number(v[G.p1Wins]) || 0 },
    p2: { name: v[G.p2Name], ready: !!v[G.p2Secret], wins: Number(v[G.p2Wins]) || 0, joined: !!v[G.p2Token] },
    guesses: []
  };
  if (seat) res.mySecret = code4(v[seat === 1 ? G.p1Secret : G.p2Secret]);
  if (finished) {
    res.p1.secret = code4(v[G.p1Secret]);
    res.p2.secret = code4(v[G.p2Secret]);
  }

  const s = guessesSheet();
  const last = s.getLastRow();
  if (last >= 2) {
    const rows = s.getRange(2, 1, last - 1, 6).getDisplayValues();
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      if (r[0] === v[G.id] && r[1] === round) {
        res.guesses.push({ p: Number(r[2]), g: code4(r[3]), b: Number(r[4]), c: Number(r[5]) });
      }
    }
  }
  return res;
}
