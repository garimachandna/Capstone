import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div className="layout">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <div id="container">
        <main>
          <Toaster />
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "CID",
  description: "MERN Stack project",
  keywords: "mern, react, node, mongodb",
  author: "CPG 162",
};

export default Layout;
