import { ref, watch } from '../vendor/vue.esm-browser.js';

const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export function useLocalProp(props, name, emit) {
  const localProp = ref(null);

  watch(
    props[name],
    () => {
      if (!deepEqual(props[name], localProp.value)) {
        localProp.value = deepClone(props[name]);
      }
    },
    { immediate: true, deep: true },
  );

  watch(
    localProp,
    () => {
      emit(`update:${name}`, deepClone(localProp.value));
    },
    { immediate: true, deep: true },
  );

  return { localProp };
}
