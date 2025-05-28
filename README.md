
# NCAA Click-to-Advance Wrestling Bracket App

This is an interactive NCAA Wrestling Bracket application that allows users to:
- Click to advance wrestlers
- Toggle selections
- Highlight winners
- Export brackets (PDF support in progress)

## 🔐 Access Control (Paid Mode Simulation)

This version features a locked bracket interface that requires users to enter an **access code** before interacting with the bracket.

### Default Access Code:
```
WRESTLE2025
```

Once entered, access is stored via `localStorage`. This simulates how paid access or user login might work in production.

## 💡 Features

- Loads 10 weight classes (125 to 285 lbs)
- Interactive bracket (click to advance)
- Placement match annotation (1st, 3rd, 5th, 7th)
- Champion bar + winner display
- Fully styled layout using `bracket.css` and `style.css`

## 🔄 Known Limitations

- Selections are **not yet saved** across weight switches or page reloads.
- Access code modal appears only on first load (reset via `localStorage.removeItem('bracketAppAccess')` in DevTools).

## 🚀 How to Run

1. Clone or download this repository.
2. Open `index.html` in a browser (e.g., Chrome).
3. Enter the access code to unlock bracket interaction.

## 📁 Folder Structure

```
/
├── index.html
├── app.js
├── style.css
├── bracket.css
├── bracket125.json
├── ... bracket files per weight ...
```

## 📌 Coming Soon

- Persistent selections per weight using `localStorage`
- PDF export of finalized bracket
- Stripe or Patreon payment integration
- PWA/mobile install support

---

> This project is in early development. Designed and built by [Adrian Stewart](https://github.com/adrianstewart-wrestling) for serious NCAA wrestling fans.
