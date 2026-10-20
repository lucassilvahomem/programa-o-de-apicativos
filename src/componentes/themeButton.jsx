
function ThemeButton({ dark, onToggle }){
    return(
    <button 
    className = "theme-button"
    onClick={onToggle}>
    {dark ? 'tema-claro' : 'tema-escuro'}
    </button>
  )
}

export default ThemeButton