// app/not-found.tsx
export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
        <p className="text-gray-600 mt-2">Sorry, we couldn’t find that page.</p>
        <a href="/" className="mt-4 text-blue-500 underline">
          Back to Home
        </a>
      </div>
    );
  }
  