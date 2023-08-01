import React from "react";
import { useModal } from "../../context/Modal";

function CancelButton() {
  const { closeModal } = useModal();

  const handleCancel = () => {
    closeModal();
  };

  return (
    <button onClick={handleCancel}>
      Cancel
    </button>
  );
}

export default CancelButton;
