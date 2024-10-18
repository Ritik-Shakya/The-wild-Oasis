import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://vhbqdebzwitgkiedgkoc.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoYnFkZWJ6d2l0Z2tpZWRna29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgzNzY1ODgsImV4cCI6MjAzMzk1MjU4OH0.3TadssnLvMFEVqlzF7pXdICInzM49hSTzcrttqiqYkU";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
