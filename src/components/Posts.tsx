import { BoardPost } from '../models/GraveBook';
import '../css/posts.css'

export interface IPostsProps {
    posts: BoardPost[]
}

export function Posts (props: IPostsProps) {
  return (
    <div className='posts'>
        {
            props.posts.map((post) => 
                <div className='from-text-div'>
                    <p className='from'>{post.from}</p>
                    {   post.file ?
                        <img className='post-file' src={post.file}></img>
                    :
                    null
                    }
                    <p className='text'>{post.text}</p>
                </div>

            )
        }
    </div>
  );
}
