import { auth } from '@/core/services/firebase'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import { signInSchema, signInSchemaType } from '../schemas/sign-in.schema'

export const useSignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signInSchemaType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  })
  const router = useRouter()

  const signIn = async (data: signInSchemaType) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(
        data.email,
        data.password
      )

      const token = await user.getIdToken()
      if (!token) {
        Alert.alert('Ошибка', 'Failed to get token')
      } else {
        router.replace('/')
      }
    } catch (error: any) {
      Alert.alert('Login error', error.message)
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(signIn),
    isSubmitting,
  }
}
