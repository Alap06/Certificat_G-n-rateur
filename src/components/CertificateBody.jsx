import React from 'react';
import signature1 from '../assets/signature1.png';
import signature2 from '../assets/signature2.png';

const CertificateBody = ({ participant }) => {
  return (
    <div className="text-center" style={{ padding: '30px 50px' }}>
      {/* Titre du certificat */}
      <div className="mb-6">
        <h1 style={{ fontSize: '56px', letterSpacing: '0.1em' }} className="font-bold text-emerald-700 leading-none mb-2">
          CERTIFICAT
        </h1>
        <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto" style={{ width: '180px' }}></div>
        <p style={{ fontSize: '20px', letterSpacing: '0.05em' }} className="text-emerald-600 font-semibold mt-2">
          de Participation
        </p>
      </div>

      {/* Contenu principal */}
      <div className="mb-6">
        <p style={{ fontSize: '17px', marginBottom: '20px' }} className="text-gray-700 font-medium">
          Ce certificat atteste que
        </p>
        
        {/* Nom du participant */}
        <div style={{ padding: '18px 35px', marginBottom: '20px' }} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border-2 border-emerald-300 shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>
          <p style={{ fontSize: '36px', color: '#065f46' }} className="font-bold relative z-10 leading-tight">
            {participant.prenom} {participant.nom}
          </p>
        </div>

        <p style={{ fontSize: '17px', marginBottom: '20px' }} className="text-gray-700 font-medium">
          a participé avec succès au workshop
        </p>

        {/* Nom du workshop */}
        <div style={{ padding: '15px 25px', marginBottom: '20px' }} className="bg-white border-2 border-emerald-400 rounded-lg shadow-sm">
          <p style={{ fontSize: '22px' }} className="font-bold text-gray-800 leading-snug">
            "Rédiger un rapport de PFE professionnel avec LaTeX"
          </p>
        </div>

        {/* Informations supplémentaires */}
        <div className="space-y-2 mb-5">
          <p style={{ fontSize: '15px' }} className="text-gray-600">
            ✅ Amphi A • ISIMA Mahdia
          </p>
        </div>

        {/* Formatrices avec signatures */}
        <div className="flex justify-center items-start gap-6 mt-4">
          {/* Dr. Takwa Ben Aïcha Gader */}
          <div className="text-center flex-1 max-w-xs">
            <p style={{ fontSize: '14px' }} className="text-gray-700 font-semibold mb-2">
              Animé par
            </p>
            <div className="bg-white rounded-lg border-2 border-emerald-300 shadow-sm" style={{ padding: '12px' }}>
              <p style={{ fontSize: '15px' }} className="font-bold text-emerald-800 mb-2">
                Dr. Takwa Ben Aïcha Gader
              </p>
              <div className="flex justify-center items-center" style={{ height: '50px', marginBottom: '6px' }}>
                <img 
                  src={signature1} 
                  alt="Signature" 
                  className="object-contain"
                  style={{ maxHeight: '45px', maxWidth: '130px' }}
                />
              </div>
              <div className="border-t-2 border-emerald-600 pt-1">
                <p style={{ fontSize: '12px' }} className="text-emerald-700 font-semibold">
                  Formatrice
                </p>
              </div>
            </div>
          </div>

          {/* Dr. Ones Sidhom */}
          <div className="text-center flex-1 max-w-xs">
            <p style={{ fontSize: '14px' }} className="text-gray-700 font-semibold mb-2">
              Animé par
            </p>
            <div className="bg-white rounded-lg border-2 border-emerald-300 shadow-sm" style={{ padding: '12px' }}>
              <p style={{ fontSize: '15px' }} className="font-bold text-emerald-800 mb-2">
                Dr. Ones Sidhom
              </p>
              <div className="flex justify-center items-center" style={{ height: '50px', marginBottom: '6px' }}>
                <img 
                  src={signature2} 
                  alt="Signature" 
                  className="object-contain"
                  style={{ maxHeight: '45px', maxWidth: '130px' }}
                />
              </div>
              <div className="border-t-2 border-emerald-600 pt-1">
                <p style={{ fontSize: '12px' }} className="text-emerald-700 font-semibold">
                  Formatrice
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateBody;