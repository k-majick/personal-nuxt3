export const activeDialog = ref(0);
export const dialogType = ref("");

export const toggleDialog = (id: number, useLock = true, type = "") => {
  if (id !== activeDialog.value) {
    // open
    setTimeout(() => {
      activeDialog.value = id;
      dialogType.value = type ? type : "";
    }, 0);   

    if (useLock === true) {
      scrollLock();
    }
  } else {
    // close
    activeDialog.value = 0;
    dialogType.value = "";

    if (useLock === true) {
      scrollUnlock();
    }

    return false;
  }
};

export const isDialogOpen = (id: number) => activeDialog.value === id;

export const scrollLock = () => {
  const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
  const body = document.body;

  body.classList.add("locked");
  body.style.width = "100%";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}`;
};

export const scrollUnlock = () => {
  const scrollY = document.body.style.top;
  const body = document.body;
  
  body.classList.remove("locked");
  body.style.width = "100%";
  body.style.position = "";
  body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
};
