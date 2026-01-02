document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.getElementById('signupBtn');
    const loginBtn = document.getElementById('loginBtn');
    const signupModal = document.getElementById('signupModal');
    const loginModal = document.getElementById('loginModal');
    const closeBtns = document.querySelectorAll('.close-btn');
    

    /*Open Admin Modal when 'Login as Admin' button is clicked */
    adminLoginBtn.addEventListener('click', () => {
        adminModal.style.display = 'block';
    });
    // Show Login Modal
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });
    
    // Open the modal when signup button is clicked
    signupBtn.addEventListener('click', () => {
        signupModal.style.display = 'block';
        signupModal.reset()
    });

    // Close modals
    closeBtns.forEach(button => {
        button.addEventListener('click', () => {
            signupModal.style.display = 'none';
            loginModal.style.display = 'none';
            adminModal.style.display='none'
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Login Form Handling
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        

        // Normal login logic here if needed
        alert("User Login Successful");
        
    });

    // Admin Login Handling
        // Handle Admin Form Submission
    document.getElementById('adminForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const adminpassword = document.getElementById('adminPassword').value.trim();
        const admincorrectPassword = "kunalS@hare983";

        if (adminpassword === admincorrectPassword) {
            alert("Admin login successful!");
            window.location.href = "admin.html";
        } else {
            alert("Incorrect admin password!");
        }
        adminModal.style.display='none'
    });

});
// Sign Up form handling
    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault(); // Stop the form from submitting normally

        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const phone = document.getElementById('signupPhone').value.trim();
        

        if (!name || !email || !phone || !username || !password) {
            alert("Please fill all fields!");
            return;
        }

        // Store in localStorage or wherever needed
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({ name, email, phone, username, password });
        localStorage.setItem('users', JSON.stringify(users));
        


      alert("This is user signup")
});

    
    