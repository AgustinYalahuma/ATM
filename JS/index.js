"use strict";
const countButton = document.querySelectorAll(".count");
const depositarBtn = document.querySelector(".depositar-btn");
const transferirBtn = document.querySelector(".transferir-btn");
const depositar = document.querySelector(".depositar");
const transferir = document.querySelector(".transferir");

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
  });
});

const actionDepTra = (btn1, btn2, dep, trans) => {
  btn1.classList.add("activo");
  btn2.classList.remove("activo");
  depositar.style.display = dep;
  transferir.style.display = trans;
};

depositarBtn.addEventListener("click", () =>
  actionDepTra(depositarBtn, transferirBtn, "flex", "none")
);
transferirBtn.addEventListener("click", () =>
  actionDepTra(transferirBtn, depositarBtn, "none", "flex")
);
