import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getUserInfo } from '../src/services/api'

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,

      getInfo: async () => {
        set({ loading: true, error: null })
        try {
          const request = await getUserInfo("me")
          set({
            user: request,
            loading: false
          })
        } catch(err) {
          set({ 
            error: err.message,
            loading: false 
          })
        }
      },

      logout: () => {
        set({ user: null, error: null })
      }
    }),
    {
      name: 'User',
    }
  )
)

export default useUserStore