
document.addEventListener("DOMContentLoaded", function (){
    iniciarApp();
});


function iniciarApp () {
    navegacionFija();
    crearGaleria ();
    scrollNav();
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');


    window.addEventListener('scroll', function() {
        if ( sobreFestival.getBoundingClientRect().bottom < 0 ) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}



function scrollNav () {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e){

            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth"});

        });
    })
}

function crearGaleria () {                                   // esta f () crea la galería en html desde js.
    const galeria = document.querySelector('.galeria-img');  // selecciona el ul con la clase galeria-img

    for (let i=1; i<=12; i++){
        const imagen = document.createElement("picture")     // un for para crear los elementos de picture
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" src="build/img/thumb/${i}.jpg" alt="imagen galeria">`;
        
        galeria.appendChild(imagen);                         // a la const donde guardo la clase del ul le agrego
                                                             // la const con las imágenes
        imagen.onclick = function (){                        // le agrego una f () cuando haga click
            mostrarImagen(i);
        }
    }
}

function mostrarImagen (id) {
    const imagen = document.createElement('picture')
    imagen.innerHTML = 
    `<source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" src="build/img/grande/${id}.jpg" alt="imagen galeria">`;

    // crea el overlay con la img
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    overlay.onclick = function (){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
        overlay.remove();
    }

    // agrega al html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body')

    // boton para cerrar
    const cerraModal = document.createElement('P');
    cerraModal.textContent = 'X';
    cerraModal.classList.add('btn-cerrar');
    cerraModal.onclick = function (){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
        overlay.remove();
    }
    overlay.appendChild(cerraModal);

}