const menuContainerElem = document.getElementById('menu-container')
const menuTogglerBtn = document.querySelector('.menu__toggler')
const menuItemsElem = document.querySelectorAll('.menu__list-item>a')
const themeBtn = document.querySelector('.theme-btn>a')

let currentTheme = null


menuTogglerBtn.addEventListener('click', (event) => {
  openMenu()

  window.addEventListener('click', (event) => {
    if (event.target.id == 'menu-container') {
      closeMenu()
    }
  })
})

menuItemsElem.forEach(item => {
  item.addEventListener('click', () => {
    closeMenu()
  })
})

themeBtn.addEventListener('click', () => {
  if( currentTheme === 'light'){
    renderTheme('dark')
    return
  }

  renderTheme('light')
})

const openMenu = () => {
  menuContainerElem.classList.add('active')
}

const closeMenu = () => {
  menuContainerElem.classList.remove('active')
}

const renderTheme = (mode) => {
  if(mode === 'light'){
    themeBtn.innerHTML = ''
    themeBtn.innerHTML = `
      Dark mode
      <i class="fa-solid fa-moon"></i>
    `
    document.documentElement.style.setProperty('--body-bg', '#fff')
    document.documentElement.style.setProperty('--elem-bg', 'rgba(0, 0, 0, 0.05)')
    document.documentElement.style.setProperty('--txt-p', '#000000')
    document.documentElement.style.setProperty('--txt-p-transparent', 'rgba(0, 0, 0, 0.7)')
    localStorage.setItem('user-theme', 'light')
    currentTheme = 'light'
  } else if (mode === 'dark') {
    themeBtn.innerHTML = ''
    themeBtn.innerHTML = `
      Light mode
      <i class="fa-solid fa-sun"></i>
    `
    document.documentElement.style.setProperty('--body-bg', '#121212')
    document.documentElement.style.setProperty('--elem-bg', 'rgba(255, 255, 255, 0.05)')
    document.documentElement.style.setProperty('--txt-p', '#ffffff')
    document.documentElement.style.setProperty('--txt-p-transparent', 'rgba(255,255,255, 0.7)')
    localStorage.setItem('user-theme', 'dark')
    currentTheme = 'dark'
  }
}

window.addEventListener('load', () => {
  currentTheme = localStorage.getItem('user-theme')

  if (!currentTheme) {
    localStorage.setItem('user-theme', 'light')
    renderTheme('light')
    return
  }

  renderTheme(currentTheme)
})