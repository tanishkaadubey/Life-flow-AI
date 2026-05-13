import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xfecswukdcriuikaublj.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmZWNzd3VrZGNyaXVpa2F1YmxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MDE5MTUsImV4cCI6MjA5NDA3NzkxNX0.XZ-elg3FBDAPPWdLCpvBLhFAJO9HE0VG_EkqP4o0Doc";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);