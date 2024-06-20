import vSwipe from "@/directives/v-swipe";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("swipe", vSwipe);
});
