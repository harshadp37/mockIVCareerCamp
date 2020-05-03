function showModal(){
    $('.modal').css('display', 'none');
    $('.add-interview-div').css('display', 'block');
}

function hideModal(){
    $('.modal').css('display', 'none');
}


// SHOW ALREADY STUDENTS IN TABLE
function showStudentsTable(students, interviewID){
    let table = $('<table></table>')
    for(let i=0; i<students.length; i++){
        let tr = $('<tr></tr>');
        let td = $('<td></td>').text(students[i].name);
        tr.append(td);
        td = $('<td></td>').text(students[i].batch);
        tr.append(td);
        td = $('<td></td>').text(students[i].college);
        tr.append(td);
        table.append(tr);
    }
    
    $('.interview-show-students-div .body').append(table)
}

// SHOW INTERVIEW STUDENTS MODAL TO SHOW ALLOCATED STUDENTS
function showInterviewStudentModal(interviewID, company){
    $('.modal').css('display', 'none');
    $('.interview-show-students-div .error').text("");
    $('.interview-show-students-div .company').text("Company Name : " + company);
    $('.interview-show-students-div .body table').remove();
    $('.interview-show-students-div').css('display', 'block');
    // REQUEST TO "/interviews/:id/students"
    $.ajax({
        method: 'GET',
        url: '/interviews/' + interviewID + '/students',
        success: (result)=>{
            if(result.success){
                console.log(result.students)
                showStudentsTable(result.students, interviewID);
                $("body").css('cursor', 'default')
            }else{
                $("body").css('cursor', 'default')
                $('.interview-show-students-div .error').text(result.message)
            }
        },
        error: (error)=>{
            $("body").css('cursor', 'default')
            console.log(error)
        }
    })
}

// SHOW STUDENTS IN TABLE TO ALLOCATE THEM FOR AN INTERVIEW
function showAddStudentsTable(students, interviewID){
    let table = $('<table></table>')
    for(let i=0; i<students.length; i++){
        let tr = $('<tr></tr>');
        let td = $('<td></td>').text(students[i].name);
        tr.append(td);
        td = $('<td></td>').text(students[i].batch);
        tr.append(td);
        let button = $('<button></button>').text('Add');
        td = $('<td></td>').append(button);
        tr.append(td);
        $(button).click({interviewID: interviewID, studentID: students[i]._id}, addStudentsForAnInterview);
        table.append(tr);
    }
    
    $('.interview-add-students-div .body').append(table)
}

