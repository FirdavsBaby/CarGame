let track = document.querySelector(".parent");
let car = document.querySelector(".car");
let wheel1 = document.querySelector(".wheel1");
let wheel2 = document.querySelector(".wheel2");
let fuel = document.querySelector(".fuel");
let z = document.querySelector(".z");
let y = document.querySelector(".y");
let t = document.querySelector(".t");
let o = document.querySelector(".o");
let zp = document.querySelector(".zp");
let body = document.querySelector("body");
let sound = document.querySelector("#engine_sound");
class Car {
  started = false;
  moving = false;
  gas = 50;
  gasIntervalId = null;
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  start() {
    if (this.started) {
      sound.setAttribute("src", "./audio/04444.mp3");
      sound.play();
    } else {
      this.started = true;
      sound.setAttribute("src", "./audio/start.mp3");
      sound.play();
      setTimeout(() => {
        sound.pause();
      }, 4000);
      this.gasIntervalId = setInterval(() => {
        this.gas--;
        fuel.textContent = `Fuel: ${this.gas}`;
        if (this.gas < 10 && this.gas !== 0) {
          fuel.style.color = "red";
        }
         if (this.gas <= 0) {
           fuel.textContent = "Benzin tugadi zapravka qilin!";
           clearInterval(this.gasIntervalId);
           track.classList.remove("start-track");
           wheel1.classList.remove("start-wheels");
           wheel2.classList.remove("start-wheels");
           this.moving = false
           sound.pause();
         }
      }, 10000);
    }
  }
  move() {
    if (!this.started) {
      alert(`${this.name} zavad qilinmagan!`);
      return;
    }
    if (this.gas <= 0) {
        alert("Moshinani behzini yoq!")
        return
    }
    if (this.moving) {
      alert(`${this.name} itak yurvotti`);
      return;
    } else {
      this.moving = true;
      track.classList.add("start-track");
      wheel1.classList.add("start-wheels");
      wheel2.classList.add("start-wheels");
      sound.setAttribute("src", "./audio/move.mp3");
      sound.play();
      this.gasIntervalId = setInterval(() => {
        this.gas--;
        fuel.textContent = `Fuel: ${this.gas}`;
        if (this.gas < 10 && this.gas !== 0) {
          fuel.style.color = "red";
        }
        if (this.gas <= 0) {
          fuel.textContent = "Benzin tugadi zapravka qilin!";
          clearInterval(this.gasIntervalId);
          track.classList.remove("start-track");
          wheel1.classList.remove("start-wheels");
          wheel2.classList.remove("start-wheels");
          this.moving = false
          sound.pause()
        }
      }, 1000);
    }
  }
  stop() {
    this.moving = false;
    track.classList.remove("start-track");
    wheel1.classList.remove("start-wheels");
    wheel2.classList.remove("start-wheels");
    sound.pause();
    clearInterval(this.gasIntervalId);
  }
  off() {
    if (!this.started) {
      alert(`${this.name} zavat bomaganku ozi.`);
      return;
    }

    if (this.moving) {
      alert("Oldin moshinani toxtat");
      return;
    } else {
      this.started = false;
      alert(`${this.name} ocdi`);
      clearInterval(this.gasIntervalId);
    }
  }
  fuelZ() {
    this.gas = 50
    fuel.textContent = `Fuel: ${this.gas}`
    fuel.style.color = "black";
  }
}
function createCar(car_name) {
  let cCar = new Car(car_name, "2023");
  z.addEventListener("click", () => {
    cCar.start();
    car.classList.add("start-car");
  });
  y.addEventListener("click", () => {
    cCar.move();
  });
  t.addEventListener("click", () => {
    cCar.stop();
  });
  o.addEventListener("click", () => {
    cCar.off();
    car.classList.remove("start-car");
  });
  zp.addEventListener("click", () => {
    cCar.fuelZ();
  });
  return cCar;
}
let typecar = prompt("Moshinangizni ismini yozin!");
createCar(typecar);
