function getJSONData(){
    $('.info').text("Processing Request...Please wait");
    $("body").css('cursor', 'wait')

    $.ajax({
        method: 'GET',
        url: '/download/data',
        success: (result)=>{
            if(result.success){
                let CSVData = convertToCSV(result.students);
                download(CSVData);
                $("body").css('cursor', 'default')
            }else{
                $("body").css('cursor', 'default')
                $('.info').text(result.message)
            }
        },
        error: (error)=>{
            $("body").css('cursor', 'default')
            console.log(error)
        }
    })
}

function download(data){
    const blob = new Blob([data], {type: 'text/csv'})
    const url = window.URL.createObjectURL(blob)
    const a = $('<a></a>').text("Click Here.");
    a.attr('href', url);
    a.attr('download', 'CareerCampStudents.csv');
    $('.info').text("Download Ready. ");
    $('.info').append(a);

}

function convertToCSV(students){
    let CSVData = [];
    let CSVHeaders = ["Student_ID", "Name", "Batch", "College", "Status", "DSA Score", "WebD Score", "React Score", "Company Name", "Interview Date", "Interview Result"];
    CSVData.push(CSVHeaders.join(','));

    for(let i=0, interviewIndex = 0; i<students.length; ){
        let CSVRow = [];
        CSVRow.push(students[i]._id);
        CSVRow.push(students[i].name);
        CSVRow.push(students[i].batch);
        CSVRow.push(students[i].college);
        CSVRow.push(students[i].status);
        CSVRow.push(students[i].course.DSA);
        CSVRow.push(students[i].course.WebD);
        CSVRow.push(students[i].course.React);

        if(students[i].interviews.length == 0){
            CSVRow.push('-');
            CSVRow.push('-');
            CSVRow.push('-');
            interviewIndex = 0;
            i++;
        }else{
            CSVRow.push(students[i].interviews[interviewIndex].company);
            CSVRow.push(new Date(students[i].interviews[interviewIndex].date).toLocaleDateString());
            let interviewID = students[i].interviews[interviewIndex]._id;
            let resultFound = false;
            students[i].results.forEach(function(result){
                if(result.interview === interviewID){
                    resultFound = true;
                    CSVRow.push(result.status);
                }
            })
            if(!resultFound){
                CSVRow.push('-')
            }
            if(interviewIndex === students[i].interviews.length - 1){
                interviewIndex = 0;
                i++;
            }else{
                interviewIndex++;
            }
        }
        CSVData.push(CSVRow.join(','))
    }

    return CSVData.join('\n');
}

getJSONData();