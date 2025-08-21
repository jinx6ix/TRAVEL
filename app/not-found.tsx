// app/not-found.tsx
export default function NotFound() {
    return (
      <main className="flex h-screen flex-col items-center justify-center text-center p-6">
        <h1 className="text-5xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
        >
          Back to Home
        </a>
      </main>
    )
  }
  