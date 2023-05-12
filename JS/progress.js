//BARRA DE PROGRESO
const progress = document.getElementById("progress");
const circles = document.querySelectorAll(".circle");

// BOTONES
const next = document.getElementById("next");
const prev = document.getElementById("prev");
let buttons = document.querySelectorAll("button");

const containers = document.querySelectorAll(".container");
let currentActive = 1;

const cambioDePagina = () => {
  currentActive++;

  if (currentActive > circles.length) {
    currentActive = circles.length;
  }

  // if (currentActive == 3) {
  //   const personasInput = document.getElementsByName("persona");
  //   let personaDestino = Array.from(personasInput).filter(
  //     (persona) => persona.checked
  //   );
  //   const input = document.querySelector(".monto");
  //   if (!personaDestino || input.value == "") next.disabled = true;
  // }

  update();
  activePage();
};

buttons = Array.from(buttons).filter((button) => button.id != "prev");
buttons.forEach((button) => button.addEventListener("click", cambioDePagina));

let activeElement = containers[currentActive - 1];
activeElement.classList.add("activo");

const activePage = () => {
  activeElement.classList.remove("activo");
  activeElement = containers[currentActive - 1];
  activeElement.classList.add("activo");
};

prev.addEventListener("click", () => {
  currentActive--;

  if (currentActive < 1) {
    currentActive = 1;
  }

  update();
  activePage();
});

function update() {
  circles.forEach((circle, idx) => {
    if (idx < currentActive) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  const actives = document.querySelectorAll(".active");

  progress.style.width =
    ((actives.length - 1) / (circles.length - 1)) * 100 + "%";

  if (currentActive === 1) {
    prev.disabled = true;
    //   } else if (currentActive === circles.length) {
    //     next.disabled = true;
  } else {
    prev.disabled = false;
    // next.disabled = false;
  }
}
