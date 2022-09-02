import Nav from "../components/Nav";
import styles from "../styles/Layout.module.scss";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />

      {children}

      {/* <Footer /> */}
    </>
  );
};

export default Layout;
