import { useQuery } from '@tanstack/react-query';
import * as locationService from '../services/locationService';

export const useLocations = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['locations'],
    queryFn: locationService.getLocations,
    staleTime: 1000 * 60 * 5,
  });

  return { 
    locations: data || [], 
    loading: isLoading, 
    fetchLocations: refetch 
  };
};