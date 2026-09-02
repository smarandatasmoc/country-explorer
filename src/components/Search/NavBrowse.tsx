import BrowseBackwardButton from "./BrowseBackwardButton"
import BrowseForwardButton from "./BrowseForwardButton"

export default function NavBrowse (props:{
    search:string
    offset:number
    onSetOffset:React.Dispatch<React.SetStateAction<number>>
}) {
    return (
        <div className="nav-browse">
            {!props.search.trim() && (
                
                    <>
                      <BrowseBackwardButton
                        offset={props.offset}
                        onSetOffset={props.onSetOffset}
                      />
            
                      <BrowseForwardButton
                        offset={props.offset}
                        onSetOffset={props.onSetOffset}
                      />
                    </>
                  )}
        </div>
    )
}