import React from "react";
import ReactModal from "react-modal";
import { Codicon } from "../icons";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.5)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#262626",
    border: "none",
    maxHeight: "80vh",
    width: "90%",
    maxWidth: 400,
  },
};

export const Modal: React.FC<ReactModal["props"] & { title?: string }> = ({
  title,
  onRequestClose,
  children,
  ...props
}) => {
  const onKeyDown = (event: React.KeyboardEvent) => {
    const currentActive = document.activeElement;
    if (event.key === "ArrowLeft") {
      (currentActive?.previousElementSibling as HTMLElement)?.focus();
    } else if (event.key === "ArrowRight") {
      (currentActive?.nextElementSibling as HTMLElement)?.focus();
    }
  };

  return (
    <ReactModal
      shouldCloseOnEsc
      shouldFocusAfterRender
      style={customStyles}
      {...props}
    >
      <div tabIndex={-1} onKeyDown={onKeyDown}>
        <div className="text-primary-100 flex flex-1 items-center mb-2">
          <h4 className="flex flex-1 justify-center">{title}</h4>
          <Codicon
            name="plus"
            className="cursor-pointer transform rotate-45"
            onClick={onRequestClose}
          />
        </div>
        {children}
      </div>
    </ReactModal>
  );
};
