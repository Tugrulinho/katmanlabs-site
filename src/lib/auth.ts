import { supabase } from './supabase';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  const { data: adminUser, error: adminError } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', data.user.id)
    .eq('is_active', true)
    .maybeSingle();

  if (adminError) throw adminError;
  if (!adminUser) throw new Error('Unauthorized: Not an active admin user');

  return { user: data.user, session: data.session, adminUser };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', user.id)
    .eq('is_active', true)
    .maybeSingle();

  if (!adminUser) return null;

  return { user, adminUser };
};

export const checkIsAdmin = async (): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return false;

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('is_active')
    .eq('id', user.id)
    .eq('is_active', true)
    .maybeSingle();

  return !!adminUser;
};
