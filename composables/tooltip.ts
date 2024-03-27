import { globalRefs } from '@/plugins/globalRefs';

interface IBinding {
  value?: string;
  expression?: string;
}

export const vTooltip = {
  created(el: HTMLElement, binding: IBinding) {
    setTimeout(() => {
      const bar = globalRefs.tooltip as HTMLElement;      
  
      if (!bar) {
        return;
      }

      el.addEventListener("mouseenter", () => {
        (bar as HTMLElement).innerHTML = binding.value as string;
        bar.innerHTML = binding.value as string;
        bar.classList.add("show");
      });

      el.addEventListener("mousemove", (e: MouseEvent) => {
        const barRect = bar.getBoundingClientRect();        
  
        if (e.pageX + barRect.width + 20 > window.innerWidth) {
          bar.style.top = `calc(${e.pageY}px + 10px)`;
          bar.style.left = `calc(${e.pageX}px - ${barRect.width}px - 20px)`;
        } else {
          bar.style.top = `calc(${e.pageY}px + 10px)`;
          bar.style.left = `calc(${e.pageX}px + 20px)`;
        }
      });
  
      el.addEventListener("mouseleave", () => {
        bar.classList.remove("show");
        (bar as HTMLElement).innerHTML = "";
      });
    }, 0);
  },

  updated(el: HTMLElement, binding: IBinding) {
    const bar = globalRefs.tooltip as HTMLElement;

    if (!bar) {
      return;
    }

    el.addEventListener("mouseenter", () => {
      (bar as HTMLElement).innerHTML = binding.value as string;
      bar.innerHTML = binding.value as string;
    });
  },
};