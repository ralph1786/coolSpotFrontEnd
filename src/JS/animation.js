import anime from "animejs/lib/anime.es.js";

export const animationFunc = () => {
  //following code is from animeJS
  const morphing = anime({
    targets: ".polymorph",
    points: [
      {
        value: "215,110 0,110 0,0 47.7,0 67,76"
      },
      {
        value: "215,110 0,110 0,0 0,0 67,76"
      }
    ],
    easing: "easeInOutCirc",
    duration: 2000,
    loop: false
  });
  //removes button from layout
  //   btn.style.display = "none";
  anime({
    targets: "#blip",
    opacity: 1,
    duration: 2200,
    translateY: 150,
    easing: "easeInOutExpo"
  });
};

// window.addEventListener("load", () => {});
