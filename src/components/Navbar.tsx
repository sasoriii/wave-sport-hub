import { Link } from "react-router-dom";

const Navbar = () => {
  const menuItems = ["Accueil", "Kitesurf", "Wingfoil", "Efoil"];

  return (
    <nav className="bg-black p-4 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <ul className="flex justify-center space-x-8">
          {menuItems.map((item) => (
            <li key={item}>
              <Link
                to="/"
                className="text-white hover:text-blue-300 transition-colors duration-200 text-lg font-medium"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;