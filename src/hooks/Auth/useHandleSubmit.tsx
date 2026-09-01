import { UseHandleSubmitProps } from "../../types/Types"
import { useNavigate } from "react-router-dom"

export const useHandleSubmit = ({
    onSetMessage,
    onSetLoading,
    mode,
    supabase,
    email,
    password
}:UseHandleSubmitProps) => {
    const navigate = useNavigate()

    const handleSubmit = async () => {
        onSetMessage('')
        onSetLoading(true)
    
        if (mode === 'register') {
          const { error } = await supabase.auth.signUp({
            email,
            password,
          })
    
          if (error) {
            onSetMessage(error.message)
          } else {
            onSetMessage(
              'Account created. Check your email to confirm your account.'
            )
          }
        }
    
        if (mode === 'login') {
          const { error } =
            await supabase.auth.signInWithPassword({
              email,
              password,
            })
    
          if (error) {
            onSetMessage(error.message)
          }
          else{
            navigate('/search')
          }
        }
    
        onSetLoading(false)
      }
    return handleSubmit
}