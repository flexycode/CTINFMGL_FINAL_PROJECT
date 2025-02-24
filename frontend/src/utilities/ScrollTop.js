import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // Get the current pathname from the location object
  const { pathname } = useLocation();

  // Effect that runs when the pathname changes
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, [pathname]); // Dependency array includes pathname to trigger effect on route change

  return null; // This component does not render anything
}