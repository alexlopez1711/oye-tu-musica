import React from 'react';

const Modal = ({ videoId, onClose }) => {
  return (
    <div id="videoModal">
      <iframe
        id="videoFrame"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        allowFullScreen
      />
      <button id="closeModal" onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
};

export default Modal; 