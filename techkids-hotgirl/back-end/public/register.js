$(document).ready(() => {
    const form  = document.getElementById('form-register');
    form.addEventListener('submit', (e) => {
        event.preventDefault();
        const users = [
            form.email.value,
            form.password.value,
            form.first_name.value,
            form.last_name.value,
        ];
        if (! form.email.value || !form.password.value || !form.first_name.value || !form.last_name.value) {
            document.getElementById("error-register").innerText = "empty !!!";
            return;
        }
        else{
            $.ajax({
                url: 'http://localhost:3000/api/auth/register',
                type: 'POST',
                data: {
                    email : form.email.value,
                    firstName : form.first_name.value,
                    lastName : form.last_name.value,
                    password : form.password.value
                },
                success: (data) => {
                    // window.location.href='http://localhost:3000/auth/login'
                },
                error: (error) => {
                    console.log(error);
                }
            });
        }
        
    });
});