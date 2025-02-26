import React, { useState, useEffect } from "react";
import { View, Text, AppState, StyleSheet } from "react-native";

const useCountdownTimer = (initialSeconds: number = 59) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const startTimer = () => {
      if (!timer) {
        timer = setInterval(() => {
          setSecondsLeft((prevTime) => {
            if (prevTime <= 0) {
              clearInterval(timer!);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
      }
    };

    const handleAppStateChange = (nextAppState: string) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        startTimer();
      }
      setAppState(nextAppState);
    };

    AppState.addEventListener("change", handleAppStateChange);
    startTimer();

    return () => {
      if (timer) clearInterval(timer);
      AppState.removeEventListener("change", handleAppStateChange);
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
