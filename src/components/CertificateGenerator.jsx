import React, { useState, useRef, useEffect } from 'react';
import { Download, Plus, Trash2, FileText, Image as ImageIcon, Award, Upload, FileDown, Users, CheckCircle, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import Sig1 from '../assets/signature1.png'
import Sig2 from '../assets/signature2.png'
import Logo_isima from '../assets/logo_isima.png'
import Logo_um from '../assets/logo_um.png'
import Logo_nt from '../assets/logo_nt.png'
import Logo_tpl from '../assets/logo_tpl.png'
const CertificateGenerator = () => {
  const [participants, setParticipants] = useState([]);
  const [newName, setNewName] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [logosBase64, setLogosBase64] = useState({
    logo_nt: '',
    logo_tpl: '',
    logo_um: '',
    logo_isima: '',
    sig1: '',
    sig2: ''
  });
  const certificateRef = useRef(null);
  const fileInputRef = useRef(null);

  // Convertir les logos en base64 avec suppression du fond
  useEffect(() => {
    const convertImageToBase64 = (imageSrc) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          
          // Obtenir les données de pixels
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Supprimer le fond blanc (ou proche du blanc)
          for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];
            
            // Si le pixel est proche du blanc (tolérance de 240), le rendre transparent
            if (red > 240 && green > 240 && blue > 240) {
              data[i + 3] = 0; // Alpha = 0 (transparent)
            }
          }
          
          // Remettre les données modifiées sur le canvas
          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = reject;
        img.src = imageSrc;
      });
    };

    Promise.all([
      convertImageToBase64(Logo_nt),
      convertImageToBase64(Logo_tpl),
      convertImageToBase64(Logo_um),
      convertImageToBase64(Logo_isima),
      convertImageToBase64(Sig1),
      convertImageToBase64(Sig2)
    ]).then(([nt, tpl, um, isima, sig1, sig2]) => {
      setLogosBase64({
        logo_nt: nt,
        logo_tpl: tpl,
        logo_um: um,
        logo_isima: isima,
        sig1: sig1,
        sig2: sig2
      });
    }).catch(error => {
      console.error('Erreur lors du chargement des logos:', error);
    });
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 4000);
  };

  const addParticipant = () => {
    if (newName.trim() && newFirstName.trim()) {
      setParticipants([...participants, { 
        id: Date.now(), 
        nom: newName.trim(), 
        prenom: newFirstName.trim(),
        email: newEmail.trim() 
      }]);
      setNewName('');
      setNewFirstName('');
      setNewEmail('');
      showToast('✅ Participant ajouté avec succès', 'success');
    }
  };

  const removeParticipant = (id) => {
    setParticipants(participants.filter(p => p.id !== id));
    if (selectedParticipant?.id === id) {
      setSelectedParticipant(null);
    }
    showToast('🗑️ Participant supprimé', 'info');
  };

  const handleCSVImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split('\n').filter(line => line.trim());
        
        const newParticipants = [];
        lines.forEach((line, index) => {
          if (index === 0 && (line.toLowerCase().includes('prenom') || line.toLowerCase().includes('nom'))) {
            return;
          }
          
          const [prenom, nom, email] = line.split(/[,;\t]/).map(s => s.trim());
          if (prenom && nom) {
            newParticipants.push({
              id: Date.now() + index,
              prenom,
              nom,
              email: email || ''
            });
          }
        });

        if (newParticipants.length > 0) {
          setParticipants([...participants, ...newParticipants]);
          showToast(`✅ ${newParticipants.length} participant(s) importé(s)`, 'success');
        } else {
          showToast('⚠️ Aucun participant valide trouvé', 'error');
        }
      } catch (error) {
        showToast('❌ Erreur lors de l\'importation', 'error');
      }
    };
    
    reader.readAsText(file);
    event.target.value = '';
  };

  const exportTemplateCSV = () => {
    const csvContent = 'Prenom,Nom,Email\nMohamed,Ben Ali,mohamed@example.com\nFatma,Trabelsi,fatma@example.com\nAhmed,Gharbi,ahmed@example.com';
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'template_participants.csv';
    link.click();
    URL.revokeObjectURL(url);
    showToast('✅ Modèle CSV téléchargé', 'success');
  };

  const downloadCertificate = async (format = 'png') => {
    if (!selectedParticipant) {
      showToast('⚠️ Veuillez sélectionner un participant', 'error');
      return;
    }

    setIsGenerating(true);
    try {
      const svgElement = certificateRef.current;
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      canvas.width = 1122;
      canvas.height = 793;

      img.onload = () => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        if (format === 'png') {
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Certificat_${selectedParticipant.prenom}_${selectedParticipant.nom}.png`;
            link.click();
            URL.revokeObjectURL(url);
            showToast('✅ Certificat PNG téléchargé', 'success');
            setIsGenerating(false);
          });
        } else {
          const imgData = canvas.toDataURL('image/jpeg', 0.95);
          const link = document.createElement('a');
          link.href = imgData;
          link.download = `Certificat_${selectedParticipant.prenom}_${selectedParticipant.nom}.jpg`;
          link.click();
          showToast('✅ Certificat JPG téléchargé', 'success');
          setIsGenerating(false);
        }
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    } catch (error) {
      showToast('❌ Erreur lors du téléchargement', 'error');
      setIsGenerating(false);
    }
  };

  const sendCertificateByEmail = async () => {
    if (!selectedParticipant) {
      showToast('⚠️ Veuillez sélectionner un participant', 'error');
      return;
    }

    if (!selectedParticipant.email) {
      showToast('⚠️ Ce participant n\'a pas d\'email', 'error');
      return;
    }

    setIsSendingEmail(true);
    try {
      // Générer le certificat en haute qualité
      const svgElement = certificateRef.current;
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      canvas.width = 1122;
      canvas.height = 793;

      img.onload = async () => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // Convertir en blob haute qualité
        canvas.toBlob(async (blob) => {
          try {
            // Uploader sur ImgBB (service gratuit de stockage d'images)
            const formData = new FormData();
            formData.append('image', blob);
            
            // Clé API ImgBB gratuite (limitée mais suffit pour les tests)
            // Vous pouvez obtenir votre propre clé sur https://api.imgbb.com/
            const imgbbApiKey = '968530f772fc3577a2e91e0c4e7237dc'; // Remplacez par votre clé
            
            showToast('⏳ Upload du certificat en cours...', 'info');
            
            const uploadResponse = await axios.post(
              `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
              formData
            );

            if (uploadResponse.data && uploadResponse.data.data) {
              const certificateUrl = uploadResponse.data.data.url;
              const downloadUrl = uploadResponse.data.data.display_url;
              
              console.log('✅ Certificat uploadé:', certificateUrl);

              // Configuration EmailJS
              const serviceId = 'service_0yq3xqe';
              const templateId = 'template_hcq4j99';
              const publicKey = 'kuORzkFnw0CSXu891';

              // Envoyer l'email avec le lien de téléchargement
              const templateParams = {
                to_email: selectedParticipant.email,
                to_name: `${selectedParticipant.prenom} ${selectedParticipant.nom}`,
                participant_name: `${selectedParticipant.prenom} ${selectedParticipant.nom}`,
                certificate_url: certificateUrl,
                download_link: downloadUrl,
                message: `Félicitations ${selectedParticipant.prenom} !\n\nVous avez participé avec succès au workshop LaTeX organisé par TPL × ISIMA.\n\nVotre certificat haute qualité est disponible en ligne. Cliquez sur le lien ci-dessous pour le télécharger :\n\n${downloadUrl}\n\nLe certificat restera accessible pendant 6 mois.\n\nCordialement,\nL'équipe TPL × ISIMA`
              };

              await emailjs.send(serviceId, templateId, templateParams, publicKey);
              showToast('✅ Certificat uploadé et email envoyé avec succès !', 'success');
            } else {
              throw new Error('Erreur lors de l\'upload');
            }
          } catch (uploadError) {
            console.error('Erreur upload:', uploadError);
            showToast('❌ Erreur lors de l\'upload du certificat. Veuillez réessayer.', 'error');
          }
          
          setIsSendingEmail(false);
        }, 'image/png', 1.0); // Qualité maximale PNG
      };

      img.onerror = () => {
        showToast('❌ Erreur lors de la génération du certificat', 'error');
        setIsSendingEmail(false);
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    } catch (error) {
      console.error('Erreur:', error);
      showToast('❌ Erreur lors de l\'envoi', 'error');
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      {/* Toast */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl ${
            toast.type === 'error' ? 'bg-red-100 border-2 border-red-400 text-red-800' :
            toast.type === 'success' ? 'bg-green-100 border-2 border-green-400 text-green-800' :
            'bg-blue-100 border-2 border-blue-400 text-blue-800'
          }`}>
            <span className="font-semibold">{toast.message}</span>
            <button onClick={() => setToast({ show: false, message: '', type: 'info' })}>✕</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4">
            <Award className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Générateur de Certificats</h1>
              <p className="text-blue-100 mt-1">TPL × ISIMA - Tunisian Programming Lovers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel */}
          <div className="space-y-6">
            {/* Add Participant */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Plus className="w-6 h-6 text-blue-600" />
                Ajouter un Participant
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  placeholder="Prénom"
                />
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  placeholder="Nom"
                />
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  placeholder="Email (optionnel)"
                />
                <button
                  onClick={addParticipant}
                  disabled={!newName.trim() || !newFirstName.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-400 transition-all shadow-md"
                >
                  Ajouter
                </button>
              </div>
            </div>

            {/* CSV Import */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Upload className="w-6 h-6 text-blue-600" />
                Importation en Masse
              </h2>
              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleCSVImport}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-green-500 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-green-600 shadow-md"
                >
                  <Upload className="w-5 h-5" />
                  Importer CSV
                </button>
                <button
                  onClick={exportTemplateCSV}
                  className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-3 rounded-lg font-semibold border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                >
                  <FileDown className="w-5 h-5" />
                  Télécharger Modèle
                </button>
              </div>
            </div>

            {/* Participants List */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                Participants ({participants.length})
              </h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {participants.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">Aucun participant</p>
                ) : (
                  participants.map((p) => (
                    <div
                      key={p.id}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedParticipant?.id === p.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                      onClick={() => setSelectedParticipant(p)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                          {p.prenom[0]}{p.nom[0]}
                        </div>
                        <p className="font-semibold text-gray-800">{p.prenom} {p.nom}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeParticipant(p.id);
                        }}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Certificate Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Aperçu du Certificat</h2>
              
              {!selectedParticipant ? (
                <div className="text-center py-16 text-gray-400">
                  <Award className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Sélectionnez un participant</p>
                </div>
              ) : (
                <>
                  <div className="overflow-auto bg-gray-100 rounded-lg p-4 max-h-[600px]">
                    <svg
                      ref={certificateRef}
                      width="1122"
                      height="793"
                      viewBox="0 0 1122 793"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    >
                      {/* Background */}
                      <defs>
                        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#E0F2FE', stopOpacity: 1 }} />
                          <stop offset="50%" style={{ stopColor: '#CCFBF1', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: '#D1FAE5', stopOpacity: 1 }} />
                        </linearGradient>
                        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                          <stop offset="50%" style={{ stopColor: '#14B8A6', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
                        </linearGradient>
                      </defs>

                      <rect width="1122" height="793" fill="url(#bgGradient)" />
                      
                      {/* Main Border */}
                      <rect x="20" y="20" width="1082" height="753" fill="none" stroke="url(#borderGradient)" strokeWidth="8" rx="10" />
                      <rect x="35" y="35" width="1052" height="723" fill="none" stroke="#14B8A6" strokeWidth="2" rx="8" />

                      {/* Decorative Corners */}
                      <circle cx="80" cy="80" r="40" fill="#3B82F6" opacity="0.1" />
                      <circle cx="1042" cy="80" r="40" fill="#10B981" opacity="0.1" />
                      <circle cx="80" cy="713" r="40" fill="#10B981" opacity="0.1" />
                      <circle cx="1042" cy="713" r="40" fill="#3B82F6" opacity="0.1" />

                      {/* Header Section - Logos */}
                      <g transform="translate(0, 60)">
                        {/* Logo National (gauche) */}
                        {logosBase64.logo_nt && (
                          <image
                            href={logosBase64.logo_nt}
                            x="115"
                            y="20"
                            width="80"
                            height="80"
                            preserveAspectRatio="xMidYMid meet"
                          />
                        )}

                        {/* Logo TPL (centre-gauche) */}
                        {logosBase64.logo_tpl && (
                          <image
                            href={logosBase64.logo_tpl}
                            x="315"
                            y="20"
                            width="80"
                            height="80"
                            preserveAspectRatio="xMidYMid meet"
                          />
                        )}

                        {/* Center Icon */}
                        <circle cx="561" cy="60" r="50" fill="url(#borderGradient)" />
                        <circle cx="561" cy="60" r="38" fill="white" />
                        <text x="561" y="75" textAnchor="middle" fill="#14B8A6" fontSize="40">🏆</text>

                        {/* Logo Universitaire (centre-droit) */}
                        {logosBase64.logo_um && (
                          <image
                            href={logosBase64.logo_um}
                            x="727"
                            y="20"
                            width="80"
                            height="80"
                            preserveAspectRatio="xMidYMid meet"
                          />
                        )}

                        {/* Logo ISIMA (droit) */}
                        {logosBase64.logo_isima && (
                          <image
                            href={logosBase64.logo_isima}
                            x="927"
                            y="20"
                            width="80"
                            height="80"
                            preserveAspectRatio="xMidYMid meet"
                          />
                        )}
                      </g>

                      {/* Main Title */}
                      <text x="561" y="220" textAnchor="middle" fill="#1F2937" fontSize="16" fontFamily="Georgia">
                        Tunisian Programming Loveners
                      </text>

                      <text x="561" y="293" textAnchor="middle" fill="#065F46" fontSize="40" fontWeight="bold" fontFamily="Georgia" letterSpacing="8">
                        CERTIFICAT DE PARTICIPATION
                      </text>

                      <line x1="300" y1="305" x2="822" y2="305" stroke="#14B8A6" strokeWidth="3" />

                      {/* Body Text */}
                      <text x="561" y="350" textAnchor="middle" fill="#4B5563" fontSize="18" fontFamily="Georgia">
                        Ce certificat atteste que
                      </text>

                      {/* Participant Name Box */}
                      <rect x="261" y="375" width="600" height="70" fill="#F0FDFA" stroke="#14B8A6" strokeWidth="3" rx="8" />
                      <text x="561" y="420" textAnchor="middle" fill="#065F46" fontSize="32" fontWeight="bold" fontFamily="Georgia">
                        {selectedParticipant.prenom} {selectedParticipant.nom}
                      </text>

                      <text x="561" y="475" textAnchor="middle" fill="#4B5563" fontSize="18" fontFamily="Georgia">
                        a participé avec succès au workshop Latex
                      </text>

                      {/* Workshop Details */}
                      <text x="561" y="530" textAnchor="middle" fill="#1F2937" fontSize="16" fontWeight="bold" fontFamily="Georgia">
                        Animé par Dr. Takwa Ben Aïcha Gader et Dr. Onès Sidhom
                      </text>
                      <text x="561" y="555" textAnchor="middle" fill="#4B5563" fontSize="14" fontFamily="Georgia">
                        Lieu : Grand Amphi – ISI Mahdia
                      </text>

                      {/* Footer Signatures */}
                      <g transform="translate(0, 620)">
                        {/* Left Signature */}
                        {logosBase64.sig1 && (
                          <image
                            href={logosBase64.sig1}
                            x="180"
                            y="-30"
                            width="160"
                            height="100"
                            preserveAspectRatio="xMidYMid meet"
                          />
                        )}
                        <line x1="150" y1="40" x2="350" y2="40" stroke="#065F46" strokeWidth="2" />
                        <text x="250" y="65" textAnchor="middle" fill="#1F2937" fontSize="14" fontWeight="bold" fontFamily="Arial">
                          Dr. Taksia Ben Aïcha Gader
                        </text>

                        {/* Center Branding */}
                        <rect x="461" y="15" width="200" height="40" fill="url(#borderGradient)" rx="8" />
                        <text x="561" y="42" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial">
                          TPL × ISIMA
                        </text>
                        <text x="561" y="75" textAnchor="middle" fill="#4B5563" fontSize="12" fontFamily="Arial">
                          Fait à Mahdia, le {new Date().toLocaleDateString('fr-FR')}
                        </text>

                        {/* Right Signature */}
                        {logosBase64.sig2 && (
                          <image
                            href={logosBase64.sig2}
                            x="800"
                            y="-30"
                            width="160"
                            height="100"
                            preserveAspectRatio="xMidYMid meet"
                          />
                        )}
                        <line x1="772" y1="40" x2="972" y2="40" stroke="#065F46" strokeWidth="2" />
                        <text x="872" y="65" textAnchor="middle" fill="#1F2937" fontSize="14" fontWeight="bold" fontFamily="Arial">
                          Dr. Onès be Sidhom
                        </text>
                      </g>

                      {/* Side Decorative Bars */}
                      <rect x="30" y="250" width="8" height="293" fill="url(#borderGradient)" rx="4" />
                      <rect x="1084" y="250" width="8" height="293" fill="url(#borderGradient)" rx="4" />
                    </svg>
                  </div>

                  {/* Download Buttons */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <button
                      onClick={() => downloadCertificate('png')}
                      disabled={isGenerating}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 shadow-lg hover:shadow-xl transition-all"
                    >
                      <ImageIcon className="w-5 h-5" />
                      {isGenerating ? 'Génération...' : 'PNG'}
                    </button>
                    <button
                      onClick={() => downloadCertificate('jpg')}
                      disabled={isGenerating}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 shadow-lg hover:shadow-xl transition-all"
                    >
                      <FileText className="w-5 h-5" />
                      {isGenerating ? 'Génération...' : 'JPG'}
                    </button>
                  </div>

                  {/* Email Button */}
                  {selectedParticipant?.email && (
                    <div className="mt-4">
                      <button
                        onClick={sendCertificateByEmail}
                        disabled={isSendingEmail || isGenerating}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 shadow-lg hover:shadow-xl transition-all"
                      >
                        <Mail className="w-5 h-5" />
                        {isSendingEmail ? 'Envoi en cours...' : `Envoyer par Email à ${selectedParticipant.email}`}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CertificateGenerator;