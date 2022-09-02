import Nav from "../components/Nav";

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
