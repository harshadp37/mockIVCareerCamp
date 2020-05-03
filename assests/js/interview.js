function showModal(){
    $('.modal').css('display', 'none');
    $('.add-interview-div').css('display', 'block');
}

function hideModal(){
    $('.modal').css('display', 'none');
}

function addStudentsForAnInterview(e){
    e.preventDefault();
    console.log(e.data)
    $('.interview-add-students-div .error').text("")
    $("body").css('cursor', 'wait')

    // REQUEST TO "/interviews/addStudent"
    $.ajax({
        method: 'PUT',
        url: '/interviews/addStudent',
        data: e.data,
        success: (result)=>{
            if(result.success){
                //CHANGE TO ADDED
                $(e.target).text("ADDED");
                $(e.target).css("background", "#15e931");
                $("body").css('cursor', 'default')
            }else{
                $("body").css('cursor', 'default')
                $('.interview-add-students-div .error').text(result.message)
            }
        },
        error: (error)=>{
            $("body").css('cursor', 'default')
            console.log(error)
        }
    })
}

function showStudentsTable(students, interviewID){
    let table = $('<table></table>')
    for(let i=0; i<students.length; i++){
        let tr = $('<tr></tr>');
        let td = $('<td></td>').text(students[i].name);
        tr.append(td);
        td = $('<td></td>').text(students[i].batch);
        tr.append(td);
        let button = $('<button></button>').addClass('addForAnInterview').text('Add');
        td = $('<td></td>').append(button);
        tr.append(td);
        $(button).click({interviewID: interviewID, studentID: students[i]._id}, addStudentsForAnInterview);
        table.append(tr);
    }
    
    $('.interview-add-students-div .body').append(table)
}

function showInterviewStudentModal(interviewID, company){
    $('.modal').css('display', 'none');
    $('.interview-add-students-div .error').text("");
    $('.interview-add-students-div .company').text("Company Name : " + company);
    $('.interview-add-students-div .body table').remove();
    $('.interview-add-students-div').css('display', 'block');
    // REQUEST TO "/interviews/:id/studentsToAdd"
    $.ajax({
        method: 'GET',
        url: '/interviews/' + interviewID + '/studentsToAdd',
        success: (result)=>{
            if(result.success){
                console.log(result.students)
                showStudentsTable(result.students, interviewID);
                $("body").css('cursor', 'default')
            }else{
                $("body").css('cursor', 'default')
                $('.interview-add-students-div .error').text(result.message)
            }
        },
        error: (error)=>{
            $("body").css('cursor', 'default')
            console.log(error)
        }
    })
}

// ADD INTERVIEW FORM BUTTON CLICK
$('.add-interview-form button[type=submit]').click(function(e){
    e.preventDefault();
    
    $('.success').text("")
    $('.error').text("")

    $("body").css('cursor', 'wait')

    // REQUEST TO "/interviews/add"
    $.ajax({
        method: 'POST',
        url: '/interviews/add',
        data: $('.add-interview-form').serialize(),
        success: (result)=>{
            if(result.success){
                $('.success').text(result.message + "...Redirecting")
                setTimeout(()=>{
                    $("body").css('cursor', 'default')
                    document.location.href = '/interviews'
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