import { auth } from '@/core/services/firebase'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useRouter } from 'expo-router'

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface AuthContextProps {
  user: FirebaseAuthTypes.User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
})

type Props = {
  children: ReactNode
}
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/auth/sign-in')
      }
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
