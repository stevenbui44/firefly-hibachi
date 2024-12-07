document.addEventListener('DOMContentLoaded', function() {
    // get nav-right, which has the auth buttons
    const navRight = document.getElementById('nav-right');

    // FUNCTION 1: Logging out
    function handleLogout() {
        // fetch('https://csc342-526.csc.ncsu.edu/api/logout', {
        fetch('http://localhost:80/api/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // redirect to the landing page
                window.location.href = '/';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // FUNCTION 2: Updating the navbar, depending on if you are logged in or logged out
    function updateNavbar() {
        // fetch('https://csc342-526.csc.ncsu.edu/api/users/current', {
        fetch('http://localhost:80/api/users/current', {
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Not logged in');
                }
                return response.json();
            })
            // IF THE USER IS LOGGED IN
            .then(user => {
                // Step 1: Make the HTML for the log out button
                navRight.innerHTML = `
                    <button class="nav-button logout" id="logout-btn">
                        Log Out of ${user.firstName} ${user.lastName}
                    </button>
                `;
                // Step 2: Add logging out to the log out button here
                document.getElementById('logout-btn').addEventListener('click', handleLogout);
            })
            // IF THERE WAS AN ERROR FOR SOME REASON = DON'T CHANGE ANYTHING
            .catch(() => {
                navRight.innerHTML = `
                    <div class="auth-buttons">
                        <a href="./login" class="nav-button login">Log In</a>
                        <a href="./signup" class="nav-button signup">Sign Up</a>
                    </div>
                `;
            });
    }
    updateNavbar();
});