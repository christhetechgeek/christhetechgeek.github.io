const cube = document.querySelector(".cube");
const body = document.querySelector("body");

window.addEventListener("mousedown", function (e) {
    const x = e.clientX;
    const y = e.clientY;

    windowndow.addEventListener("mousemove", moveRotate); 
    function moveRotate(e) {
        cube.style.transform =
         `rotateX(${(e.clientY - y) / 4}deg) 
         rotateY(${(e.clientX - x) / 4}deg)`;

         body.style.cursor = "grabbing";
    }

         window.addEventListener("mouseup", function () {
             
             window.removeEventListener("mousemove", moveRotate);
             body.style.cursor = "context-menu";
         });
    
});