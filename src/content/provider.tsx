import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { localContent } from "@/content/local"
import { mergeContent, type SiteContent } from "@/content/site"
import { fetchSanityContent } from "@/sanity/fetch"

type ContentState = SiteContent & { ready: boolean }

const local = localContent()

const ContentContext = createContext<ContentState>({ ...local, ready: false })

const REFETCH_MIN_MS = 5_000

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContentState>({ ...local, ready: false })

  useEffect(() => {
    let active = true
    let lastFetchAt = 0

    const sync = (force = false) => {
      const now = Date.now()
      if (!force && now - lastFetchAt < REFETCH_MIN_MS) return
      lastFetchAt = now

      fetchSanityContent()
        .then((remote) => {
          if (!active) return
          setState({ ...mergeContent(local, remote), ready: true })
        })
        .catch((error: unknown) => {
          if (!active) return
          console.warn("Conteúdo do Sanity indisponível. O site está usando os textos locais.", error)
          setState((prev) => (prev.ready ? prev : { ...local, ready: true }))
        })
    }

    sync(true)

    const onVisibility = () => {
      if (document.visibilityState === "visible") sync(false)
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      active = false
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return <ContentContext.Provider value={state}>{children}</ContentContext.Provider>
}

export function useSiteContent() {
  return useContext(ContentContext)
}
