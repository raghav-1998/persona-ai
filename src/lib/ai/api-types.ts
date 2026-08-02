export interface ChatRequest{
    messages:{
        role:"user"|"assisatant",
        content:string;
    }[];
}

export interface ChatSuccessResponse{
    message:string
}

export interface ChatErrorResponse{
    error:string
}