import { blockContent, stat } from "./blockContent"
import { schemaTypes as documents } from "./documents"
import { fichaItem, homeStat, segment } from "./objects"

export const schemaTypes = [blockContent, stat, fichaItem, homeStat, segment, ...documents]
