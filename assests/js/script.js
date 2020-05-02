// SIGN UP FORM BUTTON CLICK
$('.sign-up-form button[type=submit]').click(function(e){
    e.preventDefault();
    
    $('.success').text("")
    $('.error').text("")

    if($('#password').val() !== $('#confirmPassword').val()){
        $('.error').text("Confirm Password Don't Match");
        return;
    }
    $("body").css('cursor', 'wait')

    // REQUEST TO "/employee/sign-up"
    $.ajax({
        method: 'POST',
        url: '/employee/sign-up',
        data: $('.sign-up-form').serialize(),
        success: (result)=>{
            if(result.success){
                $('.success').text(result.message + "...Redirecting")
                setTimeout(()=>{
                    $("body").css('cursor', 'default')
                    document.location.href = '/employee/sign-in'
                }, 3000)
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

// SIGN IN FORM BUTTON CLICK
$('.sign-in-form button[type=submit]').click(function(e){
    e.preventDefault();
    $('.success').text("")
    $('.error').text("")

    $("body").css('cursor', 'wait')
    
    // REQUEST TO "/employee/sign-in"
    $.ajax({
        method: 'POST',
        url: '/employee/sign-in',
        data: $('.sign-in-form').serialize(),
        success: (result)=>{
            if(result.success){
                $('.success').text(result.message + "...Redirecting")
                setTimeout(()=>{
                    $("body").css('cursor', 'default')
                    document.location.href = '/'
                }, 3000)
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