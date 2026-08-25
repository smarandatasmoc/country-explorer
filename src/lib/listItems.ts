import { supabase } from './supabase'

export type ListItemStatus = 
  | 'want' 
  | 'visited'
  | null

export type ListItem = {
  id: number
  user_id: string
  country_code: string
  country_name: string
  status: ListItemStatus
  note: string | null
  created_at: string
  updated_at: string
}

export async function getListItems(): Promise<ListItem[]> {
  const { data, error } = await supabase
    .from('list_items')
    .select('*')
    .order('country_name', { ascending: true })

  if (error) {
    throw error
  }

  return data as ListItem[]
}

export async function addListItem(
  countryCode: string,
  countryName: string
): Promise<ListItem> {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User is not authenticated')
  }

  const { data, error } = await supabase
    .from('list_items')
    .insert({
      user_id: user.id,
      country_code: countryCode,
      country_name: countryName,
      status: null,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as ListItem
}

export async function updateListItem(
  id: number,
  updates: {
    status?: ListItemStatus
    note?: string | null
  }
): Promise<ListItem> {
  const { data, error } = await supabase
    .from('list_items')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as ListItem
}

export async function deleteListItem(
  id: number
): Promise<void> {
  const { error } = await supabase
    .from('list_items')
    .delete()
    .eq('id', id)

  if (error) {
    throw error
  }
}