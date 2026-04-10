const imagens = document.querySelectorAll(".galeria_item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const contador = document.getElementById("contador");

const close = document.querySelector(".close");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let indexAtual = 0;

imagens.forEach((img, index) => {
    img.addEventListener("click", () => {
        indexAtual = index;
        atualizarImagem();
        lightbox.classList.add("show");
    });
});

function atualizarImagem() {

    lightboxImg.classList.add("fade");

    setTimeout(() => {
        lightboxImg.src = imagens[indexAtual].src;

        contador.textContent = `${indexAtual + 1} / ${imagens.length}`;

        lightboxImg.classList.remove("fade");
    }, 150);
}

close.addEventListener("click", () => {
    lightbox.classList.remove("show");
});

lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg && e.target !== prev && e.target !== next) {
        lightbox.classList.remove("show");
    }
});

next.addEventListener("click", (e) => {
    e.stopPropagation();
    indexAtual = (indexAtual + 1) % imagens.length;
    atualizarImagem();
});

prev.addEventListener("click", (e) => {
    e.stopPropagation();
    indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
    atualizarImagem();
});

document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;

    if (e.key === "ArrowRight") next.click();
    if (e.key === "ArrowLeft") prev.click();
    if (e.key === "Escape") lightbox.classList.remove("show");
});

