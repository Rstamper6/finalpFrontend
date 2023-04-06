import { Button, Input, Label } from "reactstrap";
import Modal from "react-modal";
import { useState, useContext} from 'react';
import { addBoardPost} from '../services/gravebookServices';
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ImageUploader from "./imageUploader";
import '../css/addPostForm.css'

export interface IPostFormProps {
  onClick: React.Dispatch<React.SetStateAction<boolean>>,
  click: boolean,
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
    overlay: {
      backgroundColor: 'rgba(52, 52, 52, 0.5)',
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "50%",
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
    subtitle.style.color = "#A4C2A5"
  }
  function closeModal() {
    setIsOpen(false);
  }

  function onSubmit(e: React.FormEvent<HTMLElement>) {
    addBoardPost(id, { user, boardId, from, text, file });
    console.log(user);
    closeModal();
    setFrom("");
    setText("");
    props.onClick(true)
  }


  return (
    <div>
      <Button style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} onClick={openModal}>Add post</Button>
      <Modal
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        // style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>New Post</h2>
        <Button style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} onClick={closeModal}>close</Button>
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
          <Button onClick={onSubmit} disabled type="submit" form="create_post_form">
            Add Post
          </Button>
        ) : (
          <Button onClick={onSubmit} type="submit" form="create_post_form">
            Add Post
          </Button>
        )}
      </Modal>
    </div>
  );
}
