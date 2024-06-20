export default {
  mounted(el, binding) {
    let startX;
    let currentX;
    let diffX;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      el.style.transition = "transform 0s";
    };

    const handleTouchMove = (e) => {
      currentX = e.touches[0].clientX;
      diffX = currentX - startX;
      el.style.transform = `translateX(${diffX}px)`;
    };

    const handleTouchEnd = () => {
      el.style.transition = "transform 0.3s ease";
      if (diffX < -100) {
        el.classList.add("swiped-left");
        binding.value("left");
      } else {
        el.style.transform = "translateX(0)";
        el.classList.remove("swiped-left");
      }
      startX = null;
      currentX = null;
      diffX = null;
    };

    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchmove", handleTouchMove);
    el.addEventListener("touchend", handleTouchEnd);
  },
};
