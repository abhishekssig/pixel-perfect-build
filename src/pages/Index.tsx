import { useState, useCallback } from "react";
import SplashScreen from "@/components/SplashScreen";

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashComplete = useCallback(() => setSplashDone(true), []);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Welcome</h1>
        </div>
      </div>
    </>
  );
};

export default Index;
