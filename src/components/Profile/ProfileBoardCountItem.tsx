export default function ProfileBoardCountItem (props:{
    photoCount:number
}) {
    return (
        <div>
            <p className="photo-count">

            {props.photoCount === 0
              ? 'No photos'
              : `${props.photoCount} ${
                  props.photoCount === 1
                    ? 'photo'
                    : 'photos'
                }`}

          </p>
        </div>
    )
}