const menuContainerElem = document.getElementById('menu-container')
const menuTogglerBtn = document.querySelector('.menu__toggler')
const menuItemsElem = document.querySelectorAll('.menu__list-item')


menuTogglerBtn.addEventListener('click', (event) => {
  openMenu()

  window.addEventListener('click', (event) => {
    if(event.target.id == 'menu-container'){
      closeMenu()
    }
  })
})

menuItemsElem.forEach(item => {
  item.addEventListener('click', () => {
    closeMenu()
  })
})

const openMenu = () => {
  menuContainerElem.classList.add('active')
}

const closeMenu = () => {
  menuContainerElem.classList.remove('active')
}