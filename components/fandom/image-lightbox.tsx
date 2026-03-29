import Image from "next/image";

type ImageLightboxProps = {
  src: string;
  alt: string;
  caption?: string;
};

export function ImageLightbox({ src, alt, caption }: ImageLightboxProps) {
  return (
    <figure className="space-y-3">
      <div className="surface-card overflow-hidden rounded-card p-2">
        <Image src={src} alt={alt} width={1200} height={800} className="h-auto w-full object-cover" />
      </div>
      {caption ? <figcaption className="text-sm text-muted">{caption}</figcaption> : null}
    </figure>
  );
}
