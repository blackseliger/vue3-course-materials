import { nextTick, ref } from 'vue';

export function useFetch(fetcher) {
  const isLoading = ref(true);
  const data = ref(null);
  const error = ref(null);
  let promise = null;
  const suspense = async () => {
    await promise;
    await nextTick();
  };

  const refetch = async () => {
    isLoading.value = true;
    try {
      promise = fetcher();
      data.value = await promise;
    } catch (e) {
      error.value = e;
    }
    isLoading.value = false;
  };

  refetch();

  return {
    isLoading,
    data,
    error,
    refetch,
    suspense,
  };
}
