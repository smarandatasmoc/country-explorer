import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

type AuthMode = 'login' | 'register'

function Auth() {
  const [mode, setMode] = useState<AuthMode>('login')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    setMessage('')
    setLoading(true)

    if (mode === 'register') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setMessage(error.message)
      } else {
        setMessage(
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
        setMessage(error.message)
      }
      else{
        navigate('/country')
      }
    }

    setLoading(false)
  }

  return (
    <div>
      <h1>
        {mode === 'login' ? 'Login' : 'Create account'}
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading
          ? 'Please wait...'
          : mode === 'login'
            ? 'Login'
            : 'Register'}
      </button>

      {message && <p>{message}</p>}

      <button
        onClick={() => {
          setMode(
            mode === 'login'
              ? 'register'
              : 'login'
          )

          setMessage('')
        }}
      >
        {mode === 'login'
          ? 'Create a new account'
          : 'Already have an account? Login'}
      </button>
    </div>
  )
}

export default Auth

