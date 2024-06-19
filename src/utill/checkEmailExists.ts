import { supabase } from '../supabase/supabaseClient'

export const checkEmailExists = async (email: string) => {
  const { data, error } = await supabase
    .from('userinfo')
    .select('email')
    .eq('email', email)

  if (error) {
    console.error('Error checking email:', error.message)
    return false
  }

  return data.length > 0 ? true : false
}
