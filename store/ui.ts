import { defineStore } from "pinia";

interface IDialog {
  uid: number;
  locked?: boolean;
}

interface IUiState {
  theme: string;
  locale: string;
  navActive: boolean;
  consent: string;
  scrollPos: number;
  activeDialogs: IDialog[];
}

export const useUiStore = defineStore({
  id: "ui-store",
  state: (): IUiState => ({
    theme: "lite",
    locale: "en",
    navActive: false,
    consent: "",
    scrollPos: 0,
    activeDialogs: [],
  }),
  actions: {
    setTheme(theme: string) {
      this.theme = theme;
    },
    setLocale(locale: string) {
      this.locale = locale;
    },
    sendEmail(fd: any) {
      try {
        const res = fetch("/.netlify/functions/server/sendEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fd),
        })
          .then(res => res.json())
          .then(data => data);

        return res;
      } catch (e) {
        console.error(e);
      }
    },
    async doConsentAction(action: string, consent?: string) {
      try {
        const res = await fetch(`/.netlify/functions/server/consent${action}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ consent }),
        });

        return res;
      } catch (e) {
        console.error(e);
      }
    },
    toggleDialog(uid: number, useLock = false, killOthers = false) {
      if (this.isDialogOpen(uid)) {
        this.closeDialog(uid);
      } else {
        this.openDialog(uid, useLock, killOthers);
      }
    },
    openDialog(uid: number, useLock: boolean, killOthers: boolean) {
      const newDialog = {
        uid,
        ...(useLock && { locked: true }),
      };
      if (killOthers) {
        this.activeDialogs = [];
      }
      setTimeout(() => {
        this.activeDialogs.push(newDialog);
        if (useLock) {
          scrollLock();
        }
      }, 0);
    },
    closeDialog(uid: number) {
      this.activeDialogs = this.activeDialogs.filter(
        (dialog: IDialog) => dialog.uid !== uid,
      );
      if (this.lockUsed) {
        return;
      }
      scrollUnlock();
    },
  },
  getters: {
    isDialogOpen: (state: IUiState) => (uid: number) =>
      state.activeDialogs.find((dialog: IDialog) => dialog.uid === uid),
    lockUsed: (state: IUiState) =>
      state.activeDialogs.some((dialog: IDialog) => dialog.locked),
  },
});

const body = typeof window !== "undefined" ? document.body : null;

const scrollLock = () => {
  if (!body) {
    return;
  }
  const scrollY =
    document.documentElement?.style.getPropertyValue("--scroll-y");
  if (body.classList.contains("locked")) {
    return;
  }
  body.classList.add("locked");
  body.style.overflowY = "scroll";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}`;
  body.style.width = "100%";
};

export const scrollUnlock = () => {
  if (!body) {
    return;
  }

  const posY = document.body.style.top;
  if (!posY && !body.classList.contains("locked")) {
    return;
  }
  body.classList.remove("locked");
  body.style.overflowY = "auto";
  body.style.position = "";
  body.style.top = "";
  body.style.width = "auto";
  window.scrollTo(0, parseInt(posY) * -1);
};
