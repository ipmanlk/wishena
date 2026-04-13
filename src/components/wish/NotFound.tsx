"use client";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Wish not found</h2>
        <p className="text-sm text-gray-500">
          This wish doesn't seem to exist in your browser storage.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
