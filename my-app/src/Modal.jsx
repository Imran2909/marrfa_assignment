import React from "react";
import "./Modal.css"; // Importing custom CSS for modal styles

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // If modal is not open, return nothing

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
