import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "../styles/navbar.module.css";

function Navbar() {
    return (
        <div className={styles.box}>
            <div className={styles.fs} >
                {/* Add Blog link */}
                <NavLink
                    to="/addBlog"
                    className={({ isActive }) =>
                        isActive ? styles.activeLink : styles.inactiveLink // Apply active or inactive class based on route
                    }
                >
                    Add Blog
                </NavLink>
            </div>
            <div className={styles.sc} >
                {/* All Blogs link */}
                <NavLink
                    to="/getBlog"
                    className={({ isActive }) =>
                        isActive ? styles.activeLink : styles.inactiveLink // Apply active or inactive class based on route
                    }
                >
                    All Blogs
                </NavLink>
            </div>
        </div>
    );
}

export default Navbar;
