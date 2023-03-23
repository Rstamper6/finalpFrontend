import { Button, Label, Input } from 'reactstrap';
import Board from '../models/GraveBook';
import { BoardPost } from '../models/GraveBook';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { addBoardPost, fetchBoardPosts } from '../services/gravebookServices';
import "../css/Board.css"
import Form from 'react-bootstrap/Form';



export interface IBoardPostsProps {
    board: Board,
    posts: BoardPost[]
}

export function BoardPosts (props: IBoardPostsProps) {
  const [boardId, setId] = useState('')
  const [from, setFrom] = useState('')
  const [text, setText] = useState('')

  //if the board id passed through props is defined, set the id to that value
  useEffect(() =>{
    if(props.board._id){
      setId(props.board._id)
    } 
  }, [])

  //prewritten modal code until line 50
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

  //prevents refesh and call the addBoardPost function from the services
  function onSubmit(e: React.FormEvent<HTMLElement>){
    e.preventDefault()
    addBoardPost(boardId, {boardId, from, text})

    closeModal();
  }


  return (
    <div>
      <div>
        <Button onClick={openModal}>Add post</Button>
        <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} style={customStyles} onRequestClose={closeModal} contentLabel="Example Modal">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>New Post</h2>
          <Button onClick={closeModal}>close</Button>
          <Form onSubmit={onSubmit}>
            <div>
              <Label>Name</Label>
              <Input value={from} onChange={e => setFrom(e.target.value)} type='text' />
            </div>
            <div>
              <Label>Text</Label>
              <Input value={text} onChange={e => setText(e.target.value) } type='text' />
            </div>
            <Button>select files</Button>
            <Button>Add Post</Button>
          </Form>
        </Modal>
      </div>
      <div className='Board-Image'></div>
        <div className='Board-Info'>
          <div className='Title-And-Button'>
            <div>
                <h3>{props.board.name}</h3>
                <h5>{props.board.dob} - {props.board.dod}</h5>
            </div>
            <div>
              {/* <button onClick={() => getPosts(props.board._id)} className='Board-Button'>Add </button> */}
            </div>
          </div>
        <p className='Board-Paragraph'>{props.board.obituary}</p>
      </div>
      <div>

      </div>

      {props.posts !== undefined &&
        props.posts.map((post) =>         
        <div>
          <p>{post.from}</p>
          <p>{post.text}</p>
        </div>
        )
      }
    </div>
  );
}