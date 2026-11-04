import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { localContent } from "@/content/local"
import { mergeContent, type SiteContent } from "@/content/site"
import { fetchSanityContent } from "@/sanity/fetch"

type ContentState = SiteContent & { ready: boolean }

const local = localContent()

const ContentContext = createContext<ContentState>({ ...local, ready: false })

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContentState>({ ...local, ready: false })

  useEffect(() => {
    let active = true
    fetchSanityContent()
      .then((remote) => {
        if (!active) return
        setState({ ...mergeContent(local, remote), ready: true })
      })
      .catch((error: unknown) => {
        if (!active) return
        console.warn("Conteúdo do Sanity indisponível. O site está usando os textos locais.", error)
        setState({ ...local, ready: true })
      })
    return () => {
      active = false
    }
  }, [])

  return <ContentContext.Provider value={state}>{children}</ContentContext.Provider>
}

export function useSiteContent() {
  return useContext(ContentContext)
}
