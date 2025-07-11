import SocialAuthButtons from '@/features/auth/components/SocialAuthButtons/SocialAuthButtons'
import { useSignUp } from '@/features/auth/hooks/useSignUp'
import AppLogo from '@/shared/components/AppLogo/AppLogo'
import AuthRedirectText from '@/shared/components/AuthRedirectText/AuthRedirectText'
import { ControlledTextInput } from '@/shared/components/ControlledTextInput/ControlledTextInput'
import PseudoElement from '@/shared/components/PseudoElement/PseudoElement'
import TermsCheckbox from '@/shared/components/TermsCheckbox/TermsCheckbox'
import { Colors } from '@/shared/constants/Colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignUp = () => {
  const { control, handleSubmit, isSubmitting } = useSignUp()

  return (
    <SafeAreaView style={styles.container}>
      <AppLogo text="Create an account" />
      <View style={styles.form}>
        <ControlledTextInput
          mode="outlined"
          control={control}
          name="username"
          placeholderTextColor={'#fff'}
          label={'Username'}
          left={<TextInput.Icon icon={'account'} color={'#fff'} />}
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
          mode="outlined"
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
          mode="outlined"
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
        <TermsCheckbox text="Accept terms and condition" />
        <Button
          labelStyle={{ fontSize: 18 }}
          textColor="#fff"
          style={styles.btn}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          Sign Up
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
        link="/auth/sign-in"
        text="Already have an account? "
        linkTag="Log in"
      />
    </SafeAreaView>
  )
}

export default SignUp

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
})
