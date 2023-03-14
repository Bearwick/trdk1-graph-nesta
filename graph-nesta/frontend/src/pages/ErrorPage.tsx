import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";


function ErrorPage() {
    return (
      <div className="App">
          <Header />
          <header className="ErrorPage-header pb-20">
              <h1 className="text-9xl font-bold mt-[-100px]">404</h1>
              <p>Page not found</p>
          </header>
          <Footer />
      </div>
    )
  }
  
  export default ErrorPage;