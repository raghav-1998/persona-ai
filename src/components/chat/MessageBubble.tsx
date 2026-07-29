"use client"

import { ChatMessage } from "./types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";


interface MessageBubbleProps{
    message:ChatMessage
}

export default function MessageBubble({message}:MessageBubbleProps){
    const[formattedTime, setFormattedTime]=useState("");
    const isUser=message.role==="user"
    console.log(message.createdAt)

    useEffect(()=>{
        setFormattedTime(
            message.createdAt.toLocaleTimeString([],{
                hour:"2-digit",
                minute:"2-digit"
            })
        )
    },[message.createdAt])

    
    return(
        <div
            className={cn(
                "flex w-full",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
                    "break-words",
                    isUser
                        ? "bg-primary text-primary-foreground"
                        : "border bg-muted text-foreground"
                )}
            >
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                      components={{
                        pre({ children }) {
                        return (
                            <pre className="my-3 overflow-x-auto rounded-lg bg-black p-4 text-sm text-white">
                            {children}
                            </pre>
                        );
                        },

                        code({ className, children, ...props }) {
                        const isInline = !className;

                        if (isInline) {
                            return (
                            <code
                                className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
                                {...props}
                            >
                                {children}
                            </code>
                            );
                        }

                        return (
                            <code
                            className="font-mono text-sm"
                            {...props}
                            >
                            {children}
                            </code>
                        );
                        },

                        p({ children }) {
                        return <p className="mb-3 last:mb-0">{children}</p>;
                        },

                        ul({ children }) {
                        return (
                            <ul className="mb-3 list-disc space-y-1 pl-5">
                            {children}
                            </ul>
                        );
                        },

                        ol({ children }) {
                        return (
                            <ol className="mb-3 list-decimal space-y-1 pl-5">
                            {children}
                            </ol>
                        );
                        },

                        h1({ children }) {
                        return (
                            <h1 className="mb-3 text-xl font-bold">
                            {children}
                            </h1>
                        );
                        },

                        h2({ children }) {
                        return (
                            <h2 className="mb-2 text-lg font-bold">
                            {children}
                            </h2>
                        );
                        },

                        h3({ children }) {
                        return (
                            <h3 className="mb-2 text-base font-bold">
                            {children}
                            </h3>
                        );
                        },
                    }}
                >
                    {message.content}
                </ReactMarkdown>
                <p className="mt-2 text-right text-xs opacity-70">
                    {formattedTime}
                    {/* Original inline formatting caused hydration mismatch on some environments:
                    {message.createdAt.toLocaleTimeString([],{
                        hour:"2-digit",
                        minute:"2-digit"
                    })}
                    */}
                </p>
            </div>
        </div>
    )
}