import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

import {AuthMode} from '../types/Types'

import SubmitButton from '../components/Auth/SubmitButton'
import ToLoginRegisterButton from '../components/Auth/ToLoginRegisterButton'
import DisplayError from '../components/Auth/DisplayError'
import EmailBar from '../components/Auth/EmailBarProps'
import PasswordBar from '../components/Auth/PasswordBarProps'
import ConditionalTitle from '../components/Auth/ConditionalTitle'

import { useHandleSubmit } from '../hooks/Auth/useHandleSubmit'

function Auth() {
  const [mode, setMode] = useState<AuthMode>('login')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = useHandleSubmit({
  onSetMessage: setMessage,
  onSetLoading: setLoading,
  mode,
  supabase,
  email,
  password,
})

  return (

    <div className="auth-page">
    <div className="auth-background-shape shape-one"></div>
    <div className="auth-background-shape shape-two"></div>
    <div className="auth-background-shape shape-three"></div>

    <div className="auth-card">
      {
        <div className="page-container">
          <ConditionalTitle mode={mode}/>
          <EmailBar
            value={email}
            onSetValue={setEmail}
          />
          <br/>
          <PasswordBar
            value = {password}
            onSetValue={setPassword}
          />
          <br/>
          <SubmitButton 
            onSubmit={handleSubmit}
            loading = {loading}
            mode = {mode}
          />
          <DisplayError message={message}/>
          <br/>
          <ToLoginRegisterButton
            onSetMode={setMode}
            onSetMessage={setMessage}
            mode={mode}
          />
        </div>
      }
    </div>
      
    </div>
  )
}

export default Auth