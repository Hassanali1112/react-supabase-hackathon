import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cuavmlpzldftlnnyyogv.supabase.co"; // Replace with your project URL
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1YXZtbHB6bGRmdGxubnl5b2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxNjUzNDgsImV4cCI6MjA2Mzc0MTM0OH0.SVUCOU7ycY7NuzyIUlXb6M2ocmVLl1IZuE6ieCIHLKw"; // Replace with your anon public key

export const supabase = createClient(supabaseUrl, supabaseKey);
