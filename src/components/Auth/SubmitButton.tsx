import { SubmitButtonProps } from "../../types/Types"

export default function SubmitButton ({
    onSubmit,
    loading,
    mode   
}: SubmitButtonProps){
    return (
        <div>
            <button
                onClick={onSubmit}
                disabled={loading}
            >
                {loading
                ? 'Please wait...'
                : mode === 'login'
                    ? 'Login'
                    : 'Register'}
          </button>
        </div>
    )
}