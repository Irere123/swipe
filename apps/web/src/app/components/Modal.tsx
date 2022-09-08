import { Component, onMount } from "solid-js";

export const Modal: Component<{
  isOpen: boolean;
  setOpenModal: () => void;
}> = ({ isOpen, setOpenModal }) => {
  return (
    <div
      class="absolute top-1/2 left-1/2 right-auto bottom-auto bg-accent"
      style={{
        "z-index": 1000,
        "margin-right": "-50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        "max-width": "400px",
      }}
    >
      <p>modal</p>
    </div>
  );
};
