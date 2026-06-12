import { useEffect, useState } from "react"
import { UsuarioContext } from "./UsuarioContext"

const UsuarioProvider = ( {children} ) => {
    const [usuario, setUsuario] = useState(null)
   

    // ciclo de vida
    useEffect(()=>{
        // ao montar o componente, pega os dados do usuário do localStorage
        const usuarioStorage = JSON.parse(localStorage.getItem("usuario")) || null
        setUsuario(usuarioStorage)
    },[])
    return (
        <UsuarioContext.Provider
            value={{
                usuario, 
                setUsuario
            }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}


export default UsuarioProvider