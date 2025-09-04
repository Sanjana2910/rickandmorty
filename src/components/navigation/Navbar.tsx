import { NavLink } from "react-router-dom";

export  default function Navbar() {
  const navItems = [
    { to: "/characters", label: "Characters" },
    { to: "/episodes", label: "Episodes" },
    { to: "/locations", label: "Locations" },
  ];

  return (
    <nav className="w-full bg-gray-100 shadow-md">
      <div className="max-w-5xl mx-auto flex">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex-1 text-center font-semibold px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-gray-300 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
