import { SelectedCountryProp } from "../../types/Types";

export default function SidePanelClassification({onSelectedCountry
}: SelectedCountryProp) {

    return(
        <div>
            <div className="country-info-item">
                <span>Classification</span>

                <strong>
                    {onSelectedCountry.classification.sovereign && (
                    <div>Sovereign</div>
                    )}

                    {onSelectedCountry.classification.un_member && (
                    <div>Full UN member state</div>
                    )}

                    {onSelectedCountry.classification.un_observer && (
                    <div>UN permanent observer state</div>
                    )}

                    {onSelectedCountry.classification.disputed && (
                    <div>Contested or limited international recognition</div>
                    )}

                    {onSelectedCountry.classification.dependency && (
                    <>
                        <div>
                        Dependant territory belonging to{' '}
                        {onSelectedCountry.parent?.alpha_2}
                        {' as a'}
                        {onSelectedCountry.classification.dependency_type.replace(/_/g, " ")}
                        {'.'}
                        </div>
                    </>
                    )}

                    {!onSelectedCountry.classification.sovereign &&
                    !onSelectedCountry.classification.un_member &&
                    !onSelectedCountry.classification.un_observer &&
                    !onSelectedCountry.classification.disputed &&
                    !onSelectedCountry.classification.dependency && (
                        <div>N/A</div>
                    )}
                </strong>
            </div>
        </div>
    )
}