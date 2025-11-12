import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vycuegvosjnjeujdtlxo.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5Y3VlZ3Zvc2puamV1amR0bHhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MjUzNTAsImV4cCI6MjA3NzMwMTM1MH0.DMzDcTj96JkNoA9iqE9jO0pNsgQVGm_0m3sUgJIgOio";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);