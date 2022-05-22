const activeModal = ref(0)

export const toggleModal = (id: number, lock: boolean) => {
  if (activeModal.value !== 0) {
    activeModal.value = 0

    if (lock === true) {
      scrollUnlock()
    }

    return false
  }

  activeModal.value = id

  if (lock === true) {
    scrollLock()
  }
}

export const openModal = (id: number) => {
  return activeModal.value === id
}

export const scrollLock = () => {
  const scrollY = document.documentElement.style.getPropertyValue('--scroll-y')
  const body = document.body

  body.classList.add('locked')
  body.style.width = '100%'
  body.style.position = 'fixed'
  body.style.top = `-${scrollY}`
}

export const scrollUnlock = () => {
  const scrollY = document.body.style.top
  const body = document.body

  body.classList.remove('locked')
  body.style.width = '100%'
  body.style.position = ''
  body.style.top = ''
  window.scrollTo(0, parseInt(scrollY || '0') * -1)
}
