import { SupabaseClient } from "@supabase/supabase-js"
import { Country } from "../api/countriesAPI"

/*Quick Search: CTRL + F */
/*Content is organised per web app pages*/

/* Auth Types */
    /* SubmitButtonProps */
    /* ToLoginRegisterButton Props */
    /* EmailBarProps */
    /* ConditionalTitleProps */

/* Search Types */
    /* SearchBarProps */
    /* LoadingUXProps */ 
    /* ErrorUXProps */
    /* InvalidSearchUXProps */ 
    /* SearchCountriesProps */ 
    /* SelectedCountryProp */ 
    /* SetSelectedCountryCountryProp */
    /* SidePanelProps */
    /* SidePanelAddButtonProps */ 
    /* useHandleAddToListProps */
    /* AddButtonProps */

/*Profile Types*/

export type AuthMode = 'login' | 'register'

export type SubmitButtonProps = {
    onSubmit: () => Promise<void>
    loading: boolean
    mode: AuthMode
}

export type ToLoginRegisterButtonProps = {
    onSetMode: (value: React.SetStateAction<AuthMode>) => void
    onSetMessage: (value: React.SetStateAction<string>) => void
    mode: AuthMode
}

export type InputBarProps = {
    value: string
    onSetValue: (value:React.SetStateAction<string>) => void
}

export type ConditionalTitleProps = {
    mode: AuthMode
}

export type UseHandleSubmitProps = {
    onSetMessage: (value:React.SetStateAction<string>) => void
    onSetLoading: (value:React.SetStateAction<boolean>) => void
    mode: AuthMode
    supabase: SupabaseClient<any, "public", "public", any, any>
    email: string
    password:string

}

export type SearchBarProps = {
    search:string
    onSetSearch: (value : React.SetStateAction<string>) => void
}

export type LoadingUXProps = {
    loading:boolean
}

export type ErrorUXProps = {
    error : string | null 
}

export type InvalidSearchUXProps = {
    loading: boolean
    error: string | null 
    search: string
    countries: Country[]
}

export type SearchCountriesProps = {
    countries:Country[]
    onSetSelectedCountry: React.Dispatch<React.SetStateAction<Country | null>>
}

export type SelectedCountryProp = {
    onSelectedCountry: Country
}

export type SetSelectedCountryCountryProp = {
    onSetSelectedCountry: React.Dispatch<React.SetStateAction<Country | null>>
}

export type SidePanelProps = {
    onAddMessage : string | null
    onHandleAddToList: () => Promise<void>
    adding:boolean
    onSelectedCountry: Country | null
    onSetSelectedCountry: React.Dispatch<React.SetStateAction<Country | null>>
}

export type SidePanelAddButtonProps = {
    adding: boolean
    onHandleAddToList: React.Dispatch<React.SetStateAction<Country | null>>
}

export type useHandleAddToListProps ={
    onSelectedCountry: Country | null
    onSetAdding: React.Dispatch<React.SetStateAction<boolean>>
    onSetAddMessage: React.Dispatch<React.SetStateAction<string | null>>
}

export type AddButtonProps ={
    onHandleAddToList: () => Promise<void>
    adding: boolean
}

