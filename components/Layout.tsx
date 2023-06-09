import React, { ReactNode } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import styles from "@/styles/Layout.module.scss";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className={styles.layout_wrapper}>
    <Header />
    <div className={styles.layout_container}>{props.children}</div>
    <Footer />
  </div>
);

export default Layout;
