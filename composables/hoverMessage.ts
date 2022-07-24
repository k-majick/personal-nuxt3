interface Binding extends Object {
  value?: string
  expression?: string
}

export const hoverMessage = {
  created(el: HTMLElement, binding: Binding) {
    const message = binding.value
    const bar = Array.from(el.children as HTMLCollectionOf<HTMLElement>).find(
      child => child.classList.contains('tooltip'),
    )

    if (!bar) {
      return
    }

    bar.innerHTML = message as string

    el.addEventListener('mouseenter', () => {
      bar.classList.add('show')
    })

    el.addEventListener('mousemove', (e: MouseEvent) => {
      const barRect = bar.getBoundingClientRect()

      if (e.screenX + barRect.width + 20 > window.innerWidth) {
        bar.style.top = `calc(${e.offsetY}px + 15px)`
        bar.style.left = `calc(${e.offsetX}px - ${barRect.width}px - 15px)`
      } else {
        bar.style.top = `calc(${e.offsetY}px + 15px)`
        bar.style.left = `calc(${e.offsetX}px + 15px)`
      }
    })

    el.addEventListener('mouseleave', () => {
      bar.classList.remove('show')
    })
  },
  updated(el: HTMLElement, binding: Binding) {
    const message = binding.value
    const bar = Array.from(el.children as HTMLCollectionOf<HTMLElement>).find(
      child => child.classList.contains('tooltip'),
    )

    if (!bar) {
      return
    }

    bar.innerHTML = message as string
  },
}
