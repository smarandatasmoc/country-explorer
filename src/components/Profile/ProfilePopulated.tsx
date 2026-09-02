import ProfileBoard from "./ProfileBoard"
import { ListItem } from "../../lib/listItems"

export default function ProfilePopulated (props:{
    items:ListItem[]
}) {
    return (
        <div>
            <section className="profile-list">
            
                <div className="section-heading">
            
                    <div>
            
                        <p className="eyebrow">
                             YOUR DESTINATIONS
                        </p>
            
                        <h2>
                            Saved countries
                        </h2>
            
                        </div>
            
                </div>
            
            
                <div className="profile-grid">
                    {props.items.map((item) => (

                        <ProfileBoard
                            key={item.id}
                            item={item}
                        />
            
                        ))}
            
                </div>
            
            </section>
        </div>
    )
}