import { useRef } from "react";

export const useCsvParser = () => {
  const parserRef = useRef<typeof import("csv-parse") | null>(null);

  return parserRef;
};
