// Function to automatically scroll to a specific section after 5 seconds
function scrollToSection() {
   var sectionId = 'form-details'; // Ndryshojme këtë në ID-në e seksionit ku dëshironi të lëvizni
   var section = document.getElementById(sectionId);
   if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }
}

 // Niset kohëmatësin kur faqja ngarkohet
window.onload = function() {
    setTimeout(scrollToSection, 5000); // Lëvizet te seksioni pas 5 sekondash
};

document.getElementById('contactForm').addEventListener('submit', function(event) {
   event.preventDefault();
   
   var name = document.getElementById('name').value.trim();
   var email = document.getElementById('email').value.trim();
   var subject = document.getElementById('subject').value.trim();
   var message = document.getElementById('message').value.trim();
   var formMessage = document.getElementById('formMessage');
   
   if (name === '' || email === '' || subject === '' || message === '') {
      formMessage.textContent = 'Please fill out all fields.';
      return;
   }
   
   if (!validateEmail(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      return;
   }
   
   if (subject.length === 0) {
      formMessage.textContent = 'Please enter a subject.';
      return;
   }
   
   if (message.length > 300) {
      formMessage.textContent = 'Message exceeds 300 characters.';
      return;
   } 
    // Kur formulari është i vlefshëm, dorëzohet ose shfaq mesazhin e suksesit
   formMessage.textContent = 'The email was sent successfully';
}); 
function validateEmail(email) {
   var re = /\S+@\S+\.\S+/;
   return re.test(email);
}