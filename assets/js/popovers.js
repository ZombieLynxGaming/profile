// popovers.js
export function initializePopovers() {
  console.log('Initializing popovers');
  const popoverTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  popoverTriggerList.map((popoverTriggerEl) => {
      console.log(`Initializing popover for element: ${popoverTriggerEl}`);
      const popover = new bootstrap.Popover(popoverTriggerEl, {
          trigger: "hover", // Changed to hover
          placement: "bottom",
          offset: [0, 0], // No offset to avoid the arrow
          customClass: "no-arrow", // Custom class to remove arrow
      });

      return popover;
  });
}
