// Funksioni për të lëvizur automatikisht në një seksion specifik pas 5 sekondash
function scrollToSection() {
   var sectionId = 'new-in'; // Change this to the ID of the section you want to scroll to
   var section = document.getElementById(sectionId);
   if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }
}

 // Fillon kohematesi kur faqja ngarkohet
window.onload = function() {
    setTimeout(scrollToSection, 5000); // Lëvizim te seksioni pas 5 sekondash
};