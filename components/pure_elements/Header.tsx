import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="header-wrapper">
      <ul className={isOpen ? "nav-open" : ""}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/resort">Resort</Link>
        </li>
      </ul>
      <div className="navbar-toggler">
        <button onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu />
        </button>
      </div>
    </div>
  );
};

export default Header;
