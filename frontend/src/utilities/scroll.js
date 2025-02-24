/**
 * Smoothly scrolls to a specified section of the page.
 * @param {string} id - The ID of the section to scroll to.
 */
export const scrollToSection = (id) => {
  // Get the DOM element by its ID
  const section = document.getElementById(id);
  
  // Scroll to the section with a smooth behavior
  section.scrollIntoView({ behavior: "smooth" });
};