# אשר אשכנזי צילום

אתר React/Vite בעברית עם מערכת ניהול תוכן פנימית בנתיב `/admin`.

## עקרונות תוכן

- האתר הציבורי לא מציג תמונות, המלצות, לוגואים, שירותים או חבילות דמו.
- אזור שלא הוזן בו תוכן אמיתי באדמין מוסתר או מציג מצב ריק נקי.
- שמירה מקומית בדפדפן היא גיבוי/טיוטה בלבד. כדי לפרסם תוכן לכל הגולשים יש להגדיר Google Apps Script דרך `VITE_CONTENT_API_URL`.
- כניסה ל-`/admin` ננעלת אם מגדירים `VITE_ADMIN_ACCESS_TOKEN` בסביבת הפריסה.
- טוקן השמירה של Google מוזן בתוך `/admin` ואינו נשמר בקוד המקור.
- הוראות חיבור Google Sheets מלאות נמצאות ב-`docs/google-apps-script.md`.

## הרצה מקומית

1. התקנת חבילות:
   `npm install`
2. אופציונלי: הגדרת `VITE_CONTENT_API_URL` ו-`VITE_ADMIN_ACCESS_TOKEN` בקובץ `.env.local` לפי `.env.example`.
3. הרצה:
   `npm run dev`

## בדיקות

- TypeScript: `npm run lint`
- Build: `npm run build`
