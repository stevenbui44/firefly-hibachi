document.addEventListener('DOMContentLoaded', function() {
    // signup-form, the form
    const signupForm = document.querySelector('.signup-form');
    // the error
    const errorMessage = document.getElementById('error-message');

    // FUNCTION 1: When the user submits the form, check everything
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // NOTE: We only need to validate passwords, card numbers, expiration dates, and CVVs.
        // Everything else in MP3 was extra. I'm not checking if the name exists
        
        // CHECK 1: Check if the passwords match
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            errorMessage.textContent = 'Passwords do not match';
            errorMessage.style.display = 'block';
            return;
        }

        // Check 2: Check if there are 16 digits in the card number
        const cardNumber = document.getElementById('cardNumber').value;
        if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
            errorMessage.textContent = 'Card number must be 16 digits';
            errorMessage.style.display = 'block';
            return;
        }

        // Check 3: Check if the expiration date is in MM/YY
        const expDate = document.getElementById('expDate').value;
        const expDateRegex = /^\d{2}\/\d{2}$/;
        if (!expDateRegex.test(expDate)) {
            errorMessage.textContent = 'Expiration date must be in the format MM/YY';
            errorMessage.style.display = 'block';
            return;
        }

        // Check 4: Check if the CVV is 3 digits
        const cvv = document.getElementById('cvv').value;
        if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
            errorMessage.textContent = 'CVV must be 3 digits';
            errorMessage.style.display = 'block';
            return;
        }


        // if we got this far, assume that the user is good
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const cardName = document.getElementById('cardName').value.trim();


        // we already checked that the plaintext passwords match. Now we need to
        // salt and hash them
        // const salt = generateSalt(email);
        // const hashedPassword = hashPassword(password, salt);

        // fetch('https://csc342-526.csc.ncsu.edu/api/hash-password', {
        fetch('http://localhost:80/api/hash-password', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        })
        .then(response => response.json())
        // create the new user with that hashed data instead
        .then(hashedData => {
            const newUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedData.hashedPassword,
                salt: hashedData.salt,
                nameOnCard: cardName,
                creditCardNumber: cardNumber,
                expirationDate: expDate,
                cvv: cvv
            };
            // return fetch('https://csc342-526.csc.ncsu.edu/api/users', {
            return fetch('http://localhost:80/api/users', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            });
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
        // if we were successful, then redirect to login
        .then(data => {
            window.location.href = '/login';
        })
        .catch(error => {
            errorMessage.textContent = error.error;
            errorMessage.style.display = 'block';
        });
    });
});