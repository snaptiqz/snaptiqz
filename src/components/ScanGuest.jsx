import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { UserRound } from 'lucide-react';

const ScanGuest = ({ onBack, onManualEntry, onScan }) => {
  const qrCodeRegionId = 'qr-reader';
  const html5QrCodeRef = useRef(null);
  const scannerStartedRef = useRef(false); // ✅ track scanner status

  useEffect(() => {
    const qrCodeScanner = new Html5Qrcode(qrCodeRegionId);
    html5QrCodeRef.current = qrCodeScanner;

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
    };

    qrCodeScanner
      .start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          if (scannerStartedRef.current) {
            onScan?.(decodedText);
            scannerStartedRef.current = false;
            qrCodeScanner.stop().then(() => qrCodeScanner.clear());
          }
        },
        (errorMsg) => {
          // Optional: console.warn('QR scan error:', errorMsg);
        }
      )
      .then(() => {
        scannerStartedRef.current = true;
      })
      .catch((err) => {
        console.error('Unable to start scanning:', err);
      });

    return () => {
      // ✅ only stop if it started
      if (scannerStartedRef.current) {
        qrCodeScanner.stop().then(() => qrCodeScanner.clear());
      }
    };
  }, []);

  return (
    <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl shadow-lg flex flex-col items-center text-white w-full max-w-xs">
      {/* QR Scanner Container */}
      <div id={qrCodeRegionId} className="w-full aspect-square rounded-lg bg-black overflow-hidden" />

      {/* Divider */}
      <p className="my-3 text-white/50 text-sm">or</p>

      {/* Invite Code Button */}
      <button
        onClick={onManualEntry}
        className="bg-white text-black text-sm px-4 py-2 rounded-md mb-2"
      >
        Use Invite Code
      </button>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="bg-white/10 border border-white/20 text-white text-sm px-4 py-2 rounded-md flex items-center gap-2"
      >
        Back to Guests <UserRound size={16} />
      </button>
    </div>
  );
};

export default ScanGuest;
