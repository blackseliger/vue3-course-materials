import { fetchMeetups } from '../api';
import { useFetch } from './useFetch';

export function useMeetupsFetch() {
  const { isLoading, error, data: meetups, refetch, suspense } = useFetch(fetchMeetups);

  return { meetups, isLoading, error, refetch, suspense };
}
