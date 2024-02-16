import { useEffect } from 'react';

/* ------------------------------------------------------
 *  Author: Adam Sarty
 *  Student ID: B00794681
 *  T4 - CSCI4177
 * ------------------------------------------------------
 *  Custom hook for managing content loading effects.
 */

export const useContentLoader = () => {
  useEffect(() => {
    // Adds 'loaded' class to '.content' after a delay for visual effect
    const timer = setTimeout(() => {
      document.querySelector(".content").classList.add("loaded");
    }, 50);

    // Removes 'loaded' class before page unload for cleanup
    const beforeUnloadHandler = () => {
      document.querySelector(".content").classList.remove("loaded");
    };

    // Attach event listener for page unload
    window.addEventListener("beforeunload", beforeUnloadHandler);

    // Cleanup by removing event listener and clearing timeout
    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, []); // Effect runs only once on mount
};
