# 🏆 Générateur de Certificats - TPL × ISIMA

Application web moderne pour générer et envoyer des certificats de participation personnalisés pour les workshops et événements.

![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-teal)
![EmailJS](https://img.shields.io/badge/EmailJS-4.4-orange)

## ✨ Fonctionnalités

- ✅ **Génération de certificats personnalisés** avec nom et prénom
- 📧 **Envoi automatique par email** avec EmailJS
- 📥 **Import/Export CSV** pour gestion en masse
- 🖼️ **Export PNG/JPG** haute qualité
- 🎨 **Design professionnel** avec logos et signatures
- 🔄 **Suppression automatique du fond** des logos
- 📱 **Interface responsive** et moderne

## 🚀 Démarrage rapide

### Installation

```bash
# Cloner le repository
git clone https://github.com/Alap06/Certificat_G-n-rateur.git
cd certificate-generator

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build pour production

```bash
npm run build
npm run preview
```

## 📧 Configuration de l'envoi d'emails

### 🚀 Solution recommandée : Upload sur ImgBB + Email avec lien

Les certificats sont **uploadés en qualité maximale** sur ImgBB et le lien de téléchargement est envoyé par email.

**✨ Avantages :**
- ✅ Qualité maximale PNG (pas de compression)
- ✅ Pas de limite de taille EmailJS
- ✅ Stockage gratuit pendant 6 mois
- ✅ Lien de téléchargement dans l'email

**📋 Configuration (5 minutes) :**

1. **Obtenez une clé API ImgBB gratuite :**
   - Créez un compte sur [ImgBB.com](https://imgbb.com)
   - Allez sur [API ImgBB](https://api.imgbb.com/) et copiez votre clé
   - Mettez-la dans `src/components/CertificateGenerator.jsx` ligne 260

2. **Configurez EmailJS :**
   - Créez un compte sur [EmailJS](https://www.emailjs.com)
   - Configurez un service d'email et un template
   - Copiez vos identifiants (Service ID, Template ID, Public Key)
   - Mettez à jour le fichier `src/components/CertificateGenerator.jsx` lignes 276-278

📖 **Guide détaillé :** [IMGBB_CONFIGURATION.md](IMGBB_CONFIGURATION.md)

## 📋 Utilisation

### Ajouter des participants

**Méthode 1 : Manuellement**
1. Entrez le prénom, nom et email (optionnel)
2. Cliquez sur "Ajouter"

**Méthode 2 : Import CSV**
1. Cliquez sur "Télécharger Modèle" pour obtenir le format
2. Remplissez le CSV avec vos participants
3. Importez le fichier via "Importer CSV"

Format CSV :
```csv
Prenom,Nom,Email
Mohamed,Ben Ali,mohamed@example.com
Fatma,Trabelsi,fatma@example.com
```

### Générer et télécharger

1. Sélectionnez un participant dans la liste
2. Le certificat s'affiche automatiquement
3. Choisissez le format :
   - **PNG** : Haute qualité avec transparence
   - **JPG** : Taille réduite
   - **Email** : Envoi automatique (si email renseigné)

## 🎨 Personnalisation

### Logos et signatures

Placez vos fichiers PNG dans `src/assets/` :
- `logo_isima.png` - Logo ISIMA
- `logo_um.png` - Logo Universitaire
- `logo_nt.png` - Logo National
- `logo_tpl.png` - Logo TPL
- `signature1.png` - Signature formatrice 1
- `signature2.png` - Signature formatrice 2

### Texte du certificat

Modifiez le fichier `src/components/CertificateGenerator.jsx` :
- Ligne 481 : Texte de participation
- Ligne 486 : Noms des formateurs
- Ligne 489 : Lieu de l'événement

## 🛠️ Technologies utilisées

- **React 18.3** - Interface utilisateur
- **Vite 5.4** - Build tool rapide
- **TailwindCSS 3.4** - Styling moderne
- **Lucide React** - Icônes
- **EmailJS 4.4** - Envoi d'emails
- **SVG** - Génération de certificats vectoriels

## 📁 Structure du projet

```
certificate-generator/
├── src/
│   ├── assets/          # Logos et signatures
│   ├── components/
│   │   └── CertificateGenerator.jsx  # Composant principal
│   ├── App.jsx
│   └── main.jsx
├── EMAIL_CONFIGURATION.md   # Guide configuration emails
├── package.json
└── README.md
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -m 'Ajout fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT.

## 👥 Auteurs

**Tunisian Programming Lovers (TPL) × ISIMA**
- Institut Supérieur d'Informatique Mahdia
- [GitHub](https://github.com/Alap06)

## 🐛 Signaler un bug

Si vous rencontrez un problème, ouvrez une [issue](https://github.com/Alap06/Certificat_G-n-rateur/issues).

---

Fait avec ❤️ par TPL × ISIMA
