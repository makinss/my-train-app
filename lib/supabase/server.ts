import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.https://gniuncvdfbnpyyqkhvzg.supabase.co
    process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduaXVuY3ZkZmJucHl5cWtodnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1ODU5NjUsImV4cCI6MjA3MzE2MTk2NX0.93s6dhkKnT4y3wZisx6i0tgkVRfU4D53XgFRTVn1M-o
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Server Componentからsetが呼ばれた場合。
            // ミドルウェアでセッションを更新していれば、このエラーは無視できます。
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Server Componentからremoveが呼ばれた場合。
            // ミドルウェアでセッションを更新していれば、このエラーは無視できます。
          }
        },
      },
    }
  )
}
