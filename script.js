function fadeIn(el) {
  el.style.opacity = 0;

  const scrollHandler = function () {
    if (isScrolledIntoView(el)) {
      el.style.opacity = 1;
      window.removeEventListener("scroll", scrollHandler);
    }
  };

  window.addEventListener("scroll", scrollHandler);
}

function fadeOut(el) {
  el.style.opacity = 1;

  const scrollHandler = function () {
    if (isScrolledIntoView(el)) {
      el.style.opacity = 0;

    }
  };

  window.addEventListener("scroll", scrollHandler);
}

function isScrolledIntoView(el) {
  const rect = el.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;

  // Only completely visible elements return true:
  const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
  return isVisible;
}

const mainParagraph = document.getElementById("main-paragraph");
const playBtn = document.getElementById("play-btn");
const mainTitle = document.getElementById("main-title");
const firstDownBtn = document.getElementById("first-down-btn");
const secondDownBtn = document.getElementById("second-down-btn");
const primerParrafo = document.getElementById("primer-parrafo");
const segundoParrafo = document.getElementById("segundo-parrafo");


/* const firstPar = document.getElementById */


const audio = new Audio("./music/Pink Floyd - Shine On You Crazy Diamond 1-5.mp3");

fadeIn(mainParagraph);
fadeIn(mainTitle);
fadeIn(firstDownBtn);
fadeIn(secondDownBtn);

playBtn.onclick = function () {
  fadeOut(playBtn)
  audio.play();
  document.body.classList.add("playing");

  // Scroll smoothly to the mainTitle element
   const scrollToMainTitle = () => {
    const mainTitleTop = mainTitle.offsetTop;
    const viewportHeight = window.innerHeight;
    const scrollTarget = mainTitleTop - viewportHeight / 3;
    const scrollStep =
      Math.abs(document.documentElement.scrollTop - scrollTarget) / 100;
    const scrollInterval = setInterval(() => {
      if (document.documentElement.scrollTop < scrollTarget) {
        document.documentElement.scrollTop += scrollStep;
        if (document.documentElement.scrollTop >= scrollTarget) {
          clearInterval(scrollInterval);
        }
      } else {
        document.documentElement.scrollTop -= scrollStep;
        if (document.documentElement.scrollTop <= scrollTarget) {
          clearInterval(scrollInterval);
        }
      }
    }, 25);
  };
 
  // Wait a short time before scrolling to the mainTitle element
  setTimeout(scrollToMainTitle, 500);
};

function scrollToTop() {
  const secondDownBtnTop = secondDownBtn.getBoundingClientRect().bottom;
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  window.scrollTo({
    top: currentScroll + primerParrafoTop,
    behavior: "smooth"
  });
}

firstDownBtn.addEventListener("click", scrollToTop);

function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  const elementRect = element.getBoundingClientRect();
  const offset = window.pageYOffset || document.documentElement.scrollTop;
  const elementTop = elementRect.top + offset;
  const elementHeight = elementRect.height;
  const windowHeight = window.innerHeight;
  const scrollTarget = Math.floor(elementTop + elementHeight / 2 - windowHeight / 2);
  window.scrollTo({
    top: scrollTarget,
    behavior: 'smooth'
  });
}

secondDownBtn.addEventListener("click", function() {
  scrollToElement("segundo-parrafo");
});




window.addEventListener("scroll", () => {
  const paragraphs = document.querySelectorAll(".paragraph");
  const triggerBottom = window.innerHeight * 0.8;

  paragraphs.forEach((paragraph) => {
    console.log("animation");
    const paragraphTop = paragraph.getBoundingClientRect().top;

    if (paragraphTop < triggerBottom) {
      paragraph.classList.add("animate");
    } else {
      paragraph.classList.remove("animate");
    }
  });
});

