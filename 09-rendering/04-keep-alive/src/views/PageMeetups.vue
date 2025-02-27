<template>
  <ui-container>
    <div class="filters-panel">
      <div class="filters-panel__col">
        <ui-radio-group v-model="filter.date" :options="$options.dateFilterOptions" name="date" />
      </div>

      <div class="filters-panel__col">
        <div class="form-group form-group_inline">
          <div class="input-group input-group_icon input-group_icon-left">
            <div class="input-group__icon">
              <ui-icon icon="search" />
            </div>

            <input
              v-model.trim="filter.search"
              class="form-control form-control_rounded form-control_sm"
              placeholder="Поиск"
              type="search"
            />
          </div>
        </div>
        <div class="form-group form-group_inline">
          <ui-button-group v-model:view="view" />
        </div>
      </div>
    </div>

    <template v-if="meetups">
      <keep-alive v-if="filteredMeetups.length" include="MeetupsCalendar">
        <component :is="viewComponent" :meetups="filteredMeetups" />
      </keep-alive>
      <ui-alert v-else>Митапов по заданным условиям не найдено...</ui-alert>
    </template>
    <ui-alert v-else>Загрузка...</ui-alert>
  </ui-container>
</template>

<script>
import MeetupsList from '../components/MeetupsList.vue';
import MeetupsCalendar from '../components/MeetupsCalendar.vue';
import UiRadioGroup from '../components/UiRadioGroup.vue';
import UiButtonGroup from '../components/UiButtonGroup.vue';
import UiContainer from '../components/UiContainer.vue';
import UiAlert from '../components/UiAlert.vue';
import UiIcon from '../components/UiIcon.vue';
import { fetchMeetups } from '../api.js';

export default {
  name: 'PageMeetups',

  dateFilterOptions: [
    { text: 'Все', value: 'all' },
    { text: 'Прошедшие', value: 'past' },
    { text: 'Ожидаемые', value: 'future' },
  ],

  components: {
    UiIcon,
    UiRadioGroup,
    UiButtonGroup,
    UiContainer,
    UiAlert,
  },

  data() {
    return {
      meetups: null,

      filter: {
        date: 'all',
        participation: 'all',
        search: '',
      },

      view: 'list',
    };
  },

  computed: {
    filteredMeetups() {
      if (!this.meetups) {
        return null;
      }

      const dateFilter = (meetup) =>
        this.filter.date === 'all' ||
        (this.filter.date === 'past' && new Date(meetup.date) <= new Date()) ||
        (this.filter.date === 'future' && new Date(meetup.date) > new Date());

      const participationFilter = (meetup) =>
        this.filter.participation === 'all' ||
        (this.filter.participation === 'organizing' && meetup.organizing) ||
        (this.filter.participation === 'attending' && meetup.attending);

      const searchFilter = (meetup) =>
        [meetup.title, meetup.description, meetup.place, meetup.organizer]
          .join(' ')
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());

      return this.meetups.filter((meetup) => dateFilter(meetup) && participationFilter(meetup) && searchFilter(meetup));
    },

    viewComponent() {
      const viewToComponents = {
        list: MeetupsList,
        calendar: MeetupsCalendar,
      };
      return viewToComponents[this.view];
    },
  },

  mounted() {
    fetchMeetups().then((meetups) => {
      this.meetups = meetups;
    });
  },
};
</script>

<style scoped>
.filters-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 32px 0;
}

.filters-panel__col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

@media all and (max-width: 767px) {
  .filters-panel {
    flex-direction: column;
  }

  .filters-panel__col + .filters-panel__col {
    margin-top: 16px;
  }
}
</style>
