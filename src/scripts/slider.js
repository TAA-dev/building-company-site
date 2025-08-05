document.addEventListener('DOMContentLoaded', function() {
  const sliderWrapper = document.querySelector('.slider__wrapper');
  const sliderLent = document.querySelector('.slider__lent');
  const windowHeight = window.innerHeight;


  // Обработчик события прокрутки
  function handleScroll() {
    let lentWidth = sliderLent.scrollWidth;
    const maxOffset = lentWidth - sliderWrapper.offsetWidth

    const sliderTop = sliderLent.getBoundingClientRect().top
    const sliderBottom = sliderLent.getBoundingClientRect().bottom
    const sliderHeight = sliderLent.getBoundingClientRect().height

    if (sliderTop > 0 && (sliderBottom - windowHeight) < 0) {
      const height = windowHeight - sliderHeight
      const percent = ((height - sliderTop) / height)
      const offset = maxOffset * percent
      sliderLent.style.transform = `translateX(-${offset}px)`;
    } else if (sliderTop > 0) {
      sliderLent.style.transform = `translateX(-${0}px)`;
    } else {
      sliderLent.style.transform = `translateX(-${maxOffset}px)`;
    }
  }

  // Добавляем обработчики событий
  window.addEventListener('scroll', handleScroll);

  // Вызываем сразу при загрузке
  handleScroll();
});
