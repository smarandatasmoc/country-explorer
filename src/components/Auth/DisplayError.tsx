export default function DisplayError(onMessage:{message:string} ){
    return (
        <div>   
            {onMessage.message && <p>{onMessage.message}</p>}
        </div>
    )
}