import { ListItem } from "../../lib/listItems"
import CountryDetailsBodyErrorUX from "./CountryDetailsBodyErrorUX"
import CountryDetailsBodyStatus from "./CountryDetailsBodyStatus"
import { ListItemStatus } from "../../lib/listItems"
import { ListItemImage } from "../../lib/images"
import CountryDetailsBodyPhotos from "./CountryDetailsBodyPhotos"
import CountryDetailsBodyNote from "./CountryDetailsBodyNote"
import CountryDetailsBodyDeleteButton from "./CountryDetailsBodyDeleteButton"

export default function CountryDetailsBody (props:{
    error: string | null 
    item: ListItem
    onHandleStatusChange: (status: ListItemStatus) => Promise<void>
    images: ListItemImage[]
    imageUrls: Record<number, string>
    onSetImages: React.Dispatch<React.SetStateAction<ListItemImage[]>>
    onSetImageUrls: React.Dispatch<React.SetStateAction<Record<number, string>>>
    onHandleNoteChange: (note: string) => void
    onHandleSaveNote: () => Promise<void>
    savingNote: boolean
    handleDelete: () => Promise<void>
}) {
    return (
        <div>
            <main className="profile-page">

                <CountryDetailsBodyErrorUX error={props.error}/>
                <br/>

                <CountryDetailsBodyStatus 
                    item={props.item}
                    onHandleStatusChange={props.onHandleStatusChange}
                />
                <br/>
                <CountryDetailsBodyPhotos 
                    images={props.images}
                    imageUrls={props.imageUrls}
                    item = {props.item}
                    onSetImages={props.onSetImages}
                    onSetImageUrls={props.onSetImageUrls}
                />
                <br/>
                <CountryDetailsBodyNote 
                    item = {props.item}
                    onHandleNoteChange={props.onHandleNoteChange}
                    onHandleSaveNote={props.onHandleSaveNote}
                    savingNote = {props.savingNote}
                />
                <br/>
                <section className="country-actions">

                    <CountryDetailsBodyDeleteButton 
                        handleDelete={props.handleDelete}
                    />

                </section>

            </main>
        </div>
    )
}