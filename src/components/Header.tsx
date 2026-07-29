"use client"

import { useTheme } from "next-themes"
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header(){
    const {theme, setTheme}=useTheme();
    const [mounted, setMounted]=useState(false)

    useEffect(()=>{
        setMounted(true)
    },[])

    return(
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
                <div>
                    <h1 className="text-xl font-bold">☕ ChaiCode Mentor AI</h1>
                    <p className="text-xs text-muted-foreground">
                        Learn by building projects
                    </p>
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    {/* {theme==="dark" ?(
                        <Sun className="h-5 w-5"/>
                    ):(
                        <Moon className="h-5 w-5"/>
                    )} */}

                    {mounted ? (
                        theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )
                    ) : (
                        <div className="h-5 w-5" />
                    )}
                </Button>
            </div>
        </header>
    )
}