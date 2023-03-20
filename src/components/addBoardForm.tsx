import * as React from "react";
import { Button, Label, Input } from "reactstrap";
import Board from "../models/GraveBook";
import { fetchBoards, addBoard } from "../services/gravebookServices";
import { BoardsList } from "./BoardsList";
import Modal from "react-modal";
import { BoardPost } from "../models/GraveBook";
import { useState } from "react";

export interface IBoardFormProps {}

export function BoardForm(props: IBoardFormProps) {
  const [newBoard, setNewBoard] = useState<Board>();
  const [name, setName] = useState("");
  const [dob, setdob] = useState("");
  const [dod, setdod] = useState("");
  const [obituary, setObituary] = useState("");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
  }
  function onSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();

    addBoard({ name, dob, dod, obituary }).then(setNewBoard);
    console.log(newBoard?._id);

    closeModal();
  }
  return (
    <div>
      <Button onClick={openModal}>Create Board</Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Create Board</h2>
        <Button onClick={closeModal}>close</Button>
        <form onSubmit={onSubmit}>
          <div>
            <Label>Name</Label>
            <Input
              placeholder="John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input
              placeholder="00-00-0000"
              value={dob}
              onChange={(e) => setdob(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <Label>Date of Death</Label>
            <Input
              placeholder="00-00-0000"
              value={dod}
              onChange={(e) => setdod(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <Label>Obituary</Label>
            <Input
              value={obituary}
              onChange={(e) => setObituary(e.target.value)}
              type="text"
            />
          </div>
          <Button>select files</Button>
          <Button>Submit Board</Button>
        </form>
      </Modal>
    </div>
  );
}
