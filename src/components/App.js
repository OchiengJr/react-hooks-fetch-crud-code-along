import React, { useState } from "react";
import ShoppingList from "./ShoppingList";
import Header from "./Header";

function App() {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <div className={`App ${theme}`}>
      <Header isDarkMode={theme === "dark"} onDarkModeClick={toggleTheme} />
      <ShoppingList />
    </div>
  );
}

export default App;
