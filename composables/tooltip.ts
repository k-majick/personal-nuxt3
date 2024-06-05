import { globalRefs } from "@/plugins/globalRefs";

interface IBinding {
  value?: string;
  expression?: string;
}

export const vTooltip = {
  created(el: HTMLElement, binding: IBinding) {
    const getTooltip = () => {
      const tooltipEl = globalRefs.tooltipEl as HTMLElement;

      tooltipEl ? onCreated(tooltipEl) : setTimeout(() => getTooltip(), 200);
    };

    const onCreated = (tooltipEl: HTMLElement) => {
      el.addEventListener("mouseenter", () => {
        (tooltipEl as HTMLElement).innerHTML = binding.value as string;
        tooltipEl.innerHTML = binding.value as string;
        tooltipEl.classList.add("show");
      });

      el.addEventListener("mousemove", (e: MouseEvent) => {
        const tooltipElRect = tooltipEl.getBoundingClientRect();

        if (e.pageX + tooltipElRect.width + 20 > window.innerWidth) {
          tooltipEl.style.top = `calc(${e.pageY}px + 10px)`;
          tooltipEl.style.left = `calc(${e.pageX}px - ${tooltipElRect.width}px - 20px)`;
        } else {
          tooltipEl.style.top = `calc(${e.pageY}px + 10px)`;
          tooltipEl.style.left = `calc(${e.pageX}px + 20px)`;
        }
      });

      el.addEventListener("mouseleave", () => {
        tooltipEl.classList.remove("show");
        (tooltipEl as HTMLElement).innerHTML = "";
      });
    };

    getTooltip();
  },

  updated(el: HTMLElement, binding: IBinding) {
    const tooltipEl = globalRefs.tooltipEl as HTMLElement;

    if (!tooltipEl) {
      return;
    }

    el.addEventListener("mouseenter", () => {
      (tooltipEl as HTMLElement).innerHTML = binding.value as string;
      tooltipEl.innerHTML = binding.value as string;
    });
  },
};
