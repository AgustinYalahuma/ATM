"use strict";
//BARRA DE PROGRESO
const progress = document.getElementById("progress");
const circles = document.querySelectorAll(".circle");

// BOTONES
const next = document.getElementById("next");
const prev = document.getElementById("prev");
let buttons = document.querySelectorAll("button");

const input = document.querySelector(".monto");

const containers = document.querySelectorAll(".container");
let contadorPagina = 1;
let currentActive = 1;

const cambioDePagina = (e) => {
  currentActive++;
  switch (e.parentNode.classList[0]) {
    case "counts":
      contadorPagina = 2;
      break;
    case "action-container":
      contadorPagina = 3;
      break;
    default:
      "";
  }

  if (currentActive > 4) currentActive = circles.length;
  if (currentActive == contadorPagina) next.disabled = true;

  if (currentActive == 3) {
    const personasInput = document.getElementsByName("persona");
    personasInput.forEach((persona) =>
      persona.addEventListener("click", () => {
        input.disabled = false;
        input.focus();
      })
    );
    input.addEventListener("input", (e) => {
      if (e.target.value != "") confirmar.disabled = false;
      else confirmar.disabled = true;
    });
    confirmar.addEventListener("click", () => {
      const dinero = input.value;
      const personaDestino = Array.from(personasInput).filter(
        (persona) => persona.checked
      );
      document.querySelector(".deposito2 p span").textContent += dinero;
      document.querySelector(".transferencia2 p span:first-child").textContent =
        personaDestino[0].parentNode.textContent;
      document.querySelector(".transferencia2 p span:last-child").textContent +=
        dinero;
    });
  }

  update();
  activePage();
};
buttons = Array.from(buttons).filter((button) => button.id != "prev");
buttons.forEach((button) =>
  button.addEventListener("click", () => cambioDePagina(button))
);

let activeElement = containers[currentActive - 1];
activeElement.classList.add("activo");

const activePage = () => {
  activeElement.classList.remove("activo");
  activeElement = containers[currentActive - 1];
  activeElement.classList.add("activo");
};

prev.addEventListener("click", () => {
  next.disabled = false;
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
  } else {
    prev.disabled = false;
  }
}

// ------------------------------------------ INDEX ----------------------------------------------------
const countButton = document.querySelectorAll(".count");
const depositarBtn = document.querySelector(".depositar-btn");
const transferirBtn = document.querySelector(".transferir-btn");
const depositar = document.querySelector(".depositar");
const transferir = document.querySelector(".transferir");
const confirmar = document.querySelector(".confirm");

let saldo = document.querySelector(".saldo-personal");
let cuentas = [
  {
    id: "1",
    nombre: "Juan Perez",
    saldo: 5000,
  },
  {
    id: "2",
    nombre: "Maria Lopez",
    saldo: 10000,
  },
  {
    id: "3",
    nombre: "Pedro Rodriguez",
    saldo: 7500,
  },
  {
    id: "4",
    nombre: "Luisa Martinez",
    saldo: 2000,
  },
];

let cuentaElegida;
const elegirCuenta = (name) => {
  for (const i in cuentas) {
    if (cuentas[i].nombre == name.textContent) {
      cuentaElegida = cuentas[i];
      break;
    }
  }
  saldo.textContent = "$" + cuentaElegida.saldo;
};
countButton.forEach((button) => {
  button.addEventListener("click", () => {
    countButton.forEach((button) => button.classList.remove("activo"));
    button.classList.add("activo");
    elegirCuenta(button);
    const btnActivo = document.querySelector(
      ".action-container .button.activo"
    );
    if (btnActivo != null) btnActivo.classList.remove("activo");
  });
});
const depositar2 = document.querySelector(".deposito2");
const transferir2 = document.querySelector(".transferencia2");
const actionDepTra = (btn1, btn2, dep, trans) => {
  btn1.classList.add("activo");
  btn2.classList.remove("activo");
  depositar.style.display = dep;
  depositar2.style.display = dep;
  transferir.style.display = trans;
  transferir2.style.display = trans;
};

depositarBtn.addEventListener("click", () => {
  actionDepTra(depositarBtn, transferirBtn, "flex", "none");
});
transferirBtn.addEventListener("click", () =>
  actionDepTra(transferirBtn, depositarBtn, "none", "flex")
);
