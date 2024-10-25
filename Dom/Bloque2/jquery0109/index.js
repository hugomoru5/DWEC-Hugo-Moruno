"use strict";

/**
 * @author = Hugo Moruno Parra
 * 
 * @fecha = '09/10/2024'
 */

/**
 * @name = Variables de inicio.
 */

let info = $('#coordenadas');
let campo = $('#campodejuego');
let blob = $('#blob');

/**
 * @name = Main.
 */

$(window).on('load', () => {
    const delay = 1000;
    setInterval(moverBlob, delay);

    campo.on('mousemove', function(e) {
        let x = e.offsetX;
        let y = e.offsetY;

        info.text(`Coordenadas: (${x}, ${y})`);
    });

    blob.on('click', function() {
        let red = Math.floor(Math.random()*255);
        let green = Math.floor(Math.random()*255);
        let blue = Math.floor(Math.random()*255); 
        blob.css('background-color', 'rgb('+red+","+green+","+blue+')');
    });
});

/**
 * @name = Functions.
 */

function moverBlob(){
    let newLeft = Math.floor(Math.random() * (400 - 35));
    let newTop = Math.floor(Math.random() * (400 - 35));
    blob.css('left', `${newLeft}px`);
    blob.css('top', `${newTop}px`);
}