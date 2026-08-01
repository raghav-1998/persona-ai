import { useRef, useState, useEffect } from "react";
import {ChatMessage} from "./types";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import EmptyState from "./EmptyState";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow(){
    const[messages, setMessages]=useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading]=useState(false)

    const messageEndRef=useRef<HTMLDivElement | null>(null);
    

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    async function handleSendMessage(content:string){
        const newMessage:ChatMessage={
            id:crypto.randomUUID(),
            role:"user",
            content,
            createdAt:new Date()
        };

        // console.log(newMessage);
        const updatedMessage=[...messages,newMessage]
        setMessages(updatedMessage);

        /*
     * Temporary loading simulation.
     *
     * Actual AI integration will be implemented in Chapter 5.
     */
        // setIsLoading(true);

        // setTimeout(()=>{
        //     const assistantMessage:ChatMessage={
        //         id:crypto.randomUUID(),
        //         role:"assistant",
        //         content:
        //         "I received your message. AI integration will be added in Chapter 5 ☕",
        //         createdAt:new Date()
        //     };

        //     setMessages((previousMessages)=>[
        //         ...previousMessages,
        //         assistantMessage,
        //     ]);

        //     setIsLoading(false)
        // }, 1000)
        setIsLoading(true);

        try {
        //console.log(messages);
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            messages: updatedMessage.map((message) => ({
                role: message.role,
                content: message.content,
            })),
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to generate response.");
        }

        const data: { message: string } = await response.json();

        const assistantMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.message,
            createdAt: new Date(),
        };

        setMessages([...updatedMessage, assistantMessage]);
        } catch {
        const errorMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
            "Sorry, I couldn't generate a response. Please try again.",
            createdAt: new Date(),
        };

        setMessages((previous) => [...previous, errorMessage]);
        } finally {
        setIsLoading(false);
        }
            }

    return(
        <section  className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col px-4 py-6">
                    {messages.length===0 ?(
                        // <div className="flex flex-1 items-center justify-center text-center">
                        //     <div className="text-5xl">☕</div>
                        //     <h1 className="text-2xl font-semibold">Welcome to ChaiCode Mentor AI</h1>
                        //     <p className="text-sm text-muted-foreground">
                        //         Ask me anything about JavaScript, React, Node.js,
                        //         system design, and more.
                        //     </p>
                        // </div>
                        <EmptyState/>
                    ):(
                        <div className="flex flex-col gap-4">
                            {messages.map((message)=>(
                                <MessageBubble
                                    key={message.id}
                                    message={message}
                                />
                            ))}

                            {/* {isLoading && (
                                <div className="text-sm text-muted-foreground">
                                    Thinking...
                                </div>
                            )} */}
                            {isLoading && <TypingIndicator/>}

                            <div ref={messageEndRef}/>
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t bg-background">
                <div className="mx-auto w-full max-w-3xl px-4 py-4">
                    <ChatInput
                        onSend={handleSendMessage}
                        disabled={isLoading}
                    />
                </div>
            </div>
        </section>
    )
}