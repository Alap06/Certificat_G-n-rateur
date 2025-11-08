# 📏 Spécifications Techniques du Certificat

## Format A4 Paysage Exact

### Dimensions Précises
- **Largeur:** 1122px (297mm à 96 DPI)
- **Hauteur:** 793px (210mm à 96 DPI)
- **Ratio d'aspect:** 1.414:1 (A4 standard)
- **Orientation:** Paysage (Landscape)
- **Padding:** 60px de tous les côtés

### Conversion DPI
```
297mm × (96 DPI / 25.4mm) = 1122px largeur
210mm × (96 DPI / 25.4mm) = 793px hauteur
```

## 🎨 Tailles de Texte Standardisées

### Header (En-tête)
- **Logo TPL/ISIMA:** 42px - Bold
- **Sous-titre:** 13px
- **Badge central:** 90×90px
- **Icône Award:** 50×50px

### Titre Principal
- **"CERTIFICAT":** 72px - Extra Bold
- **"de Participation":** 24px - Semi Bold
- **Espacement lettres:** 0.05em (CERTIFICAT), 0.02em (de Participation)

### Corps du Certificat
- **Texte d'introduction:** 20px
- **Nom du participant:** 48px - Bold (gradient)
- **Texte descriptif:** 20px
- **Titre du workshop:** 26px - Bold
- **Informations formatrices:** 17px
- **Lieu:** 17px

### Footer (Signatures)
- **Zone signature:** 150×80px chacune
- **Nom formateur:** 16px - Semi Bold
- **Titre formateur:** 13px
- **Badge TPL×ISIMA:** 17px - Bold
- **Année:** 14px

## 🎯 Structure du Certificat

```
┌────────────────────────────────────────────────────────┐
│ [60px padding]                                         │
│                                                        │
│  TPL (42px)    [Award 90×90px]      ISIMA (42px)     │
│  Tunisian... (13px)        Institut... (13px)         │
│ ──────────────────────────────────────────────────── │
│                   [40px spacing]                       │
│              CERTIFICAT (72px)                        │
│           de Participation (24px)                     │
│                   [35px spacing]                       │
│                                                        │
│     Ce certificat atteste que (20px)                  │
│     ┌──────────────────────────────┐                 │
│     │  [NOM PARTICIPANT] (48px)    │                 │
│     └──────────────────────────────┘                 │
│   a participé avec succès au workshop (20px)         │
│     ┌──────────────────────────────┐                 │
│     │  "Titre du Workshop" (26px)  │                 │
│     └──────────────────────────────┘                 │
│                                                        │
│   Animé par Dr. ... et Dr. ... (17px)                │
│   Amphi A • ISIMA Mahdia (17px)                      │
│                   [50px spacing]                       │
│ ──────────────────────────────────────────────────── │
│                                                        │
│  [Signature]   TPL×ISIMA    [Signature]              │
│   150×80px      (17px)        150×80px               │
│  Dr. Takwa      2025        Dr. Ones                 │
│   (16px)        (14px)        (16px)                 │
│  Formatrice                 Formatrice                │
│   (13px)                      (13px)                  │
│                                                        │
│ [60px padding]                                         │
└────────────────────────────────────────────────────────┘
```

## 📐 Espacements Standards

### Marges Internes
- **Top/Bottom:** 60px
- **Left/Right:** 60px

### Espacements entre sections
- **Header → Titre:** 40px
- **Titre → Corps:** 35px
- **Éléments du corps:** 25px
- **Corps → Footer:** 50px
- **Footer padding:** 35px top, 25px bottom

## 🎨 Palette de Couleurs

### Couleurs Principales
- **Emerald 600:** #10b981
- **Teal 600:** #14b8a6
- **Emerald 400:** #34d399
- **Teal 500:** #14b8a6

### Couleurs de Texte
- **Titres:** Emerald 600 (#10b981)
- **Texte principal:** Gray 700 (#374151)
- **Texte secondaire:** Gray 600 (#4b5563)
- **Texte info:** Gray 500 (#6b7280)

### Bordures
- **Principale:** Double 8px Emerald 500
- **Secondaires:** 2-4px Emerald 400-500

## 💾 Export PDF

### Configuration jsPDF
```javascript
{
  orientation: 'landscape',
  unit: 'mm',
  format: 'a4'  // 297×210mm
}
```

### Paramètres html2canvas
```javascript
{
  scale: 3,              // Haute résolution
  backgroundColor: '#ffffff',
  logging: false
}
```

### Dimensions d'export
- **PDF Width:** 297mm
- **PDF Height:** 210mm
- **Image fit:** Pleine page (0, 0, 297, 210)

## ✅ Éléments Fixes (Ne changent PAS)

1. ✅ Dimensions du certificat (1122×793px)
2. ✅ Toutes les tailles de police
3. ✅ Espacements et marges
4. ✅ Couleurs et thème
5. ✅ Structure et layout
6. ✅ Logos TPL & ISIMA
7. ✅ Titre du workshop
8. ✅ Noms des formatrices
9. ✅ Lieu (Amphi A • ISIMA Mahdia)
10. ✅ Zones de signature

## 🔄 Éléments Dynamiques (Changent)

1. 🔄 **Prénom du participant**
2. 🔄 **Nom du participant**
3. 🔄 **Année** (automatique: new Date().getFullYear())

## 📱 Affichage

### Container d'aperçu
- **Scrollable:** Oui (horizontal + vertical)
- **Max height:** 850px
- **Background:** Gray 100
- **Padding:** 4px

### Responsive
- Le certificat garde toujours ses dimensions exactes
- L'utilisateur peut scroller pour voir l'intégralité
- Pas de redimensionnement automatique

## 🖨️ Impression

### Qualité
- **Résolution:** 3× (3366×2379px rendu final)
- **Format impression:** A4 standard
- **Orientation:** Paysage obligatoire
- **Marges impression:** 0mm (pleine page)

### Recommandations
- Papier A4 de qualité (120-160g/m²)
- Impression couleur
- Mode haute qualité
- Vérifier l'orientation paysage

---

**Note:** Ces spécifications garantissent un rendu parfait et consistent sur tous les téléchargements. Seuls les noms des participants changent, tout le reste est figé.
