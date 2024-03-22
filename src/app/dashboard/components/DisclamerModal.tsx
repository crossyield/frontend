"use client";
import React, { useEffect } from "react";

type ModalProps = {
  title: string;
  description: string;
};

const DisclaimerModal = ({ title, description }: ModalProps) => {
  useEffect(() => {
    const modal = document.getElementById(
      "disclaimer_modal"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal(); // This will open the modal when the component mounts
      toggleBackgroundBlur(true); // Blur the background
    }

    return () => {
      toggleBackgroundBlur(false); // Remove blur when component unmounts
    };
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  const toggleBackgroundBlur = (blur: boolean) => {
    const backgroundElements = document.querySelectorAll(
      ".blur-background"
    ) as NodeListOf<HTMLElement>;

    backgroundElements.forEach((element) => {
      if (blur) {
        element.classList.add("blur");
      } else {
        element.classList.remove("blur");
      }
    });
  };

  return (
    <dialog
      id="disclaimer_modal"
      className="modal modal-middle sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg text-yellow-300">{title}</h3>
        <br />
        <p className="py-4 text-justify">{description}</p>
        <div className="modal-action flex flex-col items-center">
          <form method="dialog">
            <button className="btn btn-outline text-yellow-300 rounded-xl">
              I Understand
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DisclaimerModal;
