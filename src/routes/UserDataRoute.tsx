import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import {
  fetchUserData,
  fetchBoard,
  fetchUserBoard,
} from "../services/gravebookServices";
import { useParams } from "react-router-dom";
import { BoardPost } from "../models/GraveBook";
import { UserInfo } from "../components/UserInfo";
import Board from "../models/GraveBook";
import { Posts } from "../components/Posts";

export interface IUserDataRouteProps {}

export function UserDataRoute(props: IUserDataRouteProps) {
  const { user } = useContext(AuthContext);
  let [userData, setUserData] = useState<BoardPost[]>([]);
  let [userBoard, setUserBoard] = useState<Board[]>([]);
  // const [board, setBoard] = useState<Board>();
  // const [boardPosts, setboardPosts] = useState<BoardPost>([]);

  let { id } = useParams();
  function getBoard() {}

  useEffect(() => {
    user?.reload();
    console.log(user);

    fetchUserData(id).then((r) => {
      console.log(`RESPOSE: ${JSON.stringify(r, null, 2)}`);
      setUserData(r);
    });

    fetchUserBoard(id).then((r) => {
      console.log(`RESPOSE: ${JSON.stringify(r, null, 2)}`);
      setUserBoard(r);
    });
  }, []);

  let dataMapper = {};
  return (
    <div>
      <h1>{user?.displayName}'s Account</h1>
      {user !== undefined && (
        <UserInfo userData={userData} userBoard={userBoard} />
      )}

      {/* <div className='posts-div'>
          <Posts  posts={boardPosts}/>
        </div> */}
    </div>
  );
}
