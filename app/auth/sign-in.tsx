import SocialAuthButtons from '@/features/auth/components/SocialAuthButtons/SocialAuthButtons'
import { useSignIn } from '@/features/auth/hooks/useSignIn'
import AppLogo from '@/shared/components/AppLogo/AppLogo'
import AuthRedirectText from '@/shared/components/AuthRedirectText/AuthRedirectText'
import { ControlledTextInput } from '@/shared/components/ControlledTextInput/ControlledTextInput'
import PseudoElement from '@/shared/components/PseudoElement/PseudoElement'
import { Colors } from '@/shared/constants/Colors'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignIn = () => {
  const { control, handleSubmit, isSubmitting } = useSignIn()

  return (
    <SafeAreaView style={styles.container}>
      <AppLogo text="Login" />
      <View style={styles.form}>
        <ControlledTextInput
          control={control}
          name="email"
          keyboardType="email-address"
          label={'Email address'}
          left={<TextInput.Icon icon={'email'} color={'#fff'} />}
          theme={{
            colors: {
              primary: '#fff',
              onSurface: '#fff',
              placeholder: '#fff',
              text: '#fff',
            },
          }}
        />
        <ControlledTextInput
          control={control}
          name="password"
          keyboardType="visible-password"
          label={'Password'}
          left={<TextInput.Icon icon={'lock'} color={'#fff'} />}
          theme={{
            colors: {
              primary: '#fff',
              onSurface: '#fff',
              placeholder: '#fff',
              text: '#fff',
            },
          }}
        />
        <Link style={styles.link} href={'/auth/sign-in'}>
          Forgot password?
        </Link>
        <Button
          onPress={handleSubmit}
          labelStyle={{ fontSize: 18 }}
          textColor="#fff"
          style={styles.btn}
          disabled={isSubmitting}
        >
          Login
        </Button>
      </View>
      <PseudoElement
        containerStyle={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        beforeStyle={{
          left: 0,
          width: 100,
          height: 1,
          backgroundColor: 'gray',
        }}
        afterStyle={{
          right: 0,
          width: 100,
          height: 1,
          backgroundColor: 'gray',
        }}
      >
        <Text style={styles.regularText}>Or continue with</Text>
      </PseudoElement>
      <SocialAuthButtons />
      <AuthRedirectText
        link="/auth/sign-up"
        text="Don`t have an account?"
        linkTag="Sign Up"
      />
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 20,
    gap: 20,
  },
  regularText: {
    color: Colors.dark.tint,
    fontSize: 18,
    fontWeight: '800',
  },
  link: {
    textAlign: 'right',
    color: Colors.dark.btn,
    fontSize: 16,
  },
  text: {
    color: Colors.dark.tint,
    fontSize: 24,
    fontWeight: '800',
  },
  form: {
    width: '100%',
    gap: 15,
  },
  btn: {
    backgroundColor: Colors.dark.btn,
    color: Colors.dark.tint,
    borderRadius: 4,
    paddingVertical: 4,
  },
  input: {
    backgroundColor: Colors.dark.input,
    color: '#fff',
  },
})
