import { useContext } from "react"
import { ThemeContext, themes } from "../contexts/ThemeContext"
import { Button } from "./Button"
import styled from "styled-components"
import { SunMoon } from 'lucide-react';

const ThemeTogglerButton = () => {

    const { currentTheme, setCurrentTheme } = useContext(ThemeContext)
    // console.log("ThemeTogglerButton themes ", currentTheme, setCurrentTheme)
    
    return(
        <Div className='brunoGGFGHI'>
            {/* Generic Button */}

            <Button
            // Verificar se o meu tema atual dado pela variável "currentTheme", que veio como prop, é igual ao meu tema "light" provido pelo contexto criado no componente "ThemeProvider", componente esse que foi chamado lá no componente "App.jsx". Se for igual, vou mudar pro tema "dark", se não, mudo significa que o "currentTheme" é "dark", então, preciso passá-lo para "light".
                 onClick={() => {
                    // Salvando no localSotrage para armazenar preferências do usuário
                    const newState = currentTheme === themes.light ? themes.dark : themes.light;
                    localStorage.setItem("userTheme", JSON.stringify(newState) );
                    setCurrentTheme( newState );
                 }} // Sua lógica de toggle aqui

                title="Alternar tema claro/escuro" // Este é o tooltip!
                
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
                
                aria-label="Alternar tema claro/escuro" // Bom para acessibilidade
            >
                <SunMoon size={24} color="black" style={ {background: "white"}} />
            </Button>

        </Div>
    )



}

const Div = styled.div`
    position: absolute;
    width:50px;

    display: flex;
    flex-direction: row-reverse; /* Ou column-reverse, dependendo da sua necessidade */
    // justify-content: flex-end;
    
    // bottom: 0;        /* Posiciona no final (inferior) */
    right: 0;         /* Posiciona na extremidade direita */
    top: 0;          /* Posiciona no topo (para ocupar a altura total) */
  
`

export { ThemeTogglerButton }