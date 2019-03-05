$(document).ready(() => {
    // console.log(window.location);
    const b1 = document.getElementById('nut-no');
    const b2 = document.getElementById('nut-yes');
    var k;
    $.ajax({
        url: '/get-question-ramdom',
        type: 'GET',
        success: (data) => {
            console.log(data);
            document.getElementById('content').innerText = data.content;
            // k = data.id;
            b1.addEventListener('click', ()=>{
                $.ajax({
                    url: `/vote/?questionId=${data.id}&vote=${b1.value}`,
                    type: 'post',
                    success: (data) => {
                        //console.log(data);
                    },
                    error: (error) => {
                        console.log(error);
                    },
                });
            });
            b2.addEventListener('click', ()=>{
                $.ajax({
                    url: `/vote/?questionId=${data.id}&vote=${b2.value}`,
                    type: 'post',
                    success: (data) => {
                        //console.log(data);
                    },
                    error: (error) => {
                        console.log(error);
                    },
                });
            });
        },
        error: (error) => {
            console.log(error);
        },
    });
});