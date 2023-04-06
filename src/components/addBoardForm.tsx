import { Label, Input } from "reactstrap";
import { Button } from "react-bootstrap";

import Board from "../models/GraveBook";
import { addBoard } from "../services/gravebookServices";
import Modal from "react-modal";
import { useState, useContext } from "react";
import ImageUploader from "./imageUploader";
import AuthContext from "../context/AuthContext";
import '../css/addBoardForm.css'

export interface IBoardFormProps {}

export function BoardForm(props: IBoardFormProps) {
  const { user } = useContext(AuthContext);
  const userId = user?.uid;

  const [newBoard, setNewBoard] = useState<Board>();
  const [name, setName] = useState("");
  const [dob, setdob] = useState("");
  const [dod, setdod] = useState("");
  const [obituary, setObituary] = useState("");
  const [img, setImg] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);

  //from here to line 40 is all pre written code from react-modal
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(52, 52, 52, 0.5)',
    },
    // content: {
    //   top: "50%",
    //   left: "50%",
    //   right: "auto",
    //   bottom: "auto",
    //   width: "50%",
    //   marginRight: "-50%",
    //   transform: "translate(-50%, -50%)",
    // },
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

  //when the form gets submitted the page wont refresh
  //calls the "addBoard" function from the service and passes in the information in the brackets
  function onSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    console.log(user?.toJSON());
    
    addBoard({user, name, dob, dod, obituary, img }).then(setNewBoard);
    console.log(newBoard?._id);
    closeModal();
  }

  return (
    <div>
      {" "}
      {user ? (
        <div className="modal-div">
          {/* more prewritten modal stuff to line 62 */}
          <Button variant="outline-success" style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} onClick={openModal}>Create Board</Button>
          <Modal
            className="Modal"
            overlayClassName="Overlay"

            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            // style={customStyles}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            // style={customStyles}
          >
            <div className="h2-button-div"> ``
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Create Board</h2>
              <Button style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} onClick={closeModal}>close</Button>
            </div>

            <form id="create_board_form" onSubmit={onSubmit}>
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
                  type="textarea"
                  className="obit-input "
                  value={obituary}
                  onChange={(e) => setObituary(e.target.value)}
                />
              </div>
              <div></div>
              {/* <Button> */}
              {/* </Button> */}
            </form>
            <ImageUploader
              onImgChange={setImg}
              setDisableSubmit={setDisableSubmit}
            />
            {disableSubmit ? (
              <Button style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} disabled type="submit" form="create_board_form">
                Submit Board
              </Button>
            ) : (
              <Button style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} type="submit" form="create_board_form">
                Submit Board
              </Button>
            )}
          </Modal>
        </div>
      ) : (
        <p>Sign In to Add a Board</p>
      )}
    </div>
  );
}
