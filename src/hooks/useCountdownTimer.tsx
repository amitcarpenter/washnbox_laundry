import { useState, useEffect } from "react";
import { AppState } from "react-native";

const useCountdownTimer = (initialSeconds: number = 59,resetKey:number) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [appState, setAppState] = useState(AppState.currentState);
  // const [reset,setReset] = useState(resetKey)


  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [resetKey]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const startTime = Date.now();
    const endTime = startTime + initialSeconds * 1000;

    const updateTimer = () => {
      const currentTime = Date.now();
      const remainingTime = Math.max(0, Math.round((endTime - currentTime) / 1000));
      setSecondsLeft(remainingTime);

      if (remainingTime === 0) {
        clearInterval(timer);
      }
    };

    timer = setInterval(updateTimer, 1000);
    updateTimer(); // Initial update

    const handleAppStateChange = (nextAppState: string) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        updateTimer(); // Recalculate time left
      }
      setAppState(nextAppState);
    };

    // ✅ Correct way to add an event listener
    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      clearInterval(timer);
      subscription.remove(); // ✅ Correct way to remove the listener
    };
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return formatTime(secondsLeft);
};

export default useCountdownTimer;
