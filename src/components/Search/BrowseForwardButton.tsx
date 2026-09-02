export default function BrowseForwardButton (props:{
  offset:number
  onSetOffset: React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    <div>
      <button onClick={()=>{
        props.offset < 240
        ? props.onSetOffset((currentOffset) => currentOffset + 20)
        : props.onSetOffset((currentOffset) => currentOffset)
      }}>
        <p> {'>'} </p>
      </button>
    </div>
  )
}