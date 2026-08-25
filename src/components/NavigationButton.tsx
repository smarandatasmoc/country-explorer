import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useState } from 'react'

type ButtonPath = "/country"  | "/profile"

type NavigationButtonProps = {
    path:ButtonPath
}

export default function NavigationButton ({path,}:NavigationButtonProps) {
    const navigate = useNavigate()

    return(
        <div>
            <button onClick={() => navigate(path)}>
                {
                path === "/country" 
                ? "Search more countries"
                : "Visit Your Profile"
                }               
            </button>
        </div>
    )
}