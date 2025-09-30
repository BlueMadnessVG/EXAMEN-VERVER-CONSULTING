import { useEffect, useState } from "react";

interface props {
  query: string;
}

/**
 * Custom hook that tracks whether a CSS media query matches the current viewport.
 * Automatically updates when the viewport changes or the query updates.
 *
 * @param {Object} props - Hook configuration
 * @param {string} props.query - CSS media query string (e.g., "(min-width: 768px)")
 * @returns {boolean} True if the media query matches, false otherwise
 *
 * @example
 * const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
 * const isDarkMode = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
 */
export const useMediaQuery = ({ query }: props) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};
