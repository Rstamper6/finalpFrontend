import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { fetchUserData, fetchBoard } from '../services/gravebookServices';
import { useParams } from 'react-router-dom';
import { BoardPost } from '../models/GraveBook';
import { UserInfo } from '../components/UserInfo';
import Board from '../models/GraveBook';

export interface IUserDataRouteProps {
}

export function UserDataRoute (props: IUserDataRouteProps) {
    const { user } = useContext(AuthContext)
    const [userData, setUserData] = useState<BoardPost[]>([])
    const [board, setBoard] = useState<Board>()
  
    let { id } = useParams();
    function getBoard() {
        
    }
  
    useEffect(() => {
        user?.reload()
        console.log(user);
        fetchUserData(id).then(setUserData)
    }, [])
    let dataMapper = {
      
    }
    return (
      <div>
        <h1>{user?.displayName}'s Posts</h1>
        {user !== undefined &&
            <UserInfo userData={userData} />
        }
      </div>
    );
}
