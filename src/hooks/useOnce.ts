import { useEffect, useRef, useState } from "react";

export const useOncePreMount = (func: () => void) => {
    useState(func);
    // const [v] = useState(func);
    // return v;
};

export const useOncePostMount = (func: () => void) => {
  const loadDataOnlyOnce = useRef(func);

  useEffect(() => {
    loadDataOnlyOnce.current();
  }, []);
};
