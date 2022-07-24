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
      bar.style.top = `calc(${e.offsetY}px + 20px)`
      bar.style.left = `calc(${e.offsetX}px + 20px)`
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
