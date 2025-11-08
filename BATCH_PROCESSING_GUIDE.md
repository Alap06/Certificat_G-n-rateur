# Guide d'Utilisation - Générateur de Certificats en Masse

## 📋 Vue d'ensemble

Ce générateur de certificats professionnel permet la création automatisée de certificats personnalisés pour les participants du Workshop LaTeX (TPL × ISIMA). Il offre des fonctionnalités avancées de traitement par lots et d'importation de données.

## ✨ Fonctionnalités Principales

### 1. **Ajout Manuel de Participants**
- Saisissez individuellement le prénom et le nom de chaque participant
- Appuyez sur "Entrée" ou cliquez sur "Ajouter" pour ajouter un participant
- Visualisez instantanément le certificat en sélectionnant un participant

### 2. **Importation CSV en Masse** 🚀
- **Format du fichier CSV :**
  ```csv
  Prenom,Nom
  Mohamed,Ben Ali
  Fatma,Trabelsi
  Ahmed,Gharbi
  ```
- **Étapes :**
  1. Cliquez sur "Télécharger Modèle CSV" pour obtenir un exemple
  2. Remplissez le fichier avec vos participants
  3. Cliquez sur "Importer CSV" et sélectionnez votre fichier
  4. Les participants sont automatiquement ajoutés à la liste

- **Formats supportés :** CSV, TXT
- **Séparateurs acceptés :** Virgule (,), Point-virgule (;), Tabulation
- **Encodage :** UTF-8 (pour les caractères arabes et français)

### 3. **Génération en Masse de Certificats** 📄
- Cliquez sur "Tout Télécharger" dans la section Participants
- Tous les certificats PDF sont générés automatiquement
- Chaque certificat est nommé : `Certificat_[Prénom]_[Nom].pdf`
- **Délai entre téléchargements :** 300ms (pour éviter les conflits navigateur)

### 4. **Téléchargement Individuel**
- **Format PDF :** Taille A4 paysage (297x210mm), haute qualité
- **Format Image :** PNG haute résolution (scale 3x)
- Sélectionnez un participant et cliquez sur le bouton de téléchargement souhaité

## 🎨 Caractéristiques du Design

### Palette de Couleurs
- **Couleurs principales :** Émeraude (#10b981) et Teal (#14b8a6)
- **Thème :** Moderne, professionnel, aligné avec les logos TPL et ISIMA

### Éléments Visuels
- **Bordures doubles** pour un aspect premium
- **Gradients animés** sur le titre et les éléments interactifs
- **Effets de profondeur** avec blur et ombres
- **Animations fluides** sur les boutons et interactions

### Signatures
- **Espaces dédiés** pour les signatures des formatrices :
  - Dr. Takwa Ben Aïcha (gauche)
  - Dr. Ones Sidhom (droite)
- Dimensions : 32x20 pixels chacune
- Prêt pour l'ajout d'images de signatures

## 🔧 Spécifications Techniques

### Résolution et Qualité
- **Scale factor :** 3x (haute résolution)
- **Format PDF :** A4 landscape (297x210mm)
- **Format Image :** PNG avec compression optimale
- **Rendu :** html2canvas + jsPDF pour une qualité professionnelle

### Performance
- **Traitement asynchrone** pour éviter le blocage de l'interface
- **Délais optimisés** entre les générations
- **Gestion des erreurs** avec notifications toast
- **Feedback visuel** pendant le traitement par lots

### Compatibilité
- ✅ Tous les navigateurs modernes (Chrome, Firefox, Edge, Safari)
- ✅ Support mobile et tablette
- ✅ Caractères spéciaux (français, arabe)

## 📝 Workflow Recommandé

### Pour un Petit Groupe (< 10 participants)
1. Ajoutez les participants manuellement
2. Vérifiez chaque certificat individuellement
3. Téléchargez-les un par un ou utilisez "Tout Télécharger"

### Pour un Grand Groupe (> 10 participants)
1. Téléchargez le modèle CSV
2. Remplissez-le avec tous les participants
3. Importez le fichier CSV
4. Vérifiez un ou deux certificats échantillons
5. Utilisez "Tout Télécharger" pour générer tous les PDFs

## 🎯 Cas d'Usage

### Workshop LaTeX - TPL × ISIMA
- **Événement :** "Rédiger un rapport de PFE professionnel avec LaTeX"
- **Formatrices :** Dr. Takwa Ben Aïcha Gader & Dr. Ones Sidhom
- **Lieu :** Amphi A • ISIMA Mahdia
- **Année :** Automatiquement mise à jour

### Personnalisation Future
Le code est structuré pour permettre facilement :
- Modification du titre du workshop
- Ajout d'images de signatures
- Changement des formatrices
- Ajustement des couleurs et du design

## 🐛 Dépannage

### Problème : Le CSV ne s'importe pas
- ✅ Vérifiez que le fichier contient bien "Prenom,Nom" en en-tête
- ✅ Assurez-vous qu'il n'y a pas de lignes vides
- ✅ Utilisez un éditeur de texte qui supporte UTF-8

### Problème : Les certificats ne se téléchargent pas
- ✅ Autorisez les téléchargements multiples dans votre navigateur
- ✅ Vérifiez que vous avez suffisamment d'espace disque
- ✅ Essayez avec un nombre réduit de participants

### Problème : La qualité est faible
- ✅ Le scale est déjà à 3x (optimal)
- ✅ N'agrandissez pas le certificat après génération
- ✅ Imprimez directement depuis le PDF

## 📧 Support

Pour toute question ou amélioration, contactez l'équipe TPL.

---

**Développé avec ❤️ pour TPL × ISIMA**
