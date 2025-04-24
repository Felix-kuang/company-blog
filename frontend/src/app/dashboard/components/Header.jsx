export default function Header({ username }) {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="hidden md:flex md:flex-1 md:items-center">
              <div className="relative max-w-xs w-full"></div>
            </div>
          </div>
          <span> Admin Dashboard </span>
          <div className="flex items-center space-x-4">
            <div className="border-l border-gray-200 h-8 mx-2"></div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                />
              </div>
              <div className="ml-3 hidden md:block">
                <div className="text-sm font-medium text-gray-800">
                  {username}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
