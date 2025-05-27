"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface PhotoUploadProps {
  currentImageUrl?: string
  onImageUpload: (imageUrl: string) => void
  title: string
  description: string
}

export function PhotoUpload({ currentImageUrl, onImageUpload, title, description }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null)
  const { toast } = useToast()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      })
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      // Create a preview URL
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)

      // For demo purposes, we'll use a placeholder URL
      // In a real app, you would upload to a service like Supabase Storage, Cloudinary, etc.
      const mockImageUrl = `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(file.name)}`

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onImageUpload(mockImageUrl)

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setPreviewUrl(null)
    onImageUpload("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {previewUrl ? (
          <div className="relative">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
            </div>
            <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={removeImage}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Click to upload an image</p>
            <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
          </div>
        )}

        <div>
          <Label htmlFor="image-upload" className="sr-only">
            Upload image
          </Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="cursor-pointer"
          />
        </div>

        {uploading && <div className="text-center text-sm text-gray-600">Uploading image...</div>}
      </CardContent>
    </Card>
  )
}
