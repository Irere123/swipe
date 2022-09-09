import React from "react";
import ReactModal from "react-modal";
import { SolidPlus } from "./icons";

interface ModalProps {
  children: React.ReactNode;
  moreInfo?: React.ReactNode;
}

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
    borderRadius: "10px",
    backgroundColor: "var(--color-primary)",
    border: "none",
    maxHeight: "80vh",
    width: "90%",
    maxWidth: 350,
  },
};

export const Modal: React.FC<ReactModal["props"] & ModalProps> = ({
  moreInfo,
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
      <div>
        <div className="flex justify-end">
          <span
            onClick={(e) => props?.onRequestClose?.(e)}
            className="flex justify-center cursor-pointer items-center rounded-full hover:bg-primary-dark bg-[#f6f6f6] w-7 h-7"
          >
            <SolidPlus className="transform rotate-45" />
          </span>
        </div>
        <div
          tabIndex={-1}
          className={`focus:outline-none overflow-y-auto`}
          onKeyDown={onKeyDown}
        >
          {children}
        </div>
        {moreInfo ? moreInfo : null}
      </div>
    </ReactModal>
  );
};
