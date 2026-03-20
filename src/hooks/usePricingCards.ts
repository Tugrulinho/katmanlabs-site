import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface PricingCard {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
  display_order: number;
  updated_at: string;
  created_at: string;
}

export function usePricingCards() {
  const [packages, setPackages] = useState<PricingCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('pricing_cards')
        .select('*')
        .order('display_order', { ascending: true });

      if (fetchError) throw fetchError;

      if (data) {
        setPackages(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pricing cards');
      console.error('Error fetching pricing cards:', err);
    } finally {
      setLoading(false);
    }
  };

  const updatePackage = async (id: string, updates: Partial<PricingCard>) => {
    try {
      const { error: updateError } = await supabase
        .from('pricing_cards')
        .update(updates)
        .eq('id', id);

      if (updateError) throw updateError;

      await fetchPackages();
      return { success: true };
    } catch (err) {
      console.error('Error updating pricing card:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update pricing card' };
    }
  };

  const createPackage = async (pkg: Omit<PricingCard, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error: insertError } = await supabase
        .from('pricing_cards')
        .insert([pkg]);

      if (insertError) throw insertError;

      await fetchPackages();
      return { success: true };
    } catch (err) {
      console.error('Error creating pricing card:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to create pricing card' };
    }
  };

  const deletePackage = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('pricing_cards')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      await fetchPackages();
      return { success: true };
    } catch (err) {
      console.error('Error deleting pricing card:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to delete pricing card' };
    }
  };

  return {
    packages,
    loading,
    error,
    updatePackage,
    createPackage,
    deletePackage,
    refetch: fetchPackages,
  };
}
