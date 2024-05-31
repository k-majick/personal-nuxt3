interface HTMLElementExtended extends HTMLElement {
  clickOutsideEvent: (event: Event) => void;
}

export const vClickOutside = {
  beforeMount(
    el: HTMLElementExtended,
    binding: { value: (event: Event) => boolean; arg: any },
  ) {
    el.clickOutsideEvent = (event: Event) => {
      if (binding.arg && (event.target as Element).closest(`.${binding.arg}`)) {
        return;
      }

      const classNames = Array.from((event.target as Element).classList);
      const childClassNames = Array.from(el.children).flatMap(child =>
        Array.from(child.classList),
      );

      if (
        !(
          el === event.target ||
          el.contains(event.target as Element) ||
          classNames.some(className => childClassNames.includes(className))
        )
      ) {
        binding.value(event);
      }
    };

    document.addEventListener("click", el.clickOutsideEvent);
  },

  unmounted(el: HTMLElementExtended) {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};
