import * as React from "react";
import { Button, Input, Label } from "reactstrap";
import Modal from "react-modal";
import { text } from "stream/consumers";
import { useState, useContext } from "react";
import { addBoardPost } from "../services/gravebookServices";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ImageUploader from "./imageUploader";

export interface IPostFormProps {
  boardId: string | undefined;
}

export function PostForm(props: IPostFormProps) {
  const { user } = useContext(AuthContext);
  // const userId = user?.uid

  const [from, setFrom] = useState("");
  const [text, setText] = useState("");
  const [boardId, setBoardId] = useState("");
  const [userId, setUserId] = useState();
  let { id } = useParams();
  const [file, setFile] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);

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
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#00";
  }
  function closeModal() {
    setIsOpen(false);
  }

  function onSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    addBoardPost(id, { boardId, from, text, file });
    closeModal();
    setFrom("");
    setText("");
  }
  return (
    <div>
      <Button onClick={openModal}>Add post</Button>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>New Post</h2>
        <Button onClick={closeModal}>close</Button>
        <form id="create_post_form" onSubmit={onSubmit}>
          <div>
            <Label>Name</Label>
            <Input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <Label>Text</Label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
            />
          </div>
        </form>
        <ImageUploader
          onImgChange={setFile}
          setDisableSubmit={setDisableSubmit}
        />
        {disableSubmit ? (
          <Button disabled type="submit" form="create_post_form">
            Add Post
          </Button>
        ) : (
          <Button type="submit" form="create_post_form">
            Add Post
          </Button>
        )}
      </Modal>
    </div>
  );
}
