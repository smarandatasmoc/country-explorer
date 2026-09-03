export default function DisplayError(onMessage:{message:string} ){
    return (
        <div>   
            {onMessage.message && 
                onMessage.message === "Account created. Check your email to confirm your account." 
                ? <p className="centered-ux">{"Account created."}</p>
                : <p>{onMessage.message}</p>
            }
        </div>
    )
}