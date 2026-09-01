import { ConditionalTitleProps } from "../../types/Types"

export default function ConditionalTitle ({
    mode
}: ConditionalTitleProps){
    return (
        <div>
            <h1>
                {mode === 'login' ? 'Login' : 'Create account'}
            </h1>
        </div>
    )
}