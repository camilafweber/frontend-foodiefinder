export function resolveImageSrc(basePath, imagePath) {
  if (!imagePath) {
    return "";
  }

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("data:") ||
    imagePath.startsWith("/")
  ) {
    return imagePath;
  }

  return `${basePath}/${imagePath}`;
}
