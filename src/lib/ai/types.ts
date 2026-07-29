export type ChatRole="system"|"user"|"assistant";

export interface AIMessage{
    role:ChatRole;
    content:string;
}