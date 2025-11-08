import React from 'react';
import signature1 from '../assets/signature1.png';
import signature2 from '../assets/signature2.png';

const SignatureSection = () => {
  return (
    <div className="border-t-4 border-emerald-500" style={{ padding: '20px 35px 20px' }}>
      <div className="flex justify-between items-end">
        {/* Signature gauche - Dr. Takwa Ben Aïcha Gader */}
        <div className="text-center flex-1">
          <div className="mx-auto mb-3 flex justify-center items-center" style={{ height: '80px' }}>
            <img 
              src={signature1} 
              alt="Signature Dr. Takwa Ben Aïcha Gader" 
              className="object-contain"
              style={{ maxHeight: '70px', maxWidth: '180px' }}
            />
          </div>
          <div className="border-t-2 border-emerald-600 pt-3 mx-auto" style={{ width: '200px' }}>
            <p style={{ fontSize: '15px' }} className="font-bold text-gray-800">
              Dr. Takwa Ben Aïcha Gader
            </p>
            <p style={{ fontSize: '13px' }} className="text-emerald-700 font-semibold mt-1">
              Formatrice
            </p>
          </div>
        </div>
        
        {/* Centre avec date et branding */}
        <div className="text-center flex flex-col items-center justify-end mb-4 px-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg shadow-lg mb-3" style={{ padding: '10px 25px' }}>
            <p style={{ fontSize: '16px' }} className="text-white font-bold tracking-wide">
              TPL × ISIMA
            </p>
          </div>
          <p style={{ fontSize: '14px' }} className="text-gray-600 font-semibold">
            {new Date().toLocaleDateString('fr-FR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        {/* Signature droite - Dr. Ones Sidhom */}
        <div className="text-center flex-1">
          <div className="mx-auto mb-3 flex justify-center items-center" style={{ height: '80px' }}>
            <img 
              src={signature2} 
              alt="Signature Dr. Ones Sidhom" 
              className="object-contain"
              style={{ maxHeight: '70px', maxWidth: '180px' }}
            />
          </div>
          <div className="border-t-2 border-emerald-600 pt-3 mx-auto" style={{ width: '200px' }}>
            <p style={{ fontSize: '15px' }} className="font-bold text-gray-800">
              Dr. Ones Sidhom
            </p>
            <p style={{ fontSize: '13px' }} className="text-emerald-700 font-semibold mt-1">
              Formatrice
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureSection;