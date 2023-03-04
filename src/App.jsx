import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { supabase } from "./config/supabase";

function App() {
  const checkConn = async () => {
    try {
      const { data, error } = await supabase.from("documents").select();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkConn();
  }, []);

  return <></>;
}

export default App;
