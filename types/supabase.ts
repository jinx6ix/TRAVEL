export type ImageFile = File & { preview?: string }
export type UploadResult = {
  path: string
  fullPath: string
  publicUrl: string
} | null