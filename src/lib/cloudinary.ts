// lib/cloudinary.ts

export const cloudinaryConfig = {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET, // Keep this server-side only
};

// Validate configuration
if (!cloudinaryConfig.cloudName || !cloudinaryConfig.uploadPreset) {
    console.warn("Cloudinary configuration is missing. Please check your environment variables.");
}