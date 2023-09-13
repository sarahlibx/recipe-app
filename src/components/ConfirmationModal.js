import React from "react";

const ConfirmationModal = ({ message, onCancel, onConfirm }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <p>{message}</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Delete</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
