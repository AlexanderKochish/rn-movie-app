import { auth } from '@/core/services/firebase'
import SocialAuthButtons from '@/features/auth/components/SocialAuthButtons/SocialAuthButtons'
import AppLogo from '@/shared/components/AppLogo/AppLogo'
import AuthRedirectText from '@/shared/components/AuthRedirectText/AuthRedirectText'
import PseudoElement from '@/shared/components/PseudoElement/PseudoElement'
import TermsCheckbox from '@/shared/components/TermsCheckbox/TermsCheckbox'
import { Colors } from '@/shared/constants/Colors'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const signUp = async () => {
    const user = await auth.createUserWithEmailAndPassword(email, password)

    await user.user.updateProfile({
      displayName: username,
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <AppLogo text="Create an account" />
      <View style={styles.form}>
        <TextInput
          mode="outlined"
          style={{ backgroundColor: '#1F1F1F', color: '#fff' }}
          left={<TextInput.Icon icon={'account'} color={'#fff'} />}
          textColor="#fff"
          label={'Username'}
          placeholderTextColor={'#fff'}
          value={username}
          onChangeText={(text) => setUsername(text)}
          theme={{
            colors: {
              primary: '#fff',
              onSurface: '#fff',
              placeholder: '#fff',
              text: '#fff',
            },
          }}
        />
        <TextInput
          mode="outlined"
          style={{ backgroundColor: '#1F1F1F', color: '#fff' }}
          left={<TextInput.Icon icon={'email'} color={'#fff'} />}
          textColor="#fff"
          keyboardType="email-address"
          label={'Email address'}
          placeholderTextColor={'#fff'}
          value={email}
          onChangeText={(text) => setEmail(text)}
          theme={{
            colors: {
              primary: '#fff',
              onSurface: '#fff',
              placeholder: '#fff',
              text: '#fff',
            },
          }}
        />
        <TextInput
          style={{ backgroundColor: '#1F1F1F', color: '#fff' }}
          keyboardType="visible-password"
          textColor="#fff"
          value={password}
          onChangeText={(text) => setPassword(text)}
          theme={{
            colors: {
              primary: '#fff',
              placeholder: '#fff',
              text: '#fff',
              onSurface: '#fff',
            },
          }}
          mode="outlined"
          left={<TextInput.Icon icon={'lock'} color={'#fff'} />}
          label={'Password'}
        />
        <TermsCheckbox text="Accept terms and condition" />
        <Button
          labelStyle={{ fontSize: 18 }}
          textColor="#fff"
          style={styles.btn}
          onPress={signUp}
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
