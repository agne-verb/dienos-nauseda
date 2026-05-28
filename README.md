# Nausėdos citatų karuselė

Nesudėtingas React/Vite puslapis, kuriame rotuojamos Gitano Nausėdos citatos: didelė citata, kontekstas ir šaltinio nuoroda.

## Kaip paleisti lokaliai

```bash
npm install
npm run dev
```

Tada atidaryk terminale rodomą adresą, dažniausiai:

```text
http://localhost:5173
```

## Kaip įkelti į GitHub

```bash
git init
git add .
git commit -m "Initial quote carousel"
git branch -M main
git remote add origin https://github.com/TAVO-VARTOTOJAS/nausedos-citatos.git
git push -u origin main
```

## Kaip publikuoti per Vercel

1. Nueik į https://vercel.com
2. Importuok GitHub repo
3. Vercel automatiškai atpažins Vite projektą
4. Spausk Deploy

## Redagavimas

Citatos yra faile:

```text
src/App.jsx
```

Kiekviena citata turi šiuos laukus:

```js
{
  quote: "Citata",
  context: "Trumpas paaiškinimas",
  source: "Šaltinis",
  url: "Nuoroda"
}
```
