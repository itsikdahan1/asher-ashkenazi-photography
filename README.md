# אשר אשכנזי צילום

אתר React/Vite בעברית עם מערכת ניהול תוכן פנימית בנתיב `/admin`.

## עקרונות תוכן

- האתר הציבורי לא מציג תמונות, המלצות, לוגואים, שירותים או חבילות דמו.
- אזור שלא הוזן בו תוכן אמיתי באדמין מוסתר או מציג מצב ריק נקי.
- שמירה מקומית בדפדפן היא גיבוי/טיוטה בלבד. כדי לפרסם תוכן לכל הגולשים יש להפעיל Firebase Firestore.
- כניסה ל-`/admin` מתבצעת עם Google דרך Firebase Authentication ומוגבלת לכתובות `asher7676@gmail.com` ו-`itsikdahan1@gmail.com`.
- הכתיבה ל-Firestore מוגנת באמצעות Firebase Authentication ו-Firestore Rules.
- הוראות חיבור Firestore מלאות נמצאות ב-`docs/firestore-content.md`.

## הרצה מקומית

1. התקנת חבילות:
   `npm install`
2. הגדרת משתני Firebase בקובץ `.env.local` לפי `.env.example`.
3. הרצה:
   `npm run dev`

## כניסה לאדמין עם Google

יש להקים Firebase Project, להפעיל Authentication עם Google provider, ולהגדיר ב-Vercel את המשתנים הבאים:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`

ב-Firebase Authentication יש להוסיף את הדומיין `www.ashkenazi-photo.site` תחת Authorized domains.
יש להפעיל Firestore Database ולהגדיר Rules לפי `docs/firestore-content.md`.

## בדיקות

- TypeScript: `npm run lint`
- Build: `npm run build`
