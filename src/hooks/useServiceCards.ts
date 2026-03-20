import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface ServiceCard {
  id: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  icon_name: string;
  color: string;
  featured: boolean;
  display_order: number;
  updated_at: string;
  created_at: string;
}

export function useServiceCards() {
  const [services, setServices] = useState<ServiceCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('service_cards')
        .select('*')
        .order('display_order', { ascending: true });

      if (fetchError) throw fetchError;

      if (data) {
        setServices(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch service cards');
      console.error('Error fetching service cards:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (id: string, updates: Partial<ServiceCard>) => {
    try {
      const { error: updateError } = await supabase
        .from('service_cards')
        .update(updates)
        .eq('id', id);

      if (updateError) throw updateError;

      await fetchServices();
      return { success: true };
    } catch (err) {
      console.error('Error updating service card:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update service card' };
    }
  };

  const createService = async (service: Omit<ServiceCard, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error: insertError } = await supabase
        .from('service_cards')
        .insert([service]);

      if (insertError) throw insertError;

      await fetchServices();
      return { success: true };
    } catch (err) {
      console.error('Error creating service card:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to create service card' };
    }
  };

  const deleteService = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('service_cards')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      await fetchServices();
      return { success: true };
    } catch (err) {
      console.error('Error deleting service card:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to delete service card' };
    }
  };

  return {
    services,
    loading,
    error,
    updateService,
    createService,
    deleteService,
    refetch: fetchServices,
  };
}
