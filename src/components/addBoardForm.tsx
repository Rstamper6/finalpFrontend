import { Button, Label, Input } from "reactstrap";
import Board from '../models/GraveBook';
import { addBoard } from "../services/gravebookServices";
import Modal from "react-modal";
import { useState, useContext } from 'react';
import ImageUploader from "./imageUploader";
import AuthContext from '../context/AuthContext';

export interface IBoardFormProps {}

export function BoardForm(props: IBoardFormProps) {
  const { user } = useContext(AuthContext)

  const [newBoard, setNewBoard] = useState<Board>();
  const [name, setName] = useState("");
  const [dob, setdob] = useState("");
  const [dod, setdod] = useState("");
  const [obituary, setObituary] = useState("");

  //from here to line 40 is all pre written code from react-modal
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
    subtitle.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
  }

  //when the form gets submitted the page wont refresh 
  //calls the "addBoard" function from the service and passes in the information in the brackets
  function onSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    addBoard({ name, dob, dod, obituary }).then(setNewBoard);
    console.log(newBoard?._id);
    closeModal();
  }
  return (
    <div>
      {
        user ?
        <div>
        {/* more prewritten modal stuff to line 62 */}
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
                //sets the value of the input box to the "name" state
                value={name}
                //whenever something gets typed in, the calls the setName state function
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
            <Button>
              {" "}
              <ImageUploader />
            </Button>
            <Button>Submit Board</Button>
          </form>
        </Modal>
      </div> :
      <p>Sign In to Add a Board</p>
      }
    </div>
  );
}
