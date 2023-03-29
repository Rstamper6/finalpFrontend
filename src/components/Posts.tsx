import { BoardPost } from "../models/GraveBook";
import "../css/posts.css";

export interface IPostsProps {
  posts: BoardPost[];
}

export function Posts(props: IPostsProps) {
  return (
    <div className="posts">
      {props.posts.map((post) => (
        <div key={post._id} className="from-text-div">
          <h5 className="from">{post.from}</h5>
          {post.file ? <img className="post-file" src={post.file} /> : null}
          <p className="text">{post.text}</p>
        </div>
      ))}
    </div>
  );
}
