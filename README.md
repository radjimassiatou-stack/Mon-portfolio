# Portfolio de RADJI Massiatou — Déploiement sur Render

## Structure
```
render-deploy/
├── frontend/   → Site statique (Vite)
├── backend/    → Serveur API (Express + Nodemailer)
└── render.yaml → Configuration Render
```

## Étapes de déploiement

### 1. Mettre le code sur GitHub
- Crée un compte sur github.com si tu n'en as pas
- Crée un nouveau dépôt (repository) et uploade tout le contenu de ce dossier

### 2. Déployer le backend sur Render
1. Va sur render.com et connecte ton compte GitHub
2. Clique sur **New → Web Service**
3. Sélectionne ton dépôt GitHub
4. Configure :
   - **Root Directory** : `backend`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
5. Dans **Environment Variables**, ajoute :
   - `GMAIL_USER` = `radjimassiatou@gmail.com`
   - `GMAIL_APP_PASSWORD` = *(ton mot de passe d'application Gmail)*
6. Clique sur **Create Web Service**
7. Note l'URL donnée par Render (ex: `https://portfolio-api.onrender.com`)

### 3. Déployer le frontend sur Render
1. Clique sur **New → Static Site**
2. Sélectionne le même dépôt GitHub
3. Configure :
   - **Root Directory** : `frontend`
   - **Build Command** : `npm install && npm run build`
   - **Publish Directory** : `dist`
4. Dans **Environment Variables**, ajoute :
   - `VITE_API_URL` = l'URL de ton backend (ex: `https://portfolio-api.onrender.com`)
5. Clique sur **Create Static Site**

## Variables d'environnement requises

| Variable           | Service  | Description                        |
|--------------------|----------|------------------------------------|
| GMAIL_USER         | Backend  | radjimassiatou@gmail.com           |
| GMAIL_APP_PASSWORD | Backend  | Mot de passe d'application Gmail   |
| VITE_API_URL       | Frontend | URL du backend Render              |
