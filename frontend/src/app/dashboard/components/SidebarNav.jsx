import Link from "next/link";

export default function SidebarNav({
  menus,
  pathname,
  setOpen,
}) {
  return (
    <nav className="px-4 py-6">
      <ul className="space-y-1">
        {menus.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name} className="relative">
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-r-md" />
              )}
              <Link
                href={item.href}
                onClick={() => {
                  setOpen(false);
                }}
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-150
                ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }
                active:scale-[0.97]
              `}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
