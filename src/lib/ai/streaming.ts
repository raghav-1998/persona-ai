import OpenAI from "openai";
import { DEFAULT_MODEL, DEFAULT_TEMPERATURE } from "../constants";
import { openai } from "./client";
import { AIMessage } from "./types";

export async function generateStreamingResponse(messages:AIMessage[]){
    try {

        // ==========================================================
        // Request a streaming response from OpenAI.
        // ==========================================================
        
        const stream=await openai.chat.completions.create({
            model:DEFAULT_MODEL,
            messages,
            temperature:DEFAULT_TEMPERATURE,

            // ==========================================================
            // IMPORTANT:
            // This enables token-by-token streaming.
            // ==========================================================
            stream:true
        })

        return stream
    } catch (error) {
        if(error instanceof OpenAI.APIError){
            console.error("OpenAI Streaming Error",{
                status: error.status,
                message: error.message,
            });

            switch(error.status){
                case 401:
                    throw new Error("Invalid OpenAI API key")

                case 429:
                    throw new Error("Rate limit exceeded. Please try again shortly.")
                
                case 500:
                    throw new Error("OpenAI service is currently unavailable.");

                default:
                throw new Error(error.message);
            }
        }

        // ==========================================================
        // Unexpected server errors.
        // ==========================================================

        console.error("[Streaming Service Error]", error);

        throw new Error("Unable to start streaming response.");
    }
}