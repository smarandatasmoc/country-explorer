export default function BrowseBackwardButton (props:{
  offset:number
  onSetOffset: React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    <div>
      <button onClick={()=>{
        {(props.offset - 20) < 0
            ? props.onSetOffset(0)
            : props.onSetOffset((currentOffset) => currentOffset - 20)
        }
      }}>
        <p> {'<'} </p>
      </button>
    </div>
  )
}