function showModal(){
    if($('.add-student-div').css('display') == 'none'){
        $('.add-student-div').css('display', 'block');
    }
}

function hideModal(){
    if($('.add-student-div').css('display') == 'block'){
        $('.add-student-div').css('display', 'none');
    }
}

// ADD STUDENT FORM BUTTON CLICK
$('.add-student-form button[type=submit]').click(function(e){
    e.preventDefault();
    
    $('.success').text("")
    $('.error').text("")

    $("body").css('cursor', 'wait')

    // REQUEST TO "/students/add"
    $.ajax({
        method: 'POST',
        url: '/students/add',
        data: $('.add-student-form').serialize(),
        success: (result)=>{
            if(result.success){
                $('.success').text(result.message + "...Redirecting")
                setTimeout(()=>{
                    $("body").css('cursor', 'default')
                    document.location.href = '/students'
                }, 2000)
            }else{
                $("body").css('cursor', 'default')
                $('.error').text(result.message)
            }
        },
        error: (error)=>{
            $("body").css('cursor', 'default')
            console.log(error)
        }
    })
})