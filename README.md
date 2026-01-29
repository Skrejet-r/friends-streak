# Friend Streak - Sasha & Julia

Eine dunkle, satanistische React-App zum Tracken von Freundestreffen mit Wochen-Streak-Funktion.

## Features

- 📅 Wochen-Kalender ab 01.01.2026
- 🎯 Week Streak Tracking (wie viele Wochen hintereinander)
- 📊 Gesamtzahl der Treffen
- 🎨 Dunkle Animationen mit Framer Motion
- 💾 LocalStorage Persistenz (Daten bleiben gespeichert!)
- 🇷🇺 Russische Benutzeroberfläche
- ⛧ Satanistisches Design

## Installation

```bash
npm install
```

## Entwicklung

```bash
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages Deployment

### Automatisches Deployment (empfohlen)

1. Erstelle ein GitHub Repository mit dem Namen `FriendStreak`
2. Pushe den Code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/DEIN-USERNAME/FriendStreak.git
   git push -u origin main
   ```

3. Gehe zu Repository Settings → Pages
4. Unter "Source" wähle "GitHub Actions"
5. Der GitHub Actions Workflow wird automatisch bei jedem Push auf `main` die App deployen
6. Die App ist dann verfügbar unter: `https://DEIN-USERNAME.github.io/FriendStreak/`

### Manuelles Deployment

```bash
npm run deploy
```

**Wichtig:** Falls dein Repository einen anderen Namen hat, ändere in `vite.config.ts` den `base` Pfad entsprechend!

## Speicherung

Die App verwendet **LocalStorage** im Browser. Alle markierten Tage werden automatisch gespeichert und bleiben auch nach dem Schließen des Browsers erhalten. Die Daten sind lokal auf deinem Gerät gespeichert.

## Technologien

- React + TypeScript
- Vite
- Framer Motion
- date-fns
- lucide-react
