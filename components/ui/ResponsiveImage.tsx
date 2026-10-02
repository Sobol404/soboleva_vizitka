import React from 'react';

interface ResponsiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  basePath: string;
  widths: number[];
  fallbackType: 'jpg' | 'png';
  sizes: string;
  pictureClassName?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  basePath,
  widths,
  fallbackType,
  sizes,
  pictureClassName,
  ...imageProps
}) => {
  const sourceSet = (extension: 'webp' | 'jpg' | 'png') => widths
    .map((width) => `${basePath}-${width}.${extension} ${width}w`)
    .join(', ');
  const defaultWidth = widths[widths.length - 1];

  return (
    <picture className={pictureClassName}>
      <source type="image/webp" srcSet={sourceSet('webp')} sizes={sizes} />
      <img
        {...imageProps}
        src={`${basePath}-${defaultWidth}.${fallbackType}`}
        srcSet={sourceSet(fallbackType)}
        sizes={sizes}
      />
    </picture>
  );
};
