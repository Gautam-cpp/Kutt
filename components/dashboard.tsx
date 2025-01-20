'use client';

import { DashboardInput } from "./dasboardInput";
import { UserDashboard } from "./userDashboard";
import { DemoDashboard } from "./demoDashboard";
import { useAuth } from "@/hooks/isAuth";
import { useEffect, useState } from "react";

export function Dashboard() {
  const { isAuth, checkAuth } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth);

  useEffect(() => {
    checkAuth(); 
    setIsAuthenticated(isAuth); 
    const interval = setInterval(() => {
      checkAuth();
      setIsAuthenticated(isAuth);
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuth]);

  return (
    <div>
      <div className="min-h-[100vh] w-full flex flex-grow-0 flex-shrink-0 basis-auto items-center flex-col">
        <DashboardInput />
        {isAuthenticated === false ? <DemoDashboard /> : <UserDashboard />}
      </div>
    </div>
  );
}
