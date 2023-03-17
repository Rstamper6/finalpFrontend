import { Button, Label, Input } from 'reactstrap';
import Board from '../models/GraveBook';
import { BoardPost } from '../models/GraveBook';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { addBoardPost } from '../services/gravebookServices';


export interface IBoardPostsProps {
    board: Board
}

export function BoardPosts (props: IBoardPostsProps) {
  const [post, setPost]= useState<BoardPost>()
  const [name, setName] = useState<string>()
  const [text, setText] = useState<string>()


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  let subtitle:any;
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#00';
  }
  function closeModal() {
    setIsOpen(false);
  }
  function onSubmit(e: React.FormEvent<HTMLElement>){
    e.preventDefault()
    addBoardPost(props.board._id, post)

    closeModal()
  }

  function changeName(value:any){
    setName(value)
  }

  function changeText(value:any) {
    setText(value)
  }
  return (
    <div>
      <div>
      <Button onClick={openModal}>Add post</Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>New Post</h2>
        <Button onClick={closeModal}>close</Button>
        <form onSubmit={onSubmit}>
          <div>
            <Label>Name</Label>
            <Input value={post?.from} onChange={() => changeName} type='text' />
          </div>
          <div>
            <Label>Text</Label>
            <Input value={post?.text} onChange={() => changeText } type='text' />
          </div>
          <Button>select files</Button>
          <Button type='submit' >Add Post</Button>
        </form>
      </Modal>
      
    </div>
      <h1>{props.board.name}</h1>
      <h3>{props.board.dob}</h3>
      {props.board !== undefined &&
        props.board.boardPosts?.map((post) => 
        <div>
          <p>{post.from}</p>
          <p>{post.text}</p>
        </div>

        )
      }
    </div>
  );
}