// 根据图片的信息，求出32位uuid

export function generateUUID() {
  var buf = new Uint32Array(4)
  window.crypto.getRandomValues(buf)
  var idx = -1
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    idx++
    var r = (buf[idx >> 3] >> ((idx % 8) * 4)) & 15
    var v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
