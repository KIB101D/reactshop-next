import type { ReactNode } from "react";

type ModalWrapperProps = {
  onClose: () => void;
  children: ReactNode;
  canClose: boolean;
};

import { createPortal } from "react-dom";

function ModalWrapper({
  onClose,
  children,
  canClose = true,
}: ModalWrapperProps) {
  const handleOverlayClick = () => {
    if (canClose) onClose();
  };

  return createPortal(
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white shadow-xl p-7 rounded-2xl animate-slide-in"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default ModalWrapper;
