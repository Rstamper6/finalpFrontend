export default interface Board {
  _id?: string;
  name: string;
  dob: string;
  dod: string;
  obituary: string;
  img?: string;
  boardPosts?: BoardPost[];
}

export interface BoardPost {
  _id?: string;
  from: string;
  text: string;
  file?: string;
}
