export type GalleryAlbum = { id: string; name: string; slug: string; description?: string; coverImageUrl?: string; coverPublicId?: string; parentId?: string; ministrySlug?: string; visible?: boolean; order?: number };
export type GalleryPhoto = { id: string; albumId: string; imageUrl: string; publicId?: string; alt?: string; order?: number; visible?: boolean };
