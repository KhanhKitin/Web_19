window.onload = () => {
    // find element
    const textArea = document.getElementById('content');
    const remainCharacters = document.getElementById('remain-characters');
    // .addEventListener
    textArea.addEventListener('input', (event) => {
        const contentLength = textArea.value.length;
        
        // find element
        remainCharacters.innerText = `${200-contentLength} characters left`;
        //change content
    });
    const input = document.getElementById('gui');
    input.addEventListener('click', ()=>{
        $.ajax({
            url: '/create-question',
            type: 'post',
            data: {content: textArea.value},
            success: (data) => {
                //  console.log(data);
                textArea.value = '';
                remainCharacters.innerText = `${200} characters left`;
            },
            error: (error) => {
                console.log(error);
            },
        });
    });
};