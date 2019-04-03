$(document).ready(() => {
    const form  = document.getElementById('form-login');
    form.addEventListener('submit', (e) => {
        event.preventDefault();
        if (!form.email.value || !form.password.value) {
            document.getElementById("error-login").innerText = "email or password empty !!!";
        }
        $.ajax({
            url: 'http://localhost:3000/api/auth/login',
            type: 'POST',
            data: {
                email : form.email.value,
                password : form.password.value
            },
            success: (data) => {
                
                console.log(data);
            },
            error: (error) => {
                console.log(error);
            }
        });
    });
});