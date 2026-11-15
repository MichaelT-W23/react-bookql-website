import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { parse } from "jsonc-parser";
import sidebarRawData from "./sidebarData.jsonc?raw";
import SearchView from "./SearchView";
import styles from "../styles/components/MobileNavBar.module.css";

const sidebarData = parse(sidebarRawData);

const getRouteItemName = (pathname) => {
  const item = sidebarData.SidebarItems.find(i => i.route === pathname);
  return item ? item.name : null;
};

const MobileNavBar = () => {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setSelectedItem(getRouteItemName(location.pathname));
    setShowSearch(false);
  }, [location.pathname]);

  const handleSearchClick = () => {
    if (showSearch) {
      handleCloseSearch();
      return;
    }
    setSelectedItem("Search");
    setShowSearch(true);
  };

  const handleNavClick = (item) => {
    setSelectedItem(item.name);
    setShowSearch(false);
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
    setSelectedItem(getRouteItemName(location.pathname));
  };

  return (
    <>
      <div className={`${styles["search-overlay"]} ${showSearch ? styles["search-open"] : ""}`}>
        {showSearch && <SearchView onClose={handleCloseSearch} />}
      </div>

      <nav className={styles["mobile-nav"]}>
        <ul>
          {sidebarData.SidebarItems.map((item, index) => {
            const isActive = item.name === selectedItem;
            const icon = (
              <span className="material-symbols-outlined">{item.icon}</span>
            );

            return (
              <li key={index}>
                {item.name === "Search" ? (
                  <button
                    type="button"
                    aria-label="Search"
                    className={`${styles["nav-link"]} 
                                ${isActive ? styles["active-item"] : ""} 
                                ${showSearch ? styles["active-search"] : ""}`}
                    onClick={handleSearchClick}
                  >
                    {icon}
                  </button>
                ) : (
                  <Link
                    to={item.route || "#"}
                    aria-label={item.name}
                    className={`${styles["nav-link"]} ${isActive ? styles["active-item"] : ""}`}
                    onClick={() => handleNavClick(item)}
                  >
                    {icon}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default MobileNavBar;