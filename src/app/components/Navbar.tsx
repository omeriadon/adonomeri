export default function Navbar() {
  return (
    <div className="fixed top-4 left-4 right-4 z-50">
      <nav className="p-4 bg-gray-900/80 shadow-lg rounded-lg border border-gray-800 backdrop-blur-md text-gray-100">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Logo</h1>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-blue-600">Home</a>
              <a href="#" className="hover:text-blue-600">About</a>
              <a href="#" className="hover:text-blue-600">Services</a>
              <a href="#" className="hover:text-blue-600">Products</a>
              <a href="#" className="hover:text-blue-600">Contact</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-4">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800">Sign In</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Sign Up
              </button>
            </div>
            
            {/* Mobile menu button */}
            <button className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu (hidden by default) */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">Home</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">About</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">Services</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">Products</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100">Contact</a>
          </div>
        </div>
      </nav>
    </div>
  );
}
