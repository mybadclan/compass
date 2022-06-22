import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";

export function useDirection() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(1000);

    const sub = Accelerometer.addListener((result) => setData(result));

    return () => sub.remove();
  }, []);

  const x = Math.round(data.x);
  const y = Math.round(data.y);

  return y === 1 ? 'portrait' : x === 1 ? 'landscape' : 'none';
}