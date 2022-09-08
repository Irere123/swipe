import { Component, createSignal, onMount } from "solid-js";
import { BoxedIcon } from "../BoxedIcon";
import { Button } from "../Button";
import { SolidMoreVert } from "../icons";
import { Modal } from "../Modal";

export const RightHeader: Component = () => {
  const [openModal, setOpenModal] = createSignal(false);

  return (
    <div class="flex gap-2">
      <Button onClick={() => setOpenModal((v) => !v)}>Login</Button>
      <BoxedIcon>
        <SolidMoreVert width={24} height={27} />
      </BoxedIcon>
      {openModal() && (
        <Modal
          isOpen={openModal()}
          setOpenModal={() => setOpenModal((v) => !v)}
        />
      )}
    </div>
  );
};
