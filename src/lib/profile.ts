import { supabase } from './supabase'

export type Profile = {
  id: string
  country_code: string | null
  country_name: string | null
  updated_at: string
}

export async function getProfile(): Promise<Profile | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}