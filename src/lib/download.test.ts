import { afterEach, describe, expect, it, vi } from "vitest"
import { downloadFileFromUrl, pdfFilenameFromTitle } from "@/lib/download"

describe("pdfFilenameFromTitle", () => {
  it("normaliza título para nome de arquivo", () => {
    expect(pdfFilenameFromTitle("Guia — escolas")).toBe("Guia-escolas.pdf")
  })
})

describe("downloadFileFromUrl", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it("usa blob quando fetch funciona", async () => {
    const click = vi.fn()
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(new Blob(["pdf"], { type: "application/pdf" })),
      }),
    )
    vi.spyOn(document, "createElement").mockImplementation((tag) => {
      const el = document.createElementNS("http://www.w3.org/1999/xhtml", tag) as HTMLAnchorElement
      if (tag === "a") el.click = click
      return el as HTMLElement
    })
    vi.spyOn(document.body, "appendChild").mockImplementation((node) => node)
    vi.spyOn(document.body, "removeChild").mockImplementation((node) => node)

    await downloadFileFromUrl("https://cdn.example.com/doc.pdf", "doc.pdf")
    expect(fetch).toHaveBeenCalledWith("https://cdn.example.com/doc.pdf")
    expect(click).toHaveBeenCalled()
  })
})
