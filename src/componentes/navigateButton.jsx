import {link} from "react-router-dom"

function NavigateButton ({path, nome}) {
    return <link to={path}>
    {nome}
    </link>
}

export default NavigateButton