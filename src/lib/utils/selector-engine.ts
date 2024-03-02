const SelectorEngine = {
  focusableChildren(element: HTMLElement) {
    return element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  },
};

export default SelectorEngine;
