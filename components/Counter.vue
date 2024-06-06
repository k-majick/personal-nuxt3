<template>
  <div class="main__content">
    <div class="counter">
      <span v-if="counter('y')">
        <span class="counter__value">{{ counter("y") }}</span
        >&nbsp;<span v-if="counter('y') === 1">{{ $t("ui.year") }}</span
        ><span v-else>
          {{
            counter("y") > 1 && counter("y") < 5
              ? $t("ui.years2")
              : $t("ui.years")
          }}
        </span>
      </span>
      <span v-if="counter('y') && counter('m')">
        &nbsp;{{ $t("ui.and") }}&nbsp;
      </span>
      <span v-if="counter('m')">
        <span class="counter__value">{{ counter("m") }}</span
        >&nbsp;<span v-if="counter('m') && counter('m') === 1">{{
          $t("ui.month")
        }}</span>
        <span v-else>
          {{
            counter("m") > 1 && counter("m") < 5
              ? $t("ui.months2")
              : $t("ui.months")
          }}
        </span>
      </span>
    </div>
    <p>{{ $t("ui.ofExperience") }}</p>
  </div>
</template>

<script lang="ts" setup>
const counter = (what: string) => {
  const now = new Date().valueOf();
  const countFrom = new Date("sep,01,2015,00:00:00").valueOf();
  const diff = now - countFrom;
  const day = 1000 * 60 * 60 * 24;
  const days = Math.floor(diff / day);
  const months = Math.floor(days / 31);
  const years = Math.floor(months / 12);
  const diffMonths = Math.floor(months % 12) + 1;

  switch (true) {
    case what == "y":
      return years;
    case what == "m":
      return diffMonths;
    default:
      return 0;
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/scss/components/counter";
</style>
