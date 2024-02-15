import { useEffect } from 'react';

/* ------------------------------------------------------
 *  Author: Adam Sarty
 *  Student ID: B00794681
 *  T3 - CSCI4177
 * ------------------------------------------------------
 */

export const useContentLoader = () => {
  useEffect(() => {
    // Add the 'loaded' class after a delay
    const timer = setTimeout(() => {
      document.querySelector(".content").classList.add("loaded");
    }, 50);

    // Function to remove 'loaded' class
    const beforeUnloadHandler = () => {
      document.querySelector(".content").classList.remove("loaded");
    };

    // Listen to the 'beforeunload' event
    window.addEventListener("beforeunload", beforeUnloadHandler);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, []); // This effect runs only once on mount
};
