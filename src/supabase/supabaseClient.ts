import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://gkumxciovhhhvaswvhkq.supabase.co";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdW14Y2lvdmhoaHZhc3d2aGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MjcwNTQsImV4cCI6MjA3MjAwMzA1NH0.v--FXoMJKE3LWiu4IHwvZOPNgYh3HNm2TIrWXpzBr3M";
export const supabase = createClient(supabaseUrl, supabaseKey);
