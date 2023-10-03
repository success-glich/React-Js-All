import { useState, useEffect } from "react";
import "./App.css";
import useTheme, { ThemeProvider } from "./context/theme";
import { ThemeBtn, Cart } from "./component";

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const lightTheme = () => {
    setThemeMode("light");
  };
  const darkTheme = () => {
    setThemeMode("dark");
  };

  //actual change in theme
  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <div className="flex flex-wrap min-h-screen items-center justify-center ">
        <div className="h-auto">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4"></div>
          {/* theme Btn */}
          <ThemeBtn />

          <div className="w-full max-w-sm mx-auto"></div>
          {/* Cart */}
          <Cart />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
