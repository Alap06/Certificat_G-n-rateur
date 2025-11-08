# Configuration de l'envoi d'emails avec EmailJS

Cette application permet d'envoyer automatiquement les certificats par email aux participants. Voici comment configurer cette fonctionnalité.

## Étapes de configuration

### 1. Créer un compte EmailJS

1. Allez sur [https://www.emailjs.com](https://www.emailjs.com)
2. Créez un compte gratuit (100 emails/mois gratuits)
3. Confirmez votre adresse email

### 2. Configurer un service d'email

1. Dans le dashboard EmailJS, allez dans **Email Services**
2. Cliquez sur **Add New Service**
3. Choisissez votre fournisseur d'email (Gmail, Outlook, etc.)
4. Suivez les instructions pour connecter votre compte
5. Notez le **Service ID** généré (ex: `service_abc123`)

### 3. Créer un template d'email

1. Allez dans **Email Templates**
2. Cliquez sur **Create New Template**
3. Configurez le template comme suit :

**Subject:**
```
Votre certificat de participation au workshop LaTeX
```

**Content:**
```html
Bonjour {{to_name}},

{{message}}

Cordialement,
L'équipe TPL × ISIMA

---
Tunisian Programming Lovers
Institut Supérieur d'Informatique Mahdia
```

4. Dans **Settings**, ajoutez un attachement :
   - Name: `certificat.png`
   - Type: `{{certificate_attachment}}` (en base64)
   
5. Notez le **Template ID** (ex: `template_xyz456`)

### 4. Obtenir votre Public Key

1. Allez dans **Account** > **General**
2. Copiez votre **Public Key** (ex: `AbCdEfGhIjKlMnOp`)

### 5. Mettre à jour le code

Ouvrez le fichier `src/components/CertificateGenerator.jsx` et remplacez les valeurs aux lignes 252-254 :

```javascript
const serviceId = 'YOUR_SERVICE_ID';       // Remplacez par votre Service ID
const templateId = 'YOUR_TEMPLATE_ID';     // Remplacez par votre Template ID  
const publicKey = 'YOUR_PUBLIC_KEY';       // Remplacez par votre Public Key
```

## Utilisation

1. Ajoutez un participant avec son **prénom**, **nom** et **email**
2. Sélectionnez le participant dans la liste
3. Si le participant a un email, un bouton **"Envoyer par Email"** apparaîtra
4. Cliquez sur le bouton pour envoyer le certificat

## Variables disponibles dans le template

- `{{to_email}}` - Email du destinataire
- `{{to_name}}` - Nom complet du participant
- `{{participant_name}}` - Nom complet du participant
- `{{certificate_attachment}}` - Certificat en base64 (pièce jointe)
- `{{message}}` - Message personnalisé

## Limites du plan gratuit

- **100 emails/mois** gratuits
- Pour plus d'emails, consultez les [plans payants d'EmailJS](https://www.emailjs.com/pricing/)

## Dépannage

### L'email n'est pas envoyé
- Vérifiez que les IDs (Service, Template, Public Key) sont corrects
- Vérifiez la console du navigateur pour les erreurs
- Assurez-vous que le participant a bien un email valide

### L'email arrive en spam
- Configurez un domaine personnalisé dans EmailJS
- Utilisez une adresse email professionnelle comme expéditeur
- Ajoutez des enregistrements SPF/DKIM

### Le certificat n'apparaît pas en pièce jointe
- Vérifiez que le template EmailJS est bien configuré pour les attachements
- Assurez-vous d'utiliser le format base64 pour `{{certificate_attachment}}`

## Support

Pour plus d'informations, consultez la [documentation officielle d'EmailJS](https://www.emailjs.com/docs/).
