import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // We log a warning instead of throwing during build time to avoid crashing the Vercel build
  // before the env variables can be injected or if they are only needed at runtime.
  console.warn('Warning: Missing Supabase environment variables. Database features will not work until these are configured in Vercel.')
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co', 
    supabaseAnonKey || 'placeholder-key'
)
