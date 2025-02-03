import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DataDetailStore<T> {
  data: T | null
  setData: (data: T) => void
  clearData: () => void
}

export const createDataDetailStore = <T>() =>
  create<DataDetailStore<T>>()(
    persist(
      (set) => ({
        data: null,
        setData: (data) => set({ data }),
        clearData: () => set({ data: null }),
      }),
      {
        name: 'data-detail-storage', // nome único para o storage
      },
    ),
  )
