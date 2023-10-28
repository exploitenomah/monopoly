import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  names,
  colors,
} from "unique-names-generator"
import { useCallback } from 'react'

const config: Config = {
  dictionaries: [adjectives, colors, names],
  separator: '-'
}

export default function useGetRandomName() {
  return useCallback(() => uniqueNamesGenerator(config), [])
}
