import { ref } from 'vue';
import useSupabase from 'boot/supabase'

const user = ref(null)
export default function useAuthUser() {

  const { supabase } = useSupabase()

  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signIn({ email, password })
    if (error) throw error
    return user

  }

  const loginWithGoogle = async ({ provider }) => {
    const { user, session, error } = await supabase.auth.signIn(
      {
        provider: 'google'
      }, {
        redirectTo: `${window.location.origin}/me`
      })
    if (error) throw error
    return user

  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const isLoggedIn = () => {
    return !!user.value
  }

  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        data: meta,
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`
      }
    )
    if (error) throw error
    return user
  }


  const update = async (data) => {
    const { user, error } = await supabase.auth.update(data)
    if (error) throw error
    return user
  }
  const sendPasswordRestEmail = async (email) => {
    const { user, error } = await supabase.auth.api.resetPasswordForEmail(email)
    if (error) throw error
    return user
  }

  const resetPassword = async (accessToken, newPassword) => {
    const { user, error } = await supabase.auth.api.updateUser(
      accessToken,
      { password: newPassword }
    )
    if (error) throw error
    return user

  }


  return {
    user,
    login,
    loginWithGoogle,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    resetPassword

  }
}
