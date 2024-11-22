import Link from 'next/link';

export default function NotFound() {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">
            404 - Page Not Found
          </h2>
          <p className="text-gray-400 mb-4">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg
                     hover:bg-blue-500/20 transition-all duration-200"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }