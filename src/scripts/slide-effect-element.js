const elementList  = document.querySelectorAll('.slide-effect-element')
elementList.forEach(item => {
  item.isProcess = false
  item.boundaryPosition = 'start'
  item.children[1].style.transition = 'clip-path 1.5s ease'
  item.children[1].style['clip-path'] = 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)'


  item.addEventListener('mouseenter', slideElement)
})



function slideElement (event)  {
  const element = event.target

  const childrenList = element.children
  if(element.isProcess){
    return
  }

    element.isProcess = true

    if(element.boundaryPosition === 'start') {
      element.boundaryPosition = 'end'
      childrenList[1].style['clip-path'] = 'polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)'
    } else {
      element.boundaryPosition = 'start'
      childrenList[1].style['clip-path'] = 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)'
    }


  setTimeout(() => {
    element.isProcess= false
  }, 1500)

}
