import React, { useState } from "react";
import { Button, Modal } from "reactstrap";
import Confetti from "react-confetti";

function ACLRegistrationSuccessModal() {
  const [showConfetti, setShowConfetti] = useState(true);
  return (
    <Modal id="modalContainer" size="lg" isOpen>
      <Confetti
        width={document.getElementById("modalContainer")?.offsetWidth ?? 0}
        style={{ pointerEvents: "none" }}
        numberOfPieces={showConfetti ? 500 : 0}
        recycle={false}
        onConfettiComplete={(confetti) => {
          setShowConfetti(false);
          confetti.reset();
        }}
      />
      <div className="text-center mb-5 mt-5">
        <div>
          <i className="fa font-size-24 mb-4 text-success fa-check" />
          <p>Exam registration is successful</p>
          <Button onClick={() => (window.location.href = "")}>Close</Button>
        </div>
      </div>
    </Modal>
  );
}

export default ACLRegistrationSuccessModal;
