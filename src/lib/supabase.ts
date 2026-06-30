import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://qmkjnqqcticyvqptlrcm.supabase.co/rest/v1/';
const supabaseAnonKey = 'sb_publishable_5Ct6qy0AGoljHzvmEfg3KQ_AseDtXTH';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});