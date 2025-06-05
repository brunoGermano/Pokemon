import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

export const Button = (props) => {
    const { currentTheme, setCurrentTheme } = useContext(ThemeContext)
    // console.log("Button Themes: ", theme)
    // console.log("Button props: ", props)
    return(
        <button 
            {...props}
            style={{color: currentTheme.color, backgroundColor: currentTheme.background}} // lembrando que as primeiras "{}" são para código JS e as segundas porque o atributo style necessita de um objeto do tipo chave e valor!
        />
    )
}

