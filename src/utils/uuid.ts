// 根据图片的信息，求出uuid
export function generateUUID(file) {
  return (file.lastModified * file.size) % 100001651
}
