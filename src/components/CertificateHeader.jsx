import React from 'react';
import { Award } from 'lucide-react';
import logoTPL from '../assets/logo_tpl.jpg';

const CertificateHeader = () => {
  return (
    <div className="border-b-4 border-emerald-500" style={{ padding: '20px 35px 15px' }}>
      <div className="flex justify-between items-center">
        <div className="text-left flex flex-col items-center" style={{ width: '180px' }}>
          <img 
            src={logoTPL} 
            alt="TPL Logo" 
            className="object-contain rounded-lg shadow-sm"
            style={{ width: '100px', height: '70px' }}
          />
          <div style={{ fontSize: '10px' }} className="text-gray-600 mt-1 text-center leading-tight font-medium">
            Tunisian Programming<br/>Lovers
          </div>
        </div>
        
        <div className="text-center">
          <div className="rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg ring-4 ring-emerald-200 animate-pulse" style={{ width: '80px', height: '80px' }}>
            <Award style={{ width: '40px', height: '40px' }} className="text-white" />
          </div>
        </div>
        
        <div className="text-right" style={{ width: '180px' }}>
          <div style={{ fontSize: '36px' }} className="font-bold text-emerald-600 leading-none">ISIMA</div>
          <div style={{ fontSize: '11px' }} className="text-gray-600 mt-1 font-medium">
            Institut Supérieur Informatique<br/>Mahdia
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateHeader;