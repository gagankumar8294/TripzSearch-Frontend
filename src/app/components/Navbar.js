import styles from "./Navabr.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/" className={styles.adminBtn}>
          TripzSearch
        </Link>
      </div>

      <div className={styles.menu}>
        <Link href="/admin/login" className={styles.adminBtn}>
          Admin Login
        </Link>
      </div>


    </nav>
  );
}
