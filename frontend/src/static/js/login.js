document.addEventListener('DOMContentLoaded', function() {
    // the form
    const loginForm = document.getElementById('login-form');
    // the error message
    const errorMessage = document.getElementById('error-message');

    // // FUNCTION 0: Generating the password (same as MP5)
    // function hashPassword(password, salt) {
    //     return crypto
    //         .createHash('sha512')
    //         .update(password + salt)
    //         .digest('hex');
    // }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // fetch api call to log in
        // fetch('https://csc342-526.csc.ncsu.edu/api/login', {
        fetch('http://localhost:80/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
        .then(data => {
            // I couldn't figure out how to send the user to the page they were trying to 
            // access, so I'm just going to send them to /menu
            window.location.href = '/menu';
        })
        .catch(error => {
            // 'Invalid credentials' or 'Email not found in system'
            errorMessage.textContent = error.error;
            errorMessage.style.display = 'block';
        });
    });
});