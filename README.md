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

**WICHTIG:** Du musst diese Schritte in der richtigen Reihenfolge ausführen!

1. **Erstelle ein GitHub Repository** mit dem Namen `FriendStreak` (oder einem anderen Namen - dann passe `vite.config.ts` an!)

2. **Pushe den Code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/DEIN-USERNAME/FriendStreak.git
   git push -u origin main
   ```

3. **Aktiviere GitHub Pages:**
   - Gehe zu deinem Repository auf GitHub
   - Klicke auf **Settings** (oben im Menü)
   - Scrolle runter zu **Pages** (links in der Sidebar)
   - Unter **Source** wähle **"GitHub Actions"** (NICHT "Deploy from a branch"!)
   - Klicke **Save**

4. **Der erste Deployment:**
   - Gehe zu **Actions** Tab in deinem Repository
   - Du solltest den Workflow "Deploy to GitHub Pages" sehen
   - Falls er nicht automatisch läuft, klicke auf den Workflow und dann **"Run workflow"**
   - Warte bis der Workflow grün wird (ca. 2-3 Minuten)

5. **Fertig!** Die App ist dann verfügbar unter:
   `https://DEIN-USERNAME.github.io/FriendStreak/`

**Ab jetzt:** Bei jedem Push auf `main` wird automatisch neu deployed! 🚀

### Manuelles Deployment (Alternative)

Falls du GitHub Actions nicht nutzen willst:

```bash
npm run deploy
```

Dann in GitHub Settings → Pages → Source wähle "Deploy from a branch" → Branch: `gh-pages`

**Wichtig:** Falls dein Repository einen anderen Namen hat, ändere in `vite.config.ts` den `base` Pfad von `/FriendStreak/` auf `/DEIN-REPO-NAME/`!

## Speicherung

Die App verwendet **LocalStorage** im Browser. Alle markierten Tage werden automatisch gespeichert und bleiben auch nach dem Schließen des Browsers erhalten. Die Daten sind lokal auf deinem Gerät gespeichert.

## Technologien

- React + TypeScript
- Vite
- Framer Motion
- date-fns
- lucide-react
