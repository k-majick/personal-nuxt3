export default ($event: MouseEvent, target: HTMLElement | undefined) => {
  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior: 'smooth',
  });
};
