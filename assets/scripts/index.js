import projects from './db.js'
const menuContainerElem = document.getElementById('menu-container')
const menuTogglerBtn = document.querySelector('.menu__toggler')
const menuItemsElem = document.querySelectorAll('.menu__list-item>a')
const themeBtn = document.querySelector('.theme-btn>a')
const filterBtns = document.querySelectorAll('.projects__filter-btn')
const projectsContainerElem = document.querySelector('.projects__container')

let currentTheme = null

class Typewriter {
  constructor(el, options) {
    this.el = el
    this.words = [...this.el.dataset.typewrite.split(',')]
    this.speed = options?.speed || 150
    this.delay = options?.delay || 1500
    this.repeat = options?.repeat
    this.initTyping()
  }

  wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  toggleTyping = () => {
    this.el.classList.toggle('blink')
  }

  async typewrite(word) {
    await this.wait(this.delay)
    this.toggleTyping()
    for (const letter of word.split('')) {
      this.el.textContent += letter
      await this.wait(this.speed)
    }
    this.toggleTyping()
    await this.wait(this.delay)
    this.toggleTyping()

    while (this.el.textContent.length !== 0) {
      this.el.textContent = this.el.textContent.slice(0, -1)
      await this.wait(this.speed)
    }
    this.toggleTyping()
  }

  async initTyping() {
    for (const word of this.words) {
      await this.typewrite(word)
    }

    if (this.repeat) {
      await this.initTyping()
    }
  }
}

const el = new Typewriter(document.querySelector('.hero__content-tw'), {
  speed: 150,
  delay: 2000,
  repeat: true
})

filterBtns.forEach(btn => {
  btn.addEventListener('click', (event) => {
    filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'))
    event.target.classList.add('active')
    let filterType = event.target.getAttribute('data-projtype')
    renderProjects(filterType)
  })
})

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
  if (currentTheme === 'light') {
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
  if (mode === 'light') {
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

const renderProjects = (projectType) => {
  
  projectsContainerElem.innerHTML = ''

  if(projectType === 'all'){
    projects.forEach(project => {
      projectsContainerElem.innerHTML += `
      <div class="projects__box">
        <img src="${project.img}">
        <p class="projects__box-type">
          ${project.type}
        </p>
        <p class="projects__box-title">
          ${project.title}
        </p>
      </div> 
      `
    })
    return
  }

  let filteredProjects = projects.filter(project => {
    return project.type === projectType
  })

  filteredProjects.forEach(project => {
    projectsContainerElem.innerHTML += `
    <div class="projects__box">
      <img src="${project.img}">
      <p class="projects__box-type">
        ${project.type}
      </p>
      <p class="projects__box-title">
        ${project.title}
      </p>
    </div> 
    `
  })
}

window.addEventListener('load', () => {
  currentTheme = localStorage.getItem('user-theme')

  if (!currentTheme) {
    localStorage.setItem('user-theme', 'light')
    renderTheme('light')
    return
  }

  renderTheme(currentTheme)

  filterBtns.forEach(btn => {
    if (btn.classList.contains('active')) {
      let projectType = btn.getAttribute('data-projtype')
      renderProjects(projectType)
    }
  })
})