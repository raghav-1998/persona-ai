export default function EmptyState() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-4">
        <div className="text-5xl" aria-hidden="true">
          ☕
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome to ChaiCode Mentor AI
        </h1>

        <p className="text-sm leading-6 text-muted-foreground">
          Ask me anything about JavaScript, React, Node.js,
          system design, and more.
        </p>

        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {[
            "JavaScript",
            "React",
            "Node.js",
            "System Design",
          ].map((topic) => (
            <span
              key={topic}
              className="rounded-full border px-3 py-1 text-xs text-muted-foreground"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}