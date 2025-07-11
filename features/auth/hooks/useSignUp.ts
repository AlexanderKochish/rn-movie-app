import { auth } from '@/core/services/firebase'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import { signUpSchema, signUpSchemaType } from '../schemas/sign-up.schema'

export const useSignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signUpSchemaType>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
  })
  const router = useRouter()

  const signUp = async (data: signUpSchemaType) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        data.email,
        data.password
      )

      await user.updateProfile({
        displayName: data.username,
      })

      const token = await user.getIdToken()
      if (!token) {
        Alert.alert('Ошибка', 'Failed to get token')
      } else {
        router.replace('/')
      }
    } catch (error: any) {
      Alert.alert('Registration error', error.message)
    }
  }

  return {
    control,
    handleSubmit: handleSubmit(signUp),
    isSubmitting,
  }
}
