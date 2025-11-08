import React from 'react';
import CertificateHeader from './CertificateHeader';
import CertificateBody from './CertificateBody';
import SignatureSection from './SignatureSection';

const Certificate = React.forwardRef(({ participant }, ref) => {
  return (
    <div 
      ref={ref} 
      className="bg-white shadow-2xl relative overflow-hidden mx-auto certificate-frame"
      style={{
        width: '1122px',
        height: '793px',
        aspectRatio: '1.414 / 1',
        border: '12px solid #059669',
        padding: '15px'
      }}
    >
      {/* Bordures décoratives */}
      <div className="absolute inset-6 border-2 border-emerald-400 rounded-lg pointer-events-none"></div>
      <div className="absolute inset-9 border border-emerald-300 rounded pointer-events-none"></div>
      
      {/* Éléments de fond décoratifs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-teal-100/30 to-emerald-100/30 rounded-full blur-3xl -z-10"></div>
      
      {/* Motif de fond */}
      <div className="absolute inset-0 opacity-5 bg-repeat" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50 L95 50 L95 95 L50 95 Z' fill='none' stroke='%2300595B' stroke-width='2'/%3E%3C/svg%3E")`
      }}></div>

      {/* Header */}
      <CertificateHeader />

      {/* Séparateur */}
      <div className="border-b-2 border-dashed border-emerald-300 mx-8"></div>

      {/* Corps du certificat */}
      <CertificateBody participant={participant} />

      {/* Séparateur */}
      <div className="border-b-2 border-dashed border-emerald-300 mx-8"></div>

      {/* Footer avec signatures */}
      <SignatureSection />

      {/* Bordures latérales décoratives */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-2 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-r"></div>
      <div className="absolute right-0 top-1/4 bottom-1/4 w-2 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-l"></div>
    </div>
  );
});

Certificate.displayName = 'Certificate';

export default Certificate;