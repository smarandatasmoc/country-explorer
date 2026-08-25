import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useState } from 'react'

export default function LogOutButton () {
    const navigate = useNavigate()

    const [error, setError] = useState<string | null>(null)

    const handleLogout = async () => {
        try {
        const { error } = await supabase.auth.signOut()

        if (error) {
            throw error
        }

        navigate('/login')
        } catch (error) {
        if (error instanceof Error) {
            setError(error.message)
        } else {
            setError('Failed to log out.')
        }
        }
    }

    return(
        <div>
            <button onClick={handleLogout}>
                Log out
            </button>
        </div>
    )
}