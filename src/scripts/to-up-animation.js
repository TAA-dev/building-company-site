const TO_UP_ANIMATION_MIN_VISIBILITY_PART = 0.1

const elementsWithContentForToUpAnimation = document.querySelectorAll('.to-up-animation-wrapper')

if(elementsWithContentForToUpAnimation) {
  elementsWithContentForToUpAnimation.forEach(element => {
    element.classList.add('to-up-animation-init-position')
  })
}



function toUpAnimateContent() {
  if(elementsWithContentForToUpAnimation) {
   elementsWithContentForToUpAnimation.forEach((element) => {
      element.classList.add('to-up-animation')
    })
  }
}



class ToUpVisibilityManager {
  constructor() {
    this.elements = elementsWithContentForToUpAnimation
    this.init()
  }

  init() {
    this.checkVisibility()
    window.addEventListener('scroll', this.debounce(this.checkVisibility.bind(this), 20))
    window.addEventListener('resize', this.debounce(this.checkVisibility.bind(this), 20))
  }

  checkVisibility() {
    this.elements.forEach(element => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
      const isVisible = visibleHeight >= rect.height * TO_UP_ANIMATION_MIN_VISIBILITY_PART && rect.top <= windowHeight


      if(isVisible && !element.isVisibleChanged) {
        toUpAnimateContent()
        element.isVisibleChanged = true
      }
    })
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ToUpVisibilityManager();
});
