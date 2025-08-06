function disableScroll() {
  const width = document.body.offsetWidth
  const scrollTop = window.pageYOffset ||  document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  document.body.style.position = 'fixed';
  if(scrollTop) {
    document.body.style.top = `-${scrollTop}px`;
  }
  document.body.style.left = `-${scrollLeft}px`;
  document.body.style.width = `${width}px`;
}

function enableScroll() {
  const scrollTop = parseInt(document.body.style.top || '0');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.width = '';
  window.scrollTo(0,(scrollTop * -1));
}

let lastY = 0;

document.addEventListener('DOMContentLoaded', function() {
  const sliderWrapper = document.querySelector('.slider__wrapper');
  const sliderLent = document.querySelector('.slider__lent');
  const windowHeight = window.innerHeight;


  // Обработчик события прокрутки
  function handleScroll(event) {
let deltaY = event?.deltaY || lastY
if(event.type === 'touchmove'){
  const currentY = event.touches[0].clientY; // Текущая позиция Y
  deltaY = currentY - lastY; // Разница между текущей и предыдущей позицией
}

    console.log('event',event);

    let lentWidth = sliderLent.scrollWidth;
    const minOffset = 0
    const maxOffset = lentWidth - sliderWrapper.offsetWidth

    const sliderTop = sliderWrapper.getBoundingClientRect().top
    const sliderBottom = sliderWrapper.getBoundingClientRect().bottom

    if (sliderTop > 0 && (sliderBottom - windowHeight) < 0) {
      disableScroll()


      let transform = 0
      if(sliderLent.style.transform) {
        transform = Number(sliderLent.style.transform.match(/\(([^)]+)px\)/)[1])
      }

      let direction = 1
      if (deltaY < 0) {
        direction = -1
      }

      const currentOffset = transform
      const newOffset = currentOffset + 150 * -direction

      sliderLent.style.transform = `translateX(${newOffset}px)`;

      if(deltaY > 0 && newOffset * -1 > maxOffset) {
        sliderLent.style.transform = `translateX(-${maxOffset}px)`;
        enableScroll()
      } else if(deltaY < 0 && newOffset * -1 < minOffset) {
        sliderLent.style.transform = `translateX(-${minOffset}px)`;
        enableScroll()
      }
    }
  }

  const throttled = throttle(handleScroll)

  // Добавляем обработчики событий
  document.addEventListener('wheel', throttled);
  document.addEventListener('touchmove', throttled);

  document.addEventListener('touchstart', (e) => {
  lastY = e.touches[0].clientY; // Запоминаем начальную позицию
}, {passive: true});

});
