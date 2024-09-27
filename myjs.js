
function validateForm() {
  

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Replace these with your own logic to validate credentials
    const validUsername = 'amshu god';
    const validPassword = 'divan is gay';

    if (username === validUsername && password === validPassword) {
        window.location.href = 'home-la-la.html'; // Redirect to desired URL
    } else {
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.style.color = 'red';
    }
   
}