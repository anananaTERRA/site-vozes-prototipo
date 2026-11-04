import { createClient } from "@sanity/client"
import { apiVersion, dataset, projectId } from "@/sanity/config"

function browserProxyHost() {
  if (typeof window === "undefined") return undefined
  const host = window.location.hostname
  if (host !== "localhost" && host !== "127.0.0.1") return undefined
  return `${window.location.origin}/sanity-api`
}

const proxyHost = browserProxyHost()

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !proxyHost,
  maxRetries: 2,
  ...(proxyHost ? { apiHost: proxyHost, useProjectHostname: false, useCdn: false } : {}),
})
