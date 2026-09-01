import { InputBarProps } from "../../types/Types";

export default function PasswordBar({
    value,
    onSetValue
}: InputBarProps){
    return(
        <div>
            <input
            type="password"
            placeholder="Password"
            value={value}
            onChange={(event) => onSetValue(event.target.value)}
          />
        </div>
    )
}