(function preloaderInit () {

  const preloader = document.getElementById('preloader')
  if(!preloader) {return}

  const preloaderLogo = document.getElementById('preloaderLogo')


  const isFirstOpen = sessionStorage.getItem('isFirstOpen')


  if(!isFirstOpen) {
    preloader.classList.add('preloader_animated')
    preloaderLogo.classList.add('preloader__logo_animated')
    sessionStorage.setItem('isFirstOpen', true)
  } else {
    preloader.remove()
  }
})()
