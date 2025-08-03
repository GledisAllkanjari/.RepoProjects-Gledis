function startLoadTimer() {
    // Funksioni per te filluar kohen
}

function handleFileSelect(event) {
    // Funksioni për të trajtuar paraqitjen e formularit
}

document.addEventListener('DOMContentLoaded', function() {
    // JavaScript code that runs when the DOM is fully loaded
    const dropZone = document.getElementById('drop_zone');
    const fileInput = document.getElementById('fileInput');

    dropZone.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(event) {
        handleFileSelect(event);
    });
});



function clearForm() {
    document.getElementById("registrationForm").reset();
}

//  Funksioni për të trajtuar paraqitjen e formularit
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    // Parandalojme paraqitjen e formularit të paracaktuar
    event.preventDefault();

    // Merren vlerat e fushës së formularit
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const telephone = document.getElementById("telephone").value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');

    // Kontrollojme nëse fjalëkalimet përputhen
    if (password !== confirmPassword) {
        document.getElementById("errorMessage").innerHTML = "Passwords do not match!";
        return;
    }

    // Kontrollojme nëse është zgjedhur gjinia
    if (!gender) {
        document.getElementById('errorMessage').textContent = 'Please select your gender.';
        return;
    }

    // Nëse të gjitha verifikimet kalojnë, dorëzohet formularin
    // Drejtohemi te index.html
    window.location.href = "index.html";
});

// Funksion per te trajtuar klikimin e butoni clear 
document.getElementById("clearButton").addEventListener("click", function() {
    clearForm();
});

// Javascript funksion per drag n'drop
var dropZone = document.getElementById('drop_zone');
var fileList = document.getElementById('file_list');

dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('dragleave', handleDragLeave, false);
dropZone.addEventListener('drop', handleFileSelect, false);

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files;
    if (evt.dataTransfer) {
        files = evt.dataTransfer.files; // Filet e hedhura
    } else {
        files = evt.target.files; // Skedarët e zgjedhur përmes fushës së hyrjes
    }

    // Pastro hyrjet e mëparshme
    fileList.innerHTML = '';

    // Files eshte nje FileList me File objects. Listojme disa veti.
    for (var i = 0, f; f = files[i]; i++) {
        console.log(f.name);
        // Opsionale, mund të ngarkojm çdo skedar këtu
        
        // Shfaq emrin e skedarit
        var listItem = document.createElement('div');
        listItem.textContent = f.name;
        fileList.appendChild(listItem);
    }
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Tregon në mënyrë të qartë se kjo është një kopje.
    this.classList.add('over');
}

function handleDragLeave(evt) {
    this.classList.remove('over');
}
var startTime;

    function startLoadTimer() {
        startTime = performance.now();
    }

    window.onload = function() {
        var form = document.getElementById('registrationForm');
        form.addEventListener('submit', function() {
            var endTime = performance.now();
            var loadTime = (endTime - startTime) / 1000 ; /* kthejme ne milisekonda */
            document.getElementById('loadTime').textContent = loadTime.toFixed(2);
            document.getElementById('loadTimer').style.display = 'block';
        });
    };