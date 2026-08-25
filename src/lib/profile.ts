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

/*export async function saveCountry(
  countryCode: string,
  countryName: string
): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User is not authenticated')
  }

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      country_code: countryCode,
      country_name: countryName,
      updated_at: new Date().toISOString(),
    })

  if (error) {
    throw error
  }
}*/