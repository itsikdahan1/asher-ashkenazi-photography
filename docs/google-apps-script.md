---
title: Google Apps Script content backend
---

# חיבור תוכן אמיתי ל-Google Sheets

האדמין באתר יודע לשמור ולקרוא תוכן מ-Google Apps Script דרך `VITE_CONTENT_API_URL`.
הסקריפט הבא שומר את כל תוכן האתר בשורה אחת בתוך Google Sheet.

## שלבים

1. פתח Google Sheet חדש.
2. עבור אל Extensions > Apps Script.
3. הדבק את הקוד למטה.
4. החלף את `CHANGE_ME_TO_LONG_RANDOM_TOKEN` בטוקן ארוך וסודי.
5. לחץ Deploy > New deployment > Web app.
6. הגדר:
   - Execute as: Me
   - Who has access: Anyone
7. העתק את Web app URL.
8. ב-Vercel הוסף Environment Variable בשם `VITE_CONTENT_API_URL` עם ה-URL.
9. באדמין, בלשונית Google, הזן את אותו טוקן מנהל ולחץ שמור.
10. לאחר שינוי תוכן באדמין לחץ "שמור הכל".

## קוד Apps Script

```javascript
const ADMIN_TOKEN = 'CHANGE_ME_TO_LONG_RANDOM_TOKEN';
const SHEET_NAME = 'site_content';

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.getRange(1, 1, 1, 3).setValues([['key', 'json', 'updatedAt']]);
  }

  return sheet;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const row = values.find((item, index) => index > 0 && item[0] === 'content');

  if (!row || !row[1]) {
    return json_({ ok: true, content: null });
  }

  return json_({ ok: true, content: JSON.parse(row[1]) });
}

function doPost(event) {
  const body = JSON.parse(event.postData.contents || '{}');

  if (body.token !== ADMIN_TOKEN) {
    return json_({ ok: false, error: 'Unauthorized' });
  }

  if (!body.content) {
    return json_({ ok: false, error: 'Missing content' });
  }

  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const rowIndex = values.findIndex((item, index) => index > 0 && item[0] === 'content');
  const nextRow = rowIndex >= 0 ? rowIndex + 1 : sheet.getLastRow() + 1;

  sheet.getRange(nextRow, 1, 1, 3).setValues([[
    'content',
    JSON.stringify(body.content),
    new Date().toISOString(),
  ]]);

  return json_({ ok: true });
}
```

## חשוב על אבטחה

- ה-URL של Apps Script יכול להיות ציבורי, אבל כתיבה מוגנת באמצעות `ADMIN_TOKEN`.
- אל תשתמש בטוקן קצר.
- הכניסה ל-`/admin` מתבצעת עם Google דרך Firebase Authentication ומוגבלת לכתובות המייל המורשות בקוד.
- להגנה חזקה יותר, מומלץ להוסיף גם Deployment Protection ב-Vercel או בדיקת הרשאה בצד שרת אם מוסיפים backend בעתיד.