// SHOW INTERVIEW STUDENTS MODAL TO ALLOCATE THEM FOR AN INTERVIEW 
function showAddInterviewStudentModal(interviewID, company){
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
                showAddStudentsTable(result.students, interviewID);
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

// ADD STUDENT TO AN INTERVIEW
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

// ADD RESULT STATUS OF AN INTERVIEW
function addResultStatus(e){
    e.preventDefault();
    console.log("ADD");
    e.data.resultStatus = $($(e.target).parent()[0][0]).val();
    $('.interview-mark-result-div .error').text("")
    $("body").css('cursor', 'wait')

    // REQUEST TO "/results/markStatus"
    $.ajax({
        method: 'POST',
        url: '/results/markStatus',
        data: e.data,
        success: (result)=>{
            if(result.success){
                console.log(result)
                //CHANGE TO ADDED
                $(e.target).unbind();
                $(e.target).text("Update Status");
                $(e.target).css("background", "#15e931");
                $(e.target).click({resultID: result.newResult._id}, updateResultStatus);
                $("body").css('cursor', 'default')
            }else{
                $("body").css('cursor', 'default')
                $('.interview-mark-result-div .error').text(result.message)
            }
        },
        error: (error)=>{
            $("body").css('cursor', 'default')
            console.log(error)
        }
    }) 
}

// UPDATE RESULT STATUS OF AN INTERVIEW
function updateResultStatus(e){
    e.preventDefault();
    console.log(e.data)
    e.data.resultStatus = $($(e.target).parent()[0][0]).val();
    $('.interview-mark-result-div .error').text("")
    $("body").css('cursor', 'wait')

    // REQUEST TO "/results/markStatus"
    $.ajax({
        method: 'PUT',
        url: '/results/markStatus',
        data: e.data,
        success: (result)=>{
            if(result.success){
                //CHANGE TO ADDED
                $(e.target).text("Updated");
                $(e.target).css("background", "#15e931");
                $("body").css('cursor', 'default')
            }else{
                $("body").css('cursor', 'default')
                $('.interview-mark-result-div.error').text(result.message)
            }
        },
        error: (error)=>{
            $("body").css('cursor', 'default')
            console.log(error)
        }
    }) 
}

// SHOW STUDENTS DEATILS IN TABLE TO ADD RESULT
function showStudentsResultsTable(students, interviewID){
    let table = $('<table></table>')
    for(let i=0; i<students.length; i++){
        let tr = $('<tr></tr>');
        let td = $('<td></td>').text(students[i].name);
        tr.append(td);
        td = $('<td></td>').text(students[i].batch);
        tr.append(td);

        if(students[i].results.length == 0){
            let option1 = $('<option value="" selected disabled></option>').text("Select Status");
            let option2 = $('<option value="Pass"></option>').text("Pass");
            let option3 = $('<option value="Fail"></option>').text("Fail");
            let option4 = $('<option value="On Hold"></option>').text("On Hold");
            let option5 = $('<option value="Not Attempted"></option>').text("Not Attempted");

            let select = $('<select name="resultStatus" required></select>')
            select.append(option1)
            select.append(option2)
            select.append(option3)
            select.append(option4)
            select.append(option5)

            let button = $('<button type="submit"></button>').text('Add Status');
            let form = $('<form class="result-status-form" method="POST" action="/results/markStatus"></form>')
            form.append(select);
            form.append(button);
            td = $('<td></td>').append(form);
            tr.append(td);
            $(button).click({interviewID: interviewID, studentID: students[i]._id}, addResultStatus);
            
        }else{
            let option1 = $('<option value="" disabled></option>').text("Select Status");
            let option2 = $('<option value="Pass"' + (students[i].results[0].status == "Pass" ? ' selected' : '') + '></option>').text("Pass");
            let option3 = $('<option value="Fail"' + (students[i].results[0].status == "Fail" ? ' selected' : '') + '></option>').text("Fail");
            let option4 = $('<option value="On Hold"' + (students[i].results[0].status == "On Hold" ? ' selected' : '') + '></option>').text("On Hold");
            let option5 = $('<option value="Not Attempted"' + (students[i].results[0].status == "Not Attempted" ? ' selected' : '') + '></option>').text("Not Attempted");

            let select = $('<select name="resultStatus" required></select>')
            select.append(option1)
            select.append(option2)
            select.append(option3)
            select.append(option4)
            select.append(option5)

            let button = $('<button type="submit"></button>').text('Update Status');
            let form = $('<form class="result-status-form" method="PUT" action="/results/markStatus"></form>')
            form.append(select);
            form.append(button);
            td = $('<td></td>').append(form);
            tr.append(td);
            $(button).click({resultID: students[i].results[0]._id}, updateResultStatus);
        }
        table.append(tr);
    }
    
    $('.interview-mark-result-div .body').append(table)
}

// SHOW INTERVIEW RESULT MODAL
function showInterviewResultModal(interviewID, company){
    $('.modal').css('display', 'none');
    $('.interview-mark-result-div .error').text("");
    $('.interview-mark-result-div .company').text("Company Name : " + company);
    $('.interview-mark-result-div .body table').remove();
    $('.interview-mark-result-div').css('display', 'block');
    // REQUEST TO "/interviews/:id/students"
    $.ajax({
        method: 'GET',
        url: '/interviews/' + interviewID + '/students',
        success: (result)=>{
            if(result.success){
                console.log(result.students)
                showStudentsResultsTable(result.students, interviewID);
                $("body").css('cursor', 'default')
            }else{
                $("body").css('cursor', 'default')
                $('.interview-mark-result-div .error').text(result.message)
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