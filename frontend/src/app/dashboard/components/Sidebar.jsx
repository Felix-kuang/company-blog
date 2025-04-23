import Link from "next/link";

export default function Sidebar({ setActiveTab }) {
  const menus = [
    {
      name: "Company Data",
      tabName: "companyData",
      href: "/dashboard/company-data",
      icon: "",
    },
    {
      name: "Blogs",
      tabName: "blogs",
      href: "/dashboard/blogs",
      icon: "",
    },
    {
      name: "Testimonies",
      tabName: "testimonies",
      href: "/dashboard/testimonies",
      icon: "",
    },
    {
      name: "FAQ",
      tabName: "faq",
      href: "/dashboard/faq",
      icon: "",
    },
    {
      name: "Services",
      tabName: "services",
      href: "/dashboard/services",
      icon: "",
    },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-6">
      <h2 className="text-xl mb-6">Admin Dashboard</h2>
      <ul>
        {menus.map((menu) => {
          return (
            <li>
              <Link
                href={menu.href}
                className="block py-2"
                onClick={() => setActiveTab(menu.tabName)}
              >
                {menu.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
