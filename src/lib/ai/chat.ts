import { openAI } from "./client";
import { AIMessage } from "./types";

export async function generateChatResponse(
    messages:AIMessage[],
){
    const response=await openAI.chat.completions.create({
        model:"gpt-4.1-mini",
        messages
    });

    return(
        response.choices[0]?.message?.content ??
        "I'm sorry, I couldn't generate a response."
    )
}