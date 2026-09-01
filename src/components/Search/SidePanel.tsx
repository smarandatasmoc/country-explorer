import { SidePanelProps } from "../../types/Types";
import CloseSidePanelButton from "./CloseSidePanelButton";
import SidePanelAddButton from "./SidePanelAddButton";
import SidePanelArea from "./SidePanelArea";
import SidePanelBorders from "./SidePanelBorders";
import SidePanelCallingCodes from "./SidePanelCallingCodes";
import SidePanelCapital from "./SidePanelCapital";
import SidePanelClassification from "./SidePanelClassification";
import SidePanelContinents from "./SidePanelContinents";
import SidePanelCurrencies from "./SidePanelCurrencies";
import SidePanelDarkOverlay from "./SidePanelDarkOverlay";
import SidePanelDriving from "./SidePanelDriving";
import SidePanelGovernment from "./SidePanelGovernment";
import SidePanelHeader from "./SidePanelHeader";
import SidePanelISO from "./SidePanelISO";
import SidePanelLandlocked from "./SidePanelLandlocked";
import SidePanelLanguages from "./SidePanelLanguages";
import SidePanelLinks from "./SidePanelLinks";
import SidePanelMembership from "./SidePanelMembership";
import SidePanelMessageUX from "./SidePanelMessageUX";
import SidePanelPopulation from "./SidePanelPopulation";
import SidePanelRegion from "./SidePanelRegion";
import SidePaneSubRegion from "./SidePanelSubregion";
import SidePanelTimezones from "./SidePanelTimezones";
import SidePanelTlds from "./SidePanelTlds";
import SidePanelUnits from "./SidePanelUnits";

export default function SidePanel ({
    onAddMessage,
    onHandleAddToList,
    adding,
    onSelectedCountry,
    onSetSelectedCountry
}:SidePanelProps) {

    return (
        <div>
            {onSelectedCountry && (
                <>
                    <SidePanelDarkOverlay onSetSelectedCountry={onSetSelectedCountry}/>

                    <aside className="country-details">
                        <CloseSidePanelButton onSetSelectedCountry={onSetSelectedCountry}/>
                        <div className="country-details-content">
                            <SidePanelHeader onSelectedCountry={onSelectedCountry}/>
                            <div className="country-information">
                                <SidePanelCapital onSelectedCountry={onSelectedCountry}/>
                                <SidePanelRegion onSelectedCountry={onSelectedCountry}/>
                                <SidePaneSubRegion onSelectedCountry={onSelectedCountry}/>
                                <SidePanelContinents onSelectedCountry={onSelectedCountry}/>
                                <SidePanelISO onSelectedCountry={onSelectedCountry}/>
                                <SidePanelLandlocked onSelectedCountry={onSelectedCountry}/>
                                <SidePanelArea onSelectedCountry={onSelectedCountry}/>
                                <SidePanelBorders onSelectedCountry={onSelectedCountry}/>
                                <SidePanelUnits onSelectedCountry={onSelectedCountry}/>
                                <SidePanelPopulation onSelectedCountry={onSelectedCountry}/>
                                <SidePanelTimezones onSelectedCountry={onSelectedCountry}/>
                                <SidePanelLanguages onSelectedCountry={onSelectedCountry}/>
                                <SidePanelCurrencies onSelectedCountry={onSelectedCountry}/>
                                <SidePanelCallingCodes onSelectedCountry={onSelectedCountry}/>
                                <SidePanelTlds onSelectedCountry={onSelectedCountry}/>
                                <SidePanelDriving onSelectedCountry={onSelectedCountry}/>
                                <SidePanelGovernment onSelectedCountry={onSelectedCountry}/>
                                <SidePanelLinks onSelectedCountry={onSelectedCountry}/>
                                <SidePanelMembership onSelectedCountry={onSelectedCountry}/>
                                <SidePanelClassification onSelectedCountry={onSelectedCountry}/>
                            </div>
                            <SidePanelAddButton 
                                onHandleAddToList={onHandleAddToList}
                                adding={adding}
                            />
                            <SidePanelMessageUX
                                addMessage={onAddMessage}
                            />
                        </div>
                    </aside>
                </>
            )}
        </div>
    )
}