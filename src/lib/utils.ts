export const toggleBackgroundBlur = (blur: boolean) => {
  const backgroundElements = document.querySelectorAll(
    ".blur-background"
  ) as NodeListOf<HTMLElement>;

  backgroundElements.forEach((element) => {
    if (blur) {
      element.classList.add("blur");
    } else {
      element.classList.remove("blur");
    }
  });
};
