import { generateChatResponse } from "@/lib/ai/chat";
import { AIMessage } from "@/lib/ai/types";
import { getPersona } from "@/lib/persona/persona-service";
import { NextRequest, NextResponse } from "next/server";
import { ChatErrorResponse, ChatSuccessResponse } from "@/lib/ai/api-types";
import { MAX_MESSAGE_LENGTH, MAX_HISTORY_MESSAGES } from "@/lib/constants";
import { generateStreamingResponse } from "@/lib/ai/streaming";

interface ChatRequest{
    messages:AIMessage[];
}

export async function POST(req:NextRequest){
    try {
        // console.log(await req.json())
        const body:ChatRequest=await req.json();

        // ==========================================================
        // NEW: Validate messages property
        // ==========================================================

        if (!Array.isArray(body.messages)) {
            const response: ChatErrorResponse = {
                error: "Invalid request format.",
        };

            return NextResponse.json(response, {
                status: 400,
            });
        }
        if(!body.messages || body.messages.length===0){
            const response: ChatErrorResponse={
                error:"At least one message is required."
            }
            return NextResponse.json(
                response,{
                status:400
            })
        }

         // ==========================================================
        //  NEW: Validate every message
        //  ==========================================================

        for (const message of body.messages) {
            if (
                message.role !== "user" &&
                message.role !== "assistant"
            ) {
                return NextResponse.json(
                {
                    error: "Invalid message role.",
                },
                {
                    status: 400,
                }
                );
            }

            if (!message.content.trim()) {
                return NextResponse.json(
                {
                    error: "Message cannot be empty.",
                },
                {
                    status: 400,
                }
                );
            }

            if (
                message.content.length >
                MAX_MESSAGE_LENGTH
            ) {
                return NextResponse.json(
                {
                    error: `Message exceeds ${MAX_MESSAGE_LENGTH} characters.`,
                },
                {
                    status: 400,
                }
                );
            }
        }

        // ==========================================================
        // NEW:
        // Keep only the latest conversation history.
        //
        // WHY?
        // LLMs have context limits and token costs.
        // Later we'll replace this with
        // Conversation Memory + RAG.
        // ==========================================================

        const recentMessages = body.messages.slice(
            -MAX_HISTORY_MESSAGES
        );

        // ==========================================================
        // Existing Persona Engine
        // ==========================================================

        const persona=getPersona();

        // ==========================================================
        // CHANGED:
        // Build final prompt
        // ==========================================================

        const messages:AIMessage[]=[
            {
                role:"system",
                content:persona.systemPrompt
            },
            // ...body.messages
            ...recentMessages
        ];

         // ==========================================================
        // Existing OpenAI Call
        // ==========================================================

        // const assistanResponse=await generateChatResponse(messages);

        // // ==========================================================
        // // NEW:
        // // Strongly typed success response
        // // ==========================================================

        // const response:ChatSuccessResponse={
        //     message:assistanResponse
        // }
        // return NextResponse.json(response);

        const stream=await generateStreamingResponse(messages);

        const encoder=new TextEncoder()

        const readableStream=new ReadableStream({
            async start(controller){
                try {
                    for await (const chunk of stream){
                        const token=chunk.choices[0]?.delta?.content??""
                        
                        if(token){
                            controller.enqueue(encoder.encode(token))
                        }
                    }
                    controller.close()
                } catch (error) {
                    controller.error(error)
                }
            }
        })

        return new Response(readableStream,{
            headers:{
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            }
        })

    } catch (error) {
        // console.error("Chat API error:", error);
        console.error("Streaming API error:", error);

        const response: ChatErrorResponse = {
            error:"Unable to generate a response right now. Please try again.",
        };

        return NextResponse.json(response,{
            status:500,
        })
    }
}