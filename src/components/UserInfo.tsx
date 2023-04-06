import { Link } from "react-router-dom";
import Board, { BoardPost } from "../models/GraveBook";
// import { deleteBoardPost, fetchBoard } from "../services/gravebookServices";
import "../css/UserData.css";
import { deleteBoard, deleteBoardPost } from "../services/gravebookServices";

export interface IUserInfoProps {
  userData: BoardPost[];
  userBoard: Board[];
}

export function UserInfo(props: IUserInfoProps) {
  // const [deletePost, setDeletePost] = useState<BoardPost[]>([]);

  async function deletePost(id: string) {
    await deleteBoardPost(id);
    // setIsOpen(true);
  }

  async function deleteBoardy(id: string) {
    await deleteBoard(id);
  }
  // const deletePost = (id: string) => {
  //   // setDeletePost(deletePost.filter((x) => x._id !== id));
  // };

  function sendToBoard(boardId: string) {
    <Link to={`/boardposts/${boardId}`}></Link>;
  }

  return (
    <div className="user-data">
      <div className="user-posts-div">
      <h2>Posts</h2>
      {/* {boards !== undefined && cards} */}
      {props.userData.length === 0 && <h5>No Posts</h5>}
      {props.userData.map((boardpost) => (
        <div className="user-posts-info">
          <p className="post-board-id">Board ID: {boardpost.boardId}</p>
          <p className="post-board-text">Text: {boardpost.text}</p>
          <button
            className="delete-button"
            onClick={(e: any) => deletePost(boardpost._id || "")}
          >
            Delete Post
          </button>
          <Link to={`/boards/${boardpost.boardId}`}>View</Link>
        </div>
      ))}
      </div>
      <div className="user-boards-div">
      <h2>Boards</h2>
      {props.userBoard.length === 0 && <h5>No Boards</h5>}

        {props.userBoard.map((board) => (
          <div className="user-board-info">
            <div>
              <img className="cardImg" src={board.img}></img>
              <p className="board-text">Name: {board.name}</p>
            </div> 
            <div>
              <p className="board-obituary">Obituary: {board.obituary}</p>
            </div>
            <div>
              <button
                className="delete-button"
                onClick={(e: any) => deleteBoardy(board._id || "")}
              >
                Delete Board
              </button>

              <Link to={`/boards/${board._id}`}>View</Link>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
