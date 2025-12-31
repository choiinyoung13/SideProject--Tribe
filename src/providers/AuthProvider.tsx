'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@/supabase/supabaseClient'
import { useRouter } from 'next/navigation'

interface AuthContextType {
    session: Session | null
    isLoading: boolean
    isAuthenticated: boolean
    signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
    children,
    initialSession,
}: {
    children: ReactNode
    initialSession: Session | null
}) {
    const [session, setSession] = useState<Session | null>(initialSession)
    const [isLoading, setIsLoading] = useState(!initialSession)
    const router = useRouter()

    useEffect(() => {
        // 만약 초기 세션이 없으면 현재 세션을 가져옴
        if (!initialSession) {
            const getSession = async () => {
                const { data: { session: currentSession } } = await supabase.auth.getSession()
                setSession(currentSession)
                setIsLoading(false)
            }
            getSession()
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
            setSession(newSession)
            setIsLoading(false)

            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                router.refresh()
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [initialSession, router])

    const signOut = async () => {
        await supabase.auth.signOut()
        setSession(null)
        router.refresh()
    }

    return (
        <AuthContext.Provider value={{ session, isLoading, isAuthenticated: !!session, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
