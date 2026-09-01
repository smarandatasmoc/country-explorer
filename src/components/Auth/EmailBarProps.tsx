import { InputBarProps } from "../../types/Types";

export default function EmailBar({
    value,
    onSetValue
}: InputBarProps){
    return(
        <div>
            <input
            type="email"
            placeholder="Email"
            value={value}
            onChange={(event) => onSetValue(event.target.value)}
          />
        </div>
    )
}