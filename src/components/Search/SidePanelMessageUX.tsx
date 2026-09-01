export default function SidePanelMessageUX (props:{
    addMessage: string | null
})  {
    return (
        <div>
            {props.addMessage && (
                <div className="message">
                    {props.addMessage}
                </div>
            )}
        </div>
    )
}