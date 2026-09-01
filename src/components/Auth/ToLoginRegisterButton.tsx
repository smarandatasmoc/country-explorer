import { ToLoginRegisterButtonProps } from "../../types/Types"

export default function ToLoginRegisterButton ({
    onSetMode,
    onSetMessage,
    mode
}: ToLoginRegisterButtonProps){
    return (
        <div>
            <button
            onClick={() => {
              onSetMode(
                mode === 'login'
                  ? 'register'
                  : 'login'
              )

              onSetMessage('')
            }}
          >
            {mode === 'login'
              ? 'Create a new account'
              : 'Already have an account? Login'}
          </button>
        </div>
    )
}