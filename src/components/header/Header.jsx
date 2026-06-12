import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsuarioContext } from "../../context/UsuarioContext";

const Header = () => {

    const { setUsuario } = useContext(UsuarioContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
        navigate("/");
    };

    return (
        <header>
            <div className="cabecalho">
                <nav className="nav_header">
                    <Link className="link_header" to="/cursos">Cursos</Link>
                    <Link className="link_header" to="/generos">Cadastro Curso</Link>
                    <button className="link_header btn_logout" onClick={logout}>Logout</button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
