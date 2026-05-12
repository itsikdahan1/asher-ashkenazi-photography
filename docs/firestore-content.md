---
title: Firebase Firestore content backend
---

# חיבור תוכן האתר ל-Firebase Firestore

האדמין באתר קורא ושומר את תוכן האתר במסמך Firestore מרכזי.
אין צורך ב-Google Apps Script, Google Sheets, כתובת API או טוקן מנהל נפרד.

## שלבים

1. פתח את Firebase Console של הפרויקט.
2. עבור אל Firestore Database.
3. לחץ Create database.
4. בחר Production mode.
5. בחר region מתאים ואשר.
6. עבור אל Rules.
7. הגדר כללי אבטחה שמאפשרים קריאה ציבורית וכתיבה רק למיילים המורשים.
8. פרסם את הכללים.
9. ודא שבפריסה מוגדרים משתני Firebase הרגילים:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_APP_ID`
10. בצע redeploy.
11. היכנס ל-`/admin`, ערוך תוכן ולחץ "שמור הכל".

## מסמך התוכן

האתר משתמש במסמך הבא:

- Collection: `siteContent`
- Document: `main`

בעת השמירה האדמין יוצר או מעדכן את המסמך אוטומטית.

## Firestore Rules

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /siteContent/main {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email in [
          'asher7676@gmail.com',
          'itsikdahan1@gmail.com'
        ];
    }
  }
}
```

## חשוב

- אין יותר טוקן מנהל חיצוני.
- הכתיבה מוגנת דרך Firebase Authentication ו-Firestore Rules.
- אם Firestore לא מוגדר או אין הרשאות כתיבה, השמירה תישאר כטיוטה מקומית בדפדפן.
