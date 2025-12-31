import { supabase } from '@/supabase/supabaseClient'

export async function fetchItems() {
  const { data, error } = await supabase.from('items').select('*')

  if (error) {
    console.error('Error fetching data:', error)
    return []
  }

  return data || []
}


