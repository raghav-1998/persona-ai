import Header from "@/components/Header"
import { Card } from "@/components/ui/card"
import MessageBubble from "@/components/chat/MessageBubble"


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* <div className="mx-auto max-w-5xl px-4 py-8">
          <Card className="p-8 text-center">
            <h2 className="text-3xl font-bold">Welcome to ChaiCode Mentor AI</h2>
            <p className="mt-4 text-muted-foreground">
              A persona-based AI assistant inspired by public educational content.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Card className="p-4">
                <h3 className="font-semibold">React</h3>
                <p className="text-sm text-muted-foreground">
                  Components, hooks, state management
                </p>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold">Node.js</h3>
                <p className="text-sm text-muted-foreground">
                  APIs, Express, backend development
                </p>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold">System Design</h3>
                <p className="text-sm text-muted-foreground">
                  Scalable architecture concepts
                </p>
              </Card>
            </div>
          </Card>
        </div> */}

          {/* <MessageBubble
          message={{
            id: "1",
            role: "assistant",
            content:
              "## Welcome ☕\n\nLet's learn React step by step.\n\n```tsx\nconst name = 'Chai';\n```",
            createdAt: new Date(),
          }}
        /> */}

        <MessageBubble
          message={{
            id: "1",
            role: "assistant",
            content: `## JavaScript Example

          Here is a simple JavaScript example:

          \`\`\`javascript
          const name = "Hitesh";

          console.log(name);
          \`\`\`

          You can also use inline code like \`console.log()\`.
          `,
          createdAt: new Date(),
          }}
        />

        <MessageBubble
          message={{
            id: "2",
            role: "user",
            content: "Explain React Hooks.",
            createdAt: new Date(),
          }}
        />
      </main>

      <footer className="border-t py-4">
        <div className="mx-auto max-w-5xl px-4 text-center text-xs text-muted-foreground">
          This is an AI assistant inspired by publicly available educational content.
          It is not affiliated with or endorsed by the original creator.
        </div>
      </footer>
    </div>
  )
}