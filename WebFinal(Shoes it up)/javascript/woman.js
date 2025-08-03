// Funksioni për të lëvizur automatikisht në një seksion specifik pas 5 sekondash
function scrollToSection() {
    var sectionId = 'jordan'; // Ndryshojme këtë në ID-në e seksionit ku dëshironi të lëvizni
   var section = document.getElementById(sectionId);
   if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }
}

 // Fillon kohëmatësin kur faqja ngarkohet
   window.onload = function() {
    setTimeout(scrollToSection, 5000); // Lëvizim te seksioni pas 5 sekondash
};