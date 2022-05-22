export default ($event: MouseEvent, target: HTMLElement) =>
  target.scrollIntoView({
    behavior: 'smooth',
  })
