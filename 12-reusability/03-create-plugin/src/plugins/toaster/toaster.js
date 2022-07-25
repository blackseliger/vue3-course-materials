import { createApp } from 'vue';
import TheToaster from './TheToaster.vue';

export const TOASTER_KEY = Symbol('TOASTER_KEY');

export function createToaster({ container } = {}) {
  let containerToMount = container;
  if (!containerToMount) {
    containerToMount = document.createElement('div');
    document.body.appendChild(containerToMount);
  }

  const toasterInstance = createApp(TheToaster).mount(containerToMount);

  const toaster = {
    toast(message) {
      toasterInstance.toast(message);
    },

    install(app) {
      app.provide(TOASTER_KEY, toaster);
      // Для простой миграции с Vue 2
      app.config.globalProperties.$toaster = toaster;
      // Вдруг пригодится монтировать свой тостер
      app.component('TheToaster', TheToaster);
      // Для примера
      app.mixin({
        methods: {
          $toast: toaster.toast,
        },
      });
    },
  };

  return toaster;
}
