import { ReactNode } from 'react';
import './modal.css';

interface ModalProps {
    children: ReactNode
}

export default function Modal({ children }: ModalProps) {
    return (
        <div className="modal" id="modal">
            {children}
        </div>
    )
}