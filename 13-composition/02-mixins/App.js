import { defineComponent } from './vendor/vue.esm-browser.js';
import UserForm from './UserForm.js';

export default defineComponent({
  components: { UserForm },

  data() {
    return {
      date: new Date().getTime(),
      user: {
        firstName: 'firstName',
        lastName: 'lastName',
      },
    };
  },

  template: `
    <div>
      <p>Current time: <time :datetime="formatAsIsoDate(date)">{{ formatAsLocalDate(date) }}</time></p>
      <hr>
      <user-form v-model:user="user" />
      <hr>
      <pre>{{ user }}</pre>
    </div>`,
});
