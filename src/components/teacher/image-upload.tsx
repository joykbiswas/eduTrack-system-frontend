// components/word-story-card/image-upload.tsx

"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { uploadToCloudinary } from "@/services/cloudinary.service";
import { toast } from "sonner";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    onError?: (error: string) => void;
}

export const ImageUpload = ({ value, onChange, onError }: ImageUploadProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState<string>(value);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            const errorMsg = "Please select a valid image file (JPEG, PNG, WEBP, GIF)";
            toast.error(errorMsg);
            onError?.(errorMsg);
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            const errorMsg = "Image size should be less than 5MB";
            toast.error(errorMsg);
            onError?.(errorMsg);
            return;
        }

        // Show preview
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        
        // Upload to Cloudinary
        setIsUploading(true);
        try {
            const imageUrl = await uploadToCloudinary(file);
            onChange(imageUrl);
            toast.success("Image uploaded successfully!");
            // Clean up preview URL after successful upload
            URL.revokeObjectURL(objectUrl);
        } catch (error) {
            console.error("Upload error:", error);
            const errorMsg = error instanceof Error ? error.message : "Failed to upload image";
            toast.error(errorMsg);
            onError?.(errorMsg);
            // Reset preview if upload fails
            setPreview(value);
        } finally {
            setIsUploading(false);
            // Clear file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemoveImage = () => {
        setPreview("");
        onChange("");
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        toast.info("Image removed");
    };

    return (
        <div className="space-y-4">
            <Label>Story Image *</Label>
            <div className="flex flex-col items-center gap-4">
                {preview ? (
                    <div className="relative w-full max-w-md">
                        <div className="relative aspect-video rounded-lg overflow-hidden border">
                            <Image
                                src={preview}
                                alt="Story preview"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 500px"
                            />
                        </div>
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 rounded-full"
                            onClick={handleRemoveImage}
                            disabled={isUploading}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="w-full max-w-md border-2 border-dashed rounded-lg p-8 text-center">
                        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                            JPEG, PNG, WEBP, GIF (Max 5MB)
                        </p>
                    </div>
                )}
                
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="h-4 w-4 mr-2" />
                                {preview ? "Change Image" : "Upload Image"}
                            </>
                        )}
                    </Button>
                </div>
                
                <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                />
            </div>
        </div>
    );
};