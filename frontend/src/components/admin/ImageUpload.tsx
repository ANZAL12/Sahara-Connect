"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Upload, X, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    className?: string;
    bucket?: string;
    aspectRatio?: "4/5" | "1/1" | "16/10";
}

export function ImageUpload({ 
    value, 
    onChange, 
    className, 
    bucket = "event-images",
    aspectRatio = "4/5"
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(value || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview local image first
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setUploading(true);

        try {
            // Check if file is an image
            if (!file.type.startsWith("image/")) {
                alert("Please upload an image file.");
                setUploading(false);
                return;
            }

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 10)}-${Date.now()}.${fileExt}`;
            const filePath = `${bucket === 'event-images' ? 'events' : 'profiles'}/${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) {
                console.error("Upload error:", uploadError);
                throw new Error(`Upload failed: ${uploadError.message}. Ensure '${bucket}' bucket is public and has RLS policies.`);
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            onChange(publicUrl);
        } catch (error: any) {
            alert(error.message || "An error occurred during upload.");
            // Reset preview to old value on error
            setPreview(value || null);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        setPreview(null);
        onChange("");
    };

    return (
        <div className={cn("space-y-4", className)}>
            <div
                onClick={() => !uploading && fileInputRef.current?.click()}
                className={cn(
                    "relative w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-black/20 hover:bg-gray-100 transition-all overflow-hidden group shadow-sm",
                    aspectRatio === "4/5" && "aspect-[4/5]",
                    aspectRatio === "1/1" && "aspect-square",
                    aspectRatio === "16/10" && "aspect-[16/10]",
                    uploading && "opacity-60 cursor-not-allowed",
                    preview && "border-solid border-transparent bg-transparent shadow-md"
                )}
            >

                {preview ? (
                    <>
                        <img
                            src={preview}
                            alt="Upload preview"
                            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white font-medium flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                <Upload className="w-4 h-4" />
                                Change Image
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center p-8 space-y-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm mx-auto w-fit text-gray-400 group-hover:text-black transition-colors">
                            <ImageIcon className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-semibold text-black italic text-center">Click to upload {bucket === 'member-profiles' ? 'profile picture' : 'image'}</p>
                            <p className="text-xs text-gray-400 text-center">
                                {aspectRatio === "4/5" && "Portrait ratio (4:5)"}
                                {aspectRatio === "1/1" && "Square ratio (1:1)"}
                                {aspectRatio === "16/10" && "Landscape ratio (16:10)"}
                            </p>
                        </div>

                    </div>
                )}

                {uploading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-10 h-10 animate-spin text-black" />
                            <p className="text-sm font-bold tracking-tight text-black uppercase">Uploading...</p>
                        </div>
                    </div>
                )}
            </div>

            {preview && !uploading && (
                <div className="flex justify-between items-center px-1">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100/50">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified Ratio
                    </div>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeImage();
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1.5 text-xs font-medium"
                    >
                        <X className="w-4 h-4" />
                        Remove
                    </button>
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
            />
        </div>
    );
}
