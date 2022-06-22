import { Magnetometer, ThreeAxisMeasurement } from "expo-sensors";
import { useEffect, useState } from "react";

const directions = [
  [(degree: number) => degree >= 22.5 && degree < 67.5, 'NE'],
  [(degree: number) => degree >= 67.5 && degree < 112.5, 'L'],
  [(degree: number) => degree >= 112.5 && degree < 157.5, 'SE'],
  [(degree: number) => degree >= 157.5 && degree < 202.5, 'S'],
  [(degree: number) => degree >= 202.5 && degree < 247.5, 'SO'],
  [(degree: number) => degree >= 247.5 && degree < 292.5, 'O'],
  [(degree: number) => degree >= 292.5 && degree < 337.5, 'NO'],
  [(degree: number) => true, 'N'],
] as [(value: number) => boolean, string][];

const getDirection = (degree: number) => {
  const value = directions.reduce((acc, cur) => {
    if (acc !== '') return acc;

    const [fn, direction] = cur;
    if (fn(degree)) return direction;

    return '';
  }, '');

  return value;
}

const getAngle = (data: ThreeAxisMeasurement) => {
  const { x, y } = data;

  const tg = Math.atan2(y, x);

  const angle =
    tg >= 0 ? tg * (180 / Math.PI) : (tg + 2 * Math.PI) * (180 / Math.PI);

  return Math.round(angle);
};

const getDegree = (data: number) => {
  return data - 90 >= 0 ? data - 90 : data + 271;
}

export function useCompass() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    Magnetometer.setUpdateInterval(500);

    const sub = Magnetometer.addListener(result => setAngle(getAngle(result)));

    return () => sub.remove();
  }, []);

  const degree = getDegree(angle);
  const direction = getDirection(degree);

  return { degree, direction };
}

export const CompassDirection: Record<string, string> = {
  'NE': 'Nordeste',
  'L': 'Leste',
  'SE': 'Sudeste',
  'S': 'Sul',
  'SO': 'Sudoeste',
  'O': 'Oeste',
  'NO': 'Noroeste',
  'N': 'Norte'
}
