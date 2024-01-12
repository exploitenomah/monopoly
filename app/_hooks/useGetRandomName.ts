import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  names,
  colors,
} from "unique-names-generator"
import { useCallback } from 'react'

export const defaultConfig: Config = {
  dictionaries: [adjectives, colors],
  separator: '-'
}

export default function useGetRandomName(config?: Config) {
  return useCallback(() => uniqueNamesGenerator(config || defaultConfig), [])
}
