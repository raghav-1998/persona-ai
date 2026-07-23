export default function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-2 text-sm text-muted-foreground"
      aria-live="polite"
      aria-label="Assistant is typing"
    >
      <span>Thinking</span>

      <span className="flex gap-1" aria-hidden="true">
        <span className="animate-bounce [animation-delay:-0.3s]">
          .
        </span>

        <span className="animate-bounce [animation-delay:-0.15s]">
          .
        </span>

        <span className="animate-bounce">.</span>
      </span>
    </div>
  );
}