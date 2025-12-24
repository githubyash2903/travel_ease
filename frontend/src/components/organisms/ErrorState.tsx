// components/state/ErrorState.tsx
export function ErrorState({ message }: { message: string }) {
  return (
    <div className="py-20 text-center text-destructive">
      {message}
    </div>
  );
}
