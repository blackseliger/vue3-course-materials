<template>
  <Suspense>
    <template #default>
      <PageMeetups />
    </template>

    <template #fallback>
      <UiAlert>Загрузка...</UiAlert>
    </template>
  </Suspense>
</template>

<script>
import PageMeetups from './components/PageMeetups.vue';
import UiAlert from './components/UiAlert.vue';

export default {
  name: 'App',

  components: {
    PageMeetups,
    UiAlert,
  },
};
</script>

<style>
@import './assets/styles/_fonts.css';
@import './assets/styles/_variables.css';
@import './assets/styles/_common.css';
</style>
