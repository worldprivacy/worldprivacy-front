# WorldPrivacy Frontend

Application web de sensibilisation sur la protection des données personnelles à travers le monde.

## Description

WorldPrivacy permet aux utilisateurs d'explorer et de comprendre les différents niveaux de protection des données personnelles selon les pays. Le projet propose :

- Une carte interactive mondiale avec les législations par pays
- Un quiz pour tester ses connaissances
- Un comparateur de pays
- Une FAQ détaillée

## Prérequis

- Node.js 18 ou supérieur
- npm, yarn ou pnpm

## Installation

```bash
git clone https://github.com/votre-username/worldprivacy-front.git
cd worldprivacy-front
npm install --legacy-peer-deps
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

> Note : L'option `--legacy-peer-deps` est nécessaire en raison de la compatibilité React 19 avec certaines dépendances.

## Stack technique

### Framework et bibliothèques principales
- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4

### Composants UI
- shadcn/ui (Button, Card, Dialog, Badge, Select, Accordion)
- Lucide React (icônes)

### Carte interactive
- react-simple-maps
- world-atlas (données GeoJSON)

## Structure du projet

```
worldprivacy-front/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── carte/page.js
│   ├── quizz/page.js
│   ├── faq/page.js
│   └── globals.css
├── components/
│   ├── ui/
│   ├── Nav.jsx
│   ├── Footer.jsx
│   ├── InteractiveWorldMap.jsx
│   ├── Quizz.jsx
│   └── FAQPage.jsx
├── public/
│   └── carte-monde-couleur.jpg
├── next.config.mjs
└── package.json
```

## Configuration

### Proxy API

Le projet utilise des proxies Next.js pour communiquer avec le backend. Configuration dans `next.config.mjs` :

```javascript
export default {
  async rewrites() {
    return [
      {
        source: '/api/questions',
        destination: 'http://localhost:8080/question/list-random',
      },
      {
        source: '/api/countries',
        destination: 'http://localhost:8080/pays/list',
      },
    ];
  },
};
```

### Backend requis

Le frontend nécessite un backend PHP tournant sur `localhost:8080` avec les endpoints suivants :

- `GET /question/list-random` - Liste de questions aléatoires pour le quiz
- `GET /pays/list` - Liste des pays avec leurs niveaux de protection

## Fonctionnalités

### Carte interactive

Fichier : `components/InteractiveWorldMap.jsx`

La carte affiche tous les pays colorés selon leur niveau de protection des données. Les utilisateurs peuvent :
- Zoomer et se déplacer sur la carte
- Voir un tooltip au survol d'un pays
- Cliquer sur un pays pour voir sa fiche détaillée
- Comparer deux pays

**Niveaux de protection :**
1. Pays membre de l'UE ou de l'EEE (Vert)
2. Pays adéquat (Bleu)
3. Pays en adéquation partielle (Violet)
4. Autorité et loi spécifiques (Orange)
5. Loi non adéquate (Rouge)
6. Pas de loi (Gris)

**Format API attendu :**
```json
{
  "success": true,
  "data": {
    "pays": [
      {
        "id": "wp_pays_xxx",
        "zone": "Europe",
        "code_pays_iso": "FR",
        "nom_pays": "France",
        "nv_protection": "Pays membre de l'UE ou de l'EEE",
        "createdAt": "2025-11-28 00:26:41"
      }
    ]
  }
}
```

### Quiz

Fichier : `components/Quizz.jsx`

Quiz interactif de questions Vrai/Faux sur la protection des données personnelles.

**Fonctionnalités :**
- Questions aléatoires issues de l'API
- Barre de progression
- Score final avec message personnalisé selon le résultat
- Récapitulatif détaillé avec explications

**Format API attendu :**
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": "wp_question_xxx",
        "intitule": "Texte de la question",
        "reponse": true,
        "texteVrai": "Explication si la réponse est vraie",
        "texteFaux": "Explication si la réponse est fausse",
        "createdAt": "2025-11-28 00:52:51"
      }
    ]
  }
}
```

### FAQ

Fichier : `components/FAQPage.jsx`

Page de questions fréquentes avec :
- Timeline alternée avec cartes informatives
- Accordéons pour les questions/réponses
- Design responsive

## Build et déploiement

### Production

```bash
npm run build
npm start
```

### Variables d'environnement

Créer un fichier `.env.production` :

```env
NEXT_PUBLIC_API_URL=https://votre-api.com
```

## Problèmes connus

### Compatibilité React 19

Certaines dépendances ne supportent pas encore officiellement React 19. L'installation avec `--legacy-peer-deps` est nécessaire.

### CORS

Si vous rencontrez des erreurs CORS, vérifiez que le backend est bien configuré et accessible sur `localhost:8080`.

### Pays non cliquables

Certains noms de pays du GeoJSON (en anglais) ne correspondent pas aux noms de l'API (en français). Un mapping manuel est présent dans `InteractiveWorldMap.jsx` pour les pays principaux.

## Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## Licence

MIT

## Contact

Projet WorldPrivacy - Repository frontend
