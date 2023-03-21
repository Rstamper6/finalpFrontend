export default interface Board {
    _id?: string,
    name: string,
    dob: string,
    dod: string,
    obituary: string,
    img?: string,
}

export interface BoardPost {
    boardId: string,
    from: string,
    text: string,
    file?: string,
    
}
