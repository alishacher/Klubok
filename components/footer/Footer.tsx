import React from 'react';
import styles from "@/styles/Footer.module.scss";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer_container}>
          Created by <a href='https://github.com/alishacher'>alishacher</a>
        </footer>
    );
};

export default Footer;