"use client"
import { ArrowUp } from "lucide-react";
import { useState, FormEvent, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface ChatInputProps{
    onSend:(message:string)=>void;
    disabled?:boolean;
    maxLength?:number;
}

const DEFAULT_MAX_LENGTH=2000;

export default function ChatInput({
    onSend,
    disabled=false,
    maxLength=DEFAULT_MAX_LENGTH
}:ChatInputProps){
    const [input, setInput]=useState("");
    const isDisabled=disabled || input.trim().length===0;

    const handleSubmit=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        const message=input.trim();
        if(!message ||disabled){
            return;
        }

        onSend(message);
        setInput("");
    }

    const handleKeyDown=(event:KeyboardEvent<HTMLTextAreaElement>)=>{
        if(event.key==="Enter" && !event.shiftKey){
            event.preventDefault();

            if(!isDisabled){
                event.currentTarget.form?.requestSubmit();
            }
        }    
    };

    return(
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative rounded-2xl border bg-background p-2 shadow-sm">
                <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything about coding..."
                    maxLength={maxLength}
                    disabled={disabled}
                    rows={1}
                    aria-label="Chat message"
                    className={cn(
                        "min-h-12 w-full resize-none bg-transparent px-3 py-3 pr-14",
                        "text-sm outline-none",
                        "placeholder:text-muted-foreground",
                        "disabled:cursor-not-allowed disabled:opacity-50"
                    )}
                 />
                <button
                    type="submit"
                    disabled={isDisabled}
                    aria-label="Send message"
                    className={cn(
                        "absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center",
                        "rounded-full transition-colors",
                        "bg-primary text-primary-foreground",
                        "hover:bg-primary/90",
                        "disabled:cursor-not-allowed disabled:opacity-50"
                    )}
                >
                    <ArrowUp className="h-4 w-4"/>
                </button>

                <div className="px-3 pb-1 text-right text-xs text-muted-foreground">
                    {input.length}/{maxLength}
                </div>
            </div>

            <p className="mt-2 text-center text-xs text-muted-foreground">
                Press Enter to send • Shift + Enter for a new line
            </p>
        </form>
    )

}