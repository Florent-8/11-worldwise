import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <div className={styles.sidebarContent}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default Sidebar;
