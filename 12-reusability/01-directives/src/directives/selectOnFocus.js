export const selectOnFocus = {
  // created() {},

  // beforeMount() {},

  mounted(el, { instance, value, oldValue, arg, modifiers, dir }, vnode, oldVNode) {
    const [start, end] = value ?? [0, -1];

    // Обработчик события требуется где-то хранить. Удобно в самом дом узле.
    el._selectOnFocusHandler = ($event) => {
      $event.currentTarget.setSelectionRange(start, end);
    };

    el.addEventListener('focus', el._selectOnFocusHandler);
  },

  // beforeUpdate() {},

  // updated() {},

  // Вручную установленные обработчики событий удаляем самостоятельно
  unmounted(el) {
    el.removeEventListener('focus', el._selectOnFocusHandler);
  },
};
