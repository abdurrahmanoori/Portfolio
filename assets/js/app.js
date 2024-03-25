// Function to load HTML content from a file into a specified element
function loadContent(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading the file: ', error));
}

// Load the header and footer content when the window loads
window.onload = function() {
    loadContent('header', 'partials/header.html');
    loadContent('footer', 'footer.html');
};
