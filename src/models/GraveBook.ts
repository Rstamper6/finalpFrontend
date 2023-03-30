import { User } from 'firebase/auth';
export default interface Board {
    _id?: string,
    user: User | null,
    name: string,
    dob: string,
    dod: string,
    obituary: string,
    img?: string,
}

export interface BoardPost {
    _id?: string,
    user: User | null,
    boardId: string,
    from: string,
    text: string,
    file?: string,
    
}
