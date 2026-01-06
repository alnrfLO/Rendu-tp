const helice = document.querySelector('img'); /*reprendre l image dans le html */
window.onscroll = function () { /* si en  scrollant dans la fenetre alors on prend la fonction en dessous assigner scrollRotate */
    scrollRotate();
};
function scrollRotate() { /* definit la fonction scrollrotate   */
    helice.style.transform = "rotate(" + window.pageYOffset/2 + "deg)";
}
/*rotate = deja une fonction pour faire une rotations   */
/* helice.style.transform = helice prend le style et la transformations  */
/* window.pageYOffset/2 = pour le  nombre de pixel parcouru diviser par 2  */