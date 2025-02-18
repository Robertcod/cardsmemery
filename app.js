
const imagenes = [
  {
      
src: "/logos/ChatGPT-Logo.svg.png",
titulo: "ChatGPT",
descripcion: "Artificial intelligence automatically and personally answers",
},
{
src: "/logos/html.png",
titulo: "HTML5",
descripcion: "Markup language used to structure web content",
},
{
src: "/logos/git.png",
titulo: "Git",
descripcion: "Distributed version control system for managing source code",
},
{
src: "/logos/Laravel.svg.png",
titulo: "Laravel",
descripcion: "PHP framework for web application development",
},
{
src: "/logos/javalogo.png",
titulo: "Java",
descripcion: "Object-oriented, platform-independent programming language",
},
{
src: "/logos/JavaScript-logo.png",
titulo: "JavaScript",
descripcion: "Programming language used to create interactivity on the web",
},
{
src: "/logos/winndows.png",
titulo: "Windows",
descripcion: "Microsoft operating system used on PCs",
},
{
src: "/logos/python.png",
titulo: "Python",
descripcion: "High-level programming language that is easy to learn",
},
{
src: "/logos/chrome.png",
titulo: "Google Chrome",
descripcion: "Google's web browser known for its speed and efficiency",
},
{
src: "/logos/vscode.png",
titulo: "VS Code",
descripcion: "Source code editor developed by Microsoft",
}
];

const bg = document.querySelector('.bg'); 
let load = 0;

let interval = setInterval(blurring, 40);

function blurring() {
    load+= 0.3;
    if (load > 100) {
        clearInterval(interval);
    }

    bg.style.filter = `blur(${scale(load, 0, 200, 0, 30)}px)`;
}


function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}





let tarjetas = [...imagenes, ...imagenes];
let tarjetasVolteadas = [],
  parejasEncontradas = 0;
let bloqueado = false;
function mezclar(array) {
  return array.sort(() => Math.random() - 0.5);
}
function crearTablero() {
  const tablero = document.getElementById("tablero");
  tablero.innerHTML = "";
  tarjetas = mezclar(tarjetas);
  tarjetas.forEach((item, indice) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta", "relative", "cursor-pointer");
    tarjeta.dataset.indice = indice;
    tarjeta.dataset.titulo = item.titulo;
    tarjeta.dataset.descripcion = item.descripcion;
    tarjeta.dataset.src = item.src;
    tarjeta.innerHTML = `
              <div class="frente">
                  <img src="${item.src}" class="w-16 h-16">
              </div>
              <div class="dorso">?</div>
          `;
    tarjeta.addEventListener("click", voltearTarjeta);
    tablero.appendChild(tarjeta);
  });
}
function voltearTarjeta() {
  if (bloqueado || this.classList.contains("volteada")) return;
  this.classList.add("volteada");
  tarjetasVolteadas.push(this);
  if (tarjetasVolteadas.length === 2) {
    bloqueado = true;
    setTimeout(verificarPareja, 1000);
  }
}
function verificarPareja() {
  const [tarjeta1, tarjeta2] = tarjetasVolteadas;
  if (tarjeta1.dataset.src === tarjeta2.dataset.src) {
    parejasEncontradas++;
    mostrarModal(
      tarjeta1.dataset.src,
      tarjeta1.dataset.titulo,
      tarjeta1.dataset.descripcion
    );
    if (parejasEncontradas === imagenes.length) {
      setTimeout(
        () => alert("¡Felicidades! Has encontrado todas las parejas."),
        500
      );
    }
  } else {
    tarjeta1.classList.remove("volteada");
    tarjeta2.classList.remove("volteada");
  }
  tarjetasVolteadas = [];
  bloqueado = false;
}
function mostrarModal(imagen, titulo, descripcion) {
  document.getElementById("imagenModal").src = imagen;
  document.getElementById("tituloModal").innerText = titulo;
  document.getElementById("descripcionModal").innerText = descripcion;
  document.getElementById("modal").classList.remove("hidden");
}
function cerrarModal() {
  document.getElementById("modal").classList.add("hidden");
}
crearTablero();
