import { Button, Label, Input } from 'reactstrap';
import Board from '../models/GraveBook';
import { BoardPost } from '../models/GraveBook';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { addBoardPost, fetchBoardPosts } from '../services/gravebookServices';
import "../css/Board.css"



export interface IBoardPostsProps {
    board: Board,
    posts: BoardPost[]
}

export function BoardPosts (props: IBoardPostsProps) {
  const [post, setPost]= useState<BoardPost>()
  const [board, setBoard]= useState()
  const [posts, setPosts]= useState()
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
    addBoardPost(props.board._id)

    closeModal()
  }

  function changeName(value:any){
    setName(value)
  }

  function changeText(value:any) {
    setText(value)
  }

  // function getPosts(id: string | undefined){
  //   fetchBoardPosts(id).then(setPosts)
    
  //   console.log(posts);
    
  // }
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
          <Button  >Add Post</Button>
        </form>
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
