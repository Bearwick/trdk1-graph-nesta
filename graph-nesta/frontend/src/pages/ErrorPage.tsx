import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";


function ErrorPage() {
    return (
      <div className="text-center flex flex-col bg-background">
          <Header />
          <header className="h-[82.5vh] flex flex-col items-center justify-center">
              <h1 className="text-9xl font-bold">404</h1>
              <p>Page not found</p>
          </header>
          <Footer />
      </div>
    )
  }
  
  export default ErrorPage;