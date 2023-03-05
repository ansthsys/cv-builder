import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";

function DashboardPage() {
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

  return <button onClick={logout}>Logout</button>;
}

export default DashboardPage;
