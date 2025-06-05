import { createContext, useState  } from "react"; // importando o Hook de "createContext"

export const themes = {
    light:{
        color:'#000000',
        background:'#eeeeee'
    },
    dark:{
        color:'#ffffff',
        background:'#000000'
    }
}

export const ThemeContext = createContext({}); // recebe um objeto vazio no momento em que esse hook cria o contexto para o objeto "ThemeContext".

export const ThemeProvider = (props) => {
    // Recuperando as preferências do usuário salvas no localStorage
    const storagedState = JSON.parse(localStorage.getItem("userTheme"));
    // console.log(storagedState);
    // Criando estados para enviar para quem chamar o "ThemeProvider"
    const [currentTheme, setCurrentTheme] = useState(storagedState ||themes.light) // Já começará com o tema "light"
    return(
        <ThemeContext.Provider value={{currentTheme, setCurrentTheme}}> {/** Passando um objeto com o "currentTheme" e o "setCurrentTheme" para poder usar nos componentes filhos. */}
            {props.children}
        </ThemeContext.Provider>
    )
}