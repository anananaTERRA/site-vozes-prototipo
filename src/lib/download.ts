/** Tenta baixar via fetch + blob; se CORS bloquear, usa âncora com atributo download. */
export async function downloadFileFromUrl(url: string, filename: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error("fetch failed")
    const blob = await response.blob()
    triggerBlobDownload(blob, filename)
    return
  } catch {
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = filename
    anchor.rel = "noopener"
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
  }
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const blobUrl = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = blobUrl
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(blobUrl)
}

export function pdfFilenameFromTitle(title: string) {
  const base = title
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\w\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-")
  return `${base || "publicacao"}.pdf`
}
