import { useState, useEffect } from 'react';
import * as locationService from '../services/locationService';

export const useLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    setLoading(true);
    const data = await locationService.getLocations();
    setLocations(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return { locations, fetchLocations, loading };
};
