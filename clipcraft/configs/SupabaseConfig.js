import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Example function to upload a file to Supabase Storage
export const uploadFileToSupabase = async (bucketName, filePath, file) => {
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

    if (error) {
        console.error('Error uploading file:', error);
        throw error;
    }

    return data;
};

// Example function to get a public URL for a file in Supabase Storage
export const getPublicUrlFromSupabase = (bucketName, filePath) => {
    const { publicUrl } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

    return publicUrl;
};
