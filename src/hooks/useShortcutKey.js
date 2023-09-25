import { useEffect, useRef } from "react";

export const useShortcutKey = (keyboardKey) => {
  const inputRef = useRef(null);

  useEffect(() => {
    // DOM only keyboard event
    const handler = (e) => {
      if (e.metaKey && e.key === keyboardKey) {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [inputRef, keyboardKey]);

  return { inputRef };
};
