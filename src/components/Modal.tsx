
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleFocus = (event: FocusEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                modalRef.current.focus();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('focusin', handleFocus);
            modalRef.current?.focus();
        } else {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('focusin', handleFocus);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('focusin', handleFocus);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div
                ref={modalRef}
                tabIndex={-1}
                className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto outline-none"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
