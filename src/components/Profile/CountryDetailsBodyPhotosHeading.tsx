import { ListItemImage } from "../../lib/images"

export default function CountryDetailsBodyPhotosHeading (props:{
    images: ListItemImage[]
}) {
    return (
        <div className="section-heading">

            <div>
                <p className="eyebrow">
                    MEMORIES
                </p>

                <h2>
                    My photos
                </h2>
            </div>

            <span>
                {props.images.length}{' '}
                {props.images.length === 1
                    ? 'photo'
                    : 'photos'}
            </span>

        </div>
    )
}