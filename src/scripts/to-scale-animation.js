const TO_SCALE_ANIMATION_MIN_VISIBILITY_PART = .5


const elementsForToScaleAnimation = document.querySelectorAll('.to-scale-animation-element')

if(elementsForToScaleAnimation) {
  elementsForToScaleAnimation.forEach(element => {
    element.classList.add('to-scale-animation-element-init-position')
  })
}


function toScaleAnimateContent() {
  if(elementsForToScaleAnimation) {
   elementsForToScaleAnimation.forEach((element) => {
      element.classList.add('to-scale-animation')
    })
  }
}



class ToScaleVisibilityManager {
  constructor() {
    this.elements = elementsForToScaleAnimation
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
      const isVisible = visibleHeight >= rect.height * TO_SCALE_ANIMATION_MIN_VISIBILITY_PART && rect.top <= windowHeight

      if(isVisible && !element.isVisibleChanged) {
        toScaleAnimateContent()
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
  new ToScaleVisibilityManager();
});
