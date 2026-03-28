// Funksioni i ndryshimit te backgroundit te seksionit pas 5 sekondave
function changeSectionBackground() {
    var aboutHead = document.getElementById('about-head');
    var shoeStore = document.getElementById('shoe-store');
    if (aboutHead) {
       aboutHead.style.backgroundColor = '#f0f0f0'; // Ndryshon background-in e about-head
    }
    if (shoeStore) {
       shoeStore.style.backgroundColor = '#f0f0f0'; // Ndryshon background-in e shoe-store
    }
 }

 // Koha fillon kur ngarkohet plotesisht faqja
 window.onload = function() {
    setTimeout(changeSectionBackground, 5000); // Ndryshon ngjyren pas 5 sec
 };