export type SlideshowImage = {
  id: string;
  imageUrl?: string;
  publicId?: string;
  desktopImageUrl?: string;
  desktopPublicId?: string;
  tabletImageUrl?: string;
  tabletPublicId?: string;
  mobileImageUrl?: string;
  mobilePublicId?: string;
  href?: string;
  order: number;
  enabled: boolean;
};
