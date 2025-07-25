import { create } from 'zustand'

interface DataDetailStore<T> {
  data: T | null
  setData: (data: T) => void
  clearData: () => void
}

export const useDataDetailStore = <T>() =>
  create<DataDetailStore<T>>((set) => ({
    data: null,
    setData: (data) => set({ data }),
    clearData: () => set({ data: null }),
  }))
