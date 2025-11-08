# 🚀 Configuration ImgBB pour l'envoi de certificats haute qualité

Cette solution permet d'envoyer des certificats **en qualité maximale** par email en les hébergeant sur ImgBB.

## 🎯 Avantages de cette solution

✅ **Qualité maximale** - PNG haute résolution (pas de compression)  
✅ **Gratuit** - 100 uploads/jour avec compte gratuit  
✅ **Pas de limite EmailJS** - On envoie juste un lien, pas le fichier  
✅ **Stockage 6 mois** - Les certificats restent accessibles  
✅ **Facile à configurer** - 5 minutes de setup  

---

## 📝 Étape 1 : Obtenir une clé API ImgBB

### 1. Créer un compte ImgBB

1. Allez sur [https://imgbb.com](https://imgbb.com)
2. Cliquez sur **"Sign up"** en haut à droite
3. Créez votre compte (gratuit)

### 2. Obtenir votre clé API

1. Une fois connecté, allez sur [https://api.imgbb.com/](https://api.imgbb.com/)
2. Cliquez sur **"Get API Key"**
3. Copiez votre clé API (format: `1234567890abcdef1234567890abcdef`)

### 3. Mettre à jour le code

Ouvrez `src/components/CertificateGenerator.jsx` et remplacez à la **ligne 260** :

```javascript
const imgbbApiKey = 'VOTRE_CLE_API_ICI'; // Collez votre clé API ici
```

**Exemple :**
```javascript
const imgbbApiKey = '9f8d7c6b5a4e3d2c1b0a9f8e7d6c5b4a';
```

---

## 📧 Étape 2 : Configurer le template EmailJS

### 1. Ouvrir le template

1. Connectez-vous sur [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Allez dans **Email Templates**
3. Sélectionnez votre template `template_hcq4j99`

### 2. Configuration des champs

**Settings :**
```
To Email: {{to_email}}
From Name: TPL × ISIMA
Reply To: votre-email@example.com
Subject: 🎓 Votre certificat de participation - Workshop LaTeX
```

### 3. Contenu de l'email (HTML)

**Copiez-collez ce code COMPLET :**

```html
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @media only screen and (max-width: 600px) {
            .container { padding: 10px !important; }
            .content { padding: 15px 20px !important; }
            .contact-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
            .social-buttons { flex-direction: column !important; gap: 10px !important; }
            .social-buttons a { width: 100% !important; text-align: center !important; }
            .event-badges span { display: block !important; margin: 5px 0 !important; width: 100% !important; }
            .header h1 { font-size: 24px !important; }
            .header p { font-size: 16px !important; }
        }
    </style>
</head>
<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #10b981 0%, #059669 100%);" class="container">
        
        <!-- En-tête -->
        <div style="background: white; border-radius: 15px 15px 0 0; padding: 30px 20px 20px; text-align: center; border-bottom: 3px solid #10b981;" class="header">
            <h1 style="color: #059669; margin: 0; font-size: 28px; line-height: 1.2;">🎉 Félicitations {{to_name}} !</h1>
            <p style="color: #666; font-size: 18px; margin: 10px 0 0; line-height: 1.4;">Workshop LaTeX - TPL × ISIMA</p>
        </div>

        <!-- Contenu principal -->
        <div style="background: white; padding: 20px 30px;" class="content">
            
            <!-- Message de remerciement -->
            <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin-bottom: 25px; border-left: 4px solid #10b981;">
                <p style="line-height: 1.6; color: #333; margin: 0; font-size: 16px;">
                    Au nom du <strong style="color: #059669;">club TPL ISI Mahdia</strong>, nous tenons à vous remercier chaleureusement pour votre participation exceptionnelle à notre workshop LaTeX et pour la qualité de votre présentation.
                </p>
            </div>

            <!-- Section Certificat -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 12px; text-align: center; margin: 25px 0; box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);">
                <h3 style="color: white; margin: 0 0 15px 0; font-size: 22px; line-height: 1.3;">📜 Votre Certificat Haute Qualité</h3>
                
                <a href="{{certificate_url}}" 
                   style="display: inline-block; background: white; color: #667eea; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.2); margin: 10px 0;">
                    📥 Télécharger mon certificat
                </a>
                
                <p style="color: white; font-size: 12px; margin: 15px 0 0 0; line-height: 1.4;">
                    ✨ Qualité maximale PNG • 1122x793 pixels
                </p>
            </div>

            <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 0; color: #065f46; font-size: 14px; line-height: 1.5;">
                    <strong>💡 Lien de téléchargement :</strong><br>
                    <a href="{{download_link}}" style="color: #059669; word-break: break-all;">{{download_link}}</a>
                </p>
            </div>

            <!-- Section Réseaux sociaux -->
            <div style="background: #ecfdf5; padding: 20px; border-radius: 10px; margin: 25px 0; border: 1px solid #d1fae5;">
                <h4 style="color: #059669; margin-top: 0; text-align: center; font-size: 18px; line-height: 1.3;">🔗 Restez connecté(e) avec nous</h4>
                
                <div style="display: flex; justify-content: center; gap: 15px; margin: 20px 0; flex-wrap: wrap;" class="social-buttons">
                    <a href="https://www.facebook.com/profile.php?id=100079303972778" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style="display: inline-block; background: #10b981; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3); font-size: 14px; min-width: 120px;">
                        📘 Facebook
                    </a>
                    
                    <a href="https://www.instagram.com/tpl_isima_club_official" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style="display: inline-block; background: linear-gradient(45deg, #10b981, #059669); color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3); font-size: 14px; min-width: 120px;">
                        📷 Instagram
                    </a>

                    <a href="mailto:clubtpl.isima@gmail.com"
                       style="display: inline-block; background: #059669; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; box-shadow: 0 2px 4px rgba(5, 150, 105, 0.3); font-size: 14px; min-width: 120px;">
                        📧 Email Club
                    </a>
                </div>
            </div>

            <!-- Section Contacts -->
            <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin: 25px 0; border: 1px solid #d1fae5;">
                <h4 style="color: #059669; margin-top: 0; text-align: center; font-size: 18px; line-height: 1.3;">📞 Nos contacts</h4>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;" class="contact-grid">
                    <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #d1fae5;">
                        <h5 style="color: #059669; margin: 0 0 8px 0; font-size: 16px;">👑 Président</h5>
                        <p style="margin: 5px 0; font-size: 14px; line-height: 1.4;"><strong>Ala Amara</strong></p>
                        <p style="margin: 5px 0; font-size: 12px; color: #666; line-height: 1.4;">📧 amara.ala404@gmail.com</p>
                        <p style="margin: 5px 0; font-size: 12px; color: #666; line-height: 1.4;">📞 25 112 097 / 51 877 406</p>
                    </div>
                    
                    <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #d1fae5;">
                        <h5 style="color: #059669; margin: 0 0 8px 0; font-size: 16px;">💼 Responsable RH</h5>
                        <p style="margin: 5px 0; font-size: 14px; line-height: 1.4;"><strong>Hakim Saoud</strong></p>
                        <p style="margin: 5px 0; font-size: 12px; color: #666; line-height: 1.4;">Email du club</p>
                        <p style="margin: 5px 0; font-size: 12px; color: #666; line-height: 1.4;">📧 clubtpl.isima@gmail.com</p>
                    </div>
                </div>
            </div>

            <!-- Section Événements à venir -->
            <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 25px; border-radius: 12px; text-align: center; margin: 25px 0; box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);">
                <h3 style="margin: 0 0 15px 0; font-size: 22px; line-height: 1.3;">🚀 Événements à venir !</h3>
                <p style="margin: 0; font-size: 16px; line-height: 1.5;">
                    Les jours suivants, nous vous réservons plusieurs <strong>événements très intéressants, compétitifs</strong> avec des places <strong>limitées</strong> !
                </p>
                <div style="margin-top: 15px; display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;" class="event-badges">
                    <span style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 14px; display: inline-block;">🏆 Compétitions</span>
                    <span style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 14px; display: inline-block;">🎯 Formations</span>
                    <span style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 14px; display: inline-block;">⭐ Événements exclusifs</span>
                </div>
            </div>

        </div>

        <!-- Pied de page -->
        <div style="background: white; border-radius: 0 0 15px 15px; padding: 25px; text-align: center; border-top: 3px solid #10b981;">
            <p style="margin: 0 0 15px 0; font-size: 16px; color: #333; line-height: 1.5;">
                Nous espérons vous compter parmi nous pour nos prochaines aventures !
            </p>
            
            <p style="margin: 0; font-weight: bold; color: #059669; line-height: 1.5;">
                Cordialement,<br>
                <span style="font-size: 18px;">Ala Amara</span><br>
                <span style="font-size: 14px;">Président du Club TPL ISI Mahdia</span>
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">

            <p style="font-size: 12px; color: #6b7280; line-height: 1.5;">
                <strong style="color: #059669;">Tunisian Programming Lovers × ISIMA</strong><br>
                Institut Supérieur d'Informatique de Mahdia
            </p>
        </div>

    </div>
</body>
</html>
```

### 4. Sauvegarder

Cliquez sur **"Save"** en haut à droite du template.

---

## 🎯 Variables utilisées dans le template

Le code envoie automatiquement ces variables :

- `{{to_email}}` - Email du destinataire
- `{{to_name}}` - Nom complet du participant
- `{{certificate_url}}` - Lien direct vers l'image haute qualité
- `{{download_link}}` - Lien de téléchargement
- `{{message}}` - Message personnalisé (optionnel)

---

## ✨ Résultat final

Le participant reçoit un email contenant :

1. ✅ **Message de félicitations personnalisé**
2. ✅ **Bouton de téléchargement** avec design moderne
3. ✅ **Lien direct** vers le certificat haute qualité
4. ✅ **Rappel** de la durée de validité (6 mois)

Le certificat est en **qualité maximale PNG** (pas de compression) !

---

## 🔄 Alternatives gratuites

Si vous dépassez la limite ImgBB (100 uploads/jour), voici d'autres options :

### 1. **Cloudinary** (recommandé pour gros volume)
- 25 GB de stockage gratuit
- 25 000 transformations/mois
- [https://cloudinary.com](https://cloudinary.com)

### 2. **Firebase Storage** (pour application professionnelle)
- 5 GB de stockage gratuit
- Nécessite un projet Firebase
- [https://firebase.google.com](https://firebase.google.com)

### 3. **Uploadcare** (simple comme ImgBB)
- 3000 uploads/mois gratuits
- [https://uploadcare.com](https://uploadcare.com)

---

## 🐛 Dépannage

### L'upload échoue
- Vérifiez que votre clé API ImgBB est correcte
- Assurez-vous d'avoir une connexion internet
- Vérifiez la console (F12) pour les erreurs

### L'email n'arrive pas
- Vérifiez que le template EmailJS est bien configuré
- Assurez-vous que `{{certificate_url}}` et `{{download_link}}` sont dans le template
- Testez avec votre propre email d'abord

### Le lien expire
- Les images sur ImgBB restent 6 mois minimum
- Pour un stockage permanent, utilisez Cloudinary ou Firebase

---

## 📊 Limites du plan gratuit

### ImgBB
- **100 uploads/jour** avec compte gratuit
- Taille max : **32 MB** par image
- Stockage : **6+ mois** (peut être permanent)

### EmailJS
- **200 emails/mois** gratuits
- Pas de limite de taille (on envoie juste un lien)

---

**Voilà ! Vous pouvez maintenant envoyer des certificats en qualité maximale par email ! 🚀**
