import { generateChatResponse } from "@/lib/ai/chat";
import { AIMessage } from "@/lib/ai/types";
import { getPersona } from "@/lib/persona/persona-service";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

interface ChatRequest{
    messages:AIMessage[];
}

export async function POST(req:NextRequest){
    try {
        const body:ChatRequest=await req.json();

        if(!body.messages || body.messages.length===0){
            return NextResponse.json({
                error:"At least one message is required."
            },{
                status:400
            })
        }

        const persona=getPersona();

        const messages:AIMessage[]=[
            {
                role:"system",
                content:persona.systemPrompt
            },
            ...body.messages
        ];

        const response=await generateChatResponse(messages);

        return NextResponse.json({
            message:response
        })
    } catch (error) {
        console.error("Chat API error:", error);

        return NextResponse.json({
            error:"Failed to generate response.",
        },{
            status:500,
        })
    }
}