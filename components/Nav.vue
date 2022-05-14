<template>
<nav class="nav" :class="{ active: isActive }">
  <ul class="nav__items">
    <li class="nav__item" @click.stop.prevent="scrollTo($event, headerEl); gotoIntro()">
      <a href="" class="nav__link">Intro</a>
    </li>
  </ul>

  <ul class="nav__social">
    <li class="nav__socialItem">
      <a class="nav__socialLink" href="https://github.com/k-majick" target="_blank" v-hoverMessage="$t('messages.git')">
        <span v-html="iconGit"></span>
        <span class="tooltip"></span>
      </a>
    </li>
    <li class="nav__socialItem">
      <a class="nav__socialLink" href="https://www.linkedin.com/in/maciej-klimowicz" target="_blank" v-hoverMessage="$t('messages.linked')">
        <span v-html="iconLinkedin"></span>
        <span class="tooltip"></span>
      </a>
    </li>
  </ul>
</nav>
</template>

<script lang="ts">
import scrollTo from "@/composables/scrollTo";
import { hoverMessage } from '@/composables/hoverMessage.ts';
import iconLinkedin from '@/assets/gfx/icon-linkedin-min.svg?raw';
import iconGit from '@/assets/gfx/icon-git-min.svg?raw';

export default {
  layout: 'dark',
  directives: {
    hoverMessage,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const scrollTarget = inject('mainEl');
    const isActive = ref(false);
    const headerRef = inject('headerRef');
    const headerEl = toRaw(headerRef.value);
    const mainEl = inject('mainEl');

    const gotoSkills = () => {
      router.push({
        path: "/skills",
      });
    }

    const gotoIntro = () => {
      router.push({
        path: '/'
      });
    }

    const handleScroll = () => {
      if (scrollTarget.value.getBoundingClientRect().top < 100 && route.path === '/') {
        gotoSkills();
        isActive.value = true;
      } else if (scrollTarget.value.getBoundingClientRect().top < 100) {
        isActive.value = true;
      } else {
        isActive.value = false;
      }
    }

    window.addEventListener('scroll', handleScroll);

    return {
      isActive,
      iconGit,
      iconLinkedin,
      scrollTo,
      gotoIntro,
      headerEl,
      mainEl,
    }
  }
}
</script>

<style lang="scss">
@import "./assets/scss/components/_nav";
</style>
