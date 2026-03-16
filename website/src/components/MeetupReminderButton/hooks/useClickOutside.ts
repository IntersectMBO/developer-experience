import { useEffect, useRef } from "react";

interface UseClickOutsideProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  hasBackAction?: boolean;
}

/**
 * Custom hook to handle click outside and ESC key events
 */
export const useClickOutside = ({
  isOpen,
  onClose,
  onBack,
  hasBackAction = false,
}: UseClickOutsideProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        buttonRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        if (hasBackAction && onBack) {
          onBack();
        } else {
          onClose();
        }
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, onBack, hasBackAction]);

  return { panelRef, buttonRef };
};
