---
title: Firebase Firestore content backend
---

# חיבור תוכן וקבצים ל-Firebase

האדמין באתר קורא ושומר את תוכן האתר במסמך Firestore מרכזי.
תמונות שעולות מהאדמין נשמרות ב-Firebase Storage ונשמרות בתוכן ככתובת תמונה.
אין צורך ב-Google Apps Script, Google Sheets, כתובת API או טוקן מנהל נפרד.

## שלבים

1. פתח את Firebase Console של הפרויקט.
2. עבור אל Firestore Database.
3. לחץ Create database.
4. בחר Production mode.
5. בחר region מתאים ואשר.
6. עבור אל Storage.
7. לחץ Get started והפעל Firebase Storage.
8. פרסם את כללי האבטחה של Firestore ו-Storage מהקבצים `firestore.rules` ו-`storage.rules`.
9. ודא שבפריסה מוגדרים משתני Firebase הרגילים:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_APP_ID`
10. בצע redeploy.
11. היכנס ל-`/admin`, העלה תמונות, ערוך תוכן ולחץ "שמור הכל".

## מסמך התוכן

האתר משתמש במסמך הבא:

- Collection: `siteContent`
- Document: `main`

בעת השמירה האדמין יוצר או מעדכן את המסמך אוטומטית.

## קבצי תמונה

תמונות נשמרות תחת הנתיב הבא ב-Firebase Storage:

- `site-media/...`

העלאה מותרת רק למנהלים מחוברים, עד 10MB לקובץ, ורק לקבצי תמונה.

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

## Storage Rules

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /site-media/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email in [
          'asher7676@gmail.com',
          'itsikdahan1@gmail.com'
        ]
        && request.resource.size < 10 * 1024 * 1024
        && request.resource.contentType.matches('image/.*');
    }
  }
}
```

## חשוב

- אין יותר טוקן מנהל חיצוני.
- הכתיבה מוגנת דרך Firebase Authentication, Firestore Rules ו-Storage Rules.
- אם Firestore לא מוגדר או אין הרשאות כתיבה, השמירה תישאר כטיוטה מקומית בדפדפן.
- אם Storage לא מוגדר או אין הרשאות העלאה, העלאת תמונות תיכשל אבל עריכת טקסט עדיין תעבוד.
