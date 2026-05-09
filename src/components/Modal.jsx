import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, className = '' }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/60 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
      <div className={`bg-black-card/90 backdrop-blur-xl border border-border/50 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300 ${className}`}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black-card/50 rounded-xl transition-all group"
          >
            <svg className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div>{children}</div>
        <div className="flex gap-4 mt-8 pt-8 border-t border-border/30">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-black-card/50 hover:bg-black-card/70 border border-border/50 rounded-2xl text-text-primary text-sm font-semibold transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
