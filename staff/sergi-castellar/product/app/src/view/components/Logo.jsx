import {useNavigate} from 'react-router'

export function Logo() {
    const navigate = useNavigate()

    const handleLogoClick = () => navigate('/')

    return <>
        <img onClick={handleLogoClick} className="main-logo" src="../src/assets/isdigram_logo.svg" alt="isdigram_logo" width={'100px'}/>
    </>
}