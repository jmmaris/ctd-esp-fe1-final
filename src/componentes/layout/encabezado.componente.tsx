import { FC } from "react";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import { resetearPagina } from "../../actions/pagina.action";
import './encabezado.css';

/**
 * Encabezado que contiene los links para navegar entre las páginas
 *
 * Uso: `<Encabezado />`
 *
 * @returns {JSX.Element}
 */
const Encabezado: FC = () => {
    const dispatch = useDispatch();
    return <header>
            <div>
                <div>
                    <h2>Examen Final de Frontend IV</h2>
                </div>
                <nav>
                    <ul>
                        {/* Cuando accedo a Inicio o Favoritos desde el boton de Navegacion, quiero que se reinicien las paginas */}
                        <li><Link to="/" onClick={() => dispatch(resetearPagina())}>Inicio</Link></li>
                        <li><Link to="/favoritos" onClick={() => dispatch(resetearPagina())}>Favoritos</Link></li>
                        <li><Link to="/detalle/last">Detalle</Link></li>
                    </ul>
                </nav>
            </div>
    </header>
}

export default Encabezado