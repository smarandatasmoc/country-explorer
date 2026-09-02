import CountryDetailsBodyPhotosHeading from "./CountryDetailsBodyPhotosHeading"
import { ListItemImage } from "../../lib/images"
import CountryDetailsBodyPhotosEmpty from "./CountryDetailsBodyPhotosEmpty"
import PhotoAlbum from "./PhotoAlbum"
import ImageUploader from "./ImageUploader"
import { ListItem } from "../../lib/listItems"
import { getImageUrls,  } from "../../lib/images"

export default function CountryDetailsBodyPhotos (props:{
    images: ListItemImage[]
    imageUrls: Record<number, string>
    item: ListItem 
    onSetImages: React.Dispatch<React.SetStateAction<ListItemImage[]>>
    onSetImageUrls: React.Dispatch<React.SetStateAction<Record<number, string>>>
}) {
    return (
        <div>
            <section className="album-section">

                <CountryDetailsBodyPhotosHeading
                    images={props.images}/>

                {props.images.length === 0 
                ? (<CountryDetailsBodyPhotosEmpty/>) 
                : (

                    <PhotoAlbum
                    images={props.images
                        .map((image) =>
                            props.imageUrls[image.id])
                        .filter((url): url is string =>
                            Boolean(url))}
                    />

                )}

                <ImageUploader
                    listItemId={props.item.id}
                    onUploaded={async (
                    newImages
                    ) => {

                    props.onSetImages(
                        (currentImages) => [
                        ...currentImages,
                        ...newImages,
                        ]
                    )

                    const newUrls =
                        await getImageUrls(
                        newImages
                        )

                    props.onSetImageUrls(
                        (currentUrls) => ({
                        ...currentUrls,
                        ...newUrls,
                        })
                    )

                    }}
                />

                </section>
        </div>
    )
}