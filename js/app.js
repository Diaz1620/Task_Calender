important = true;
serverUrl = "https://fsdiapi.azurewebsites.net/";

function toggleImportant(){
    console.log("clicked");

    if(important) {
        $("#iImportant").removeClass("fas").addClass("far");
        important = false;
    }
    else{
        $("#iImportant").removeClass("far").addClass("fas");
        important = true;
    }
}

function save(){
    console.log("Saving");

    // get the value from control
    let title = $("#txtTitle").val();
    let due = $("#dueDate").val();
    let location = $("#txtLocation").val();
    let priority = $("#txtPriority").val();
    let color = $("#selColor").val();
    let contact = $("#txtContact").val();
    let description = $("#txtDescription").val();

    // HW: finish

    // create a new Task object
    let task = new Task(title, important, due, location, priority, color, contact, description);
    // clg the object
    // console.log(task);

    // console.log( JSON.stringify(task) );

    $.ajax({
        type: 'POST',
        url: serverUrl + "api/tasks/",
        data: JSON.stringify(task), //from obj to string
        contentType: "application/json",
        success: function(res){
            console.log("Server says", res);

            let t = JSON.parse(res); //from string to obj
            displayTask(t);
        },
        error: function(error) {
            console.error("Error saving task", error);
        }
    });
}

function displayTask(task){
    let syntax = `
    <div class="task">
        <div class="d-flex justify-content-between ">
            <div class="d-flex">
                ${checkImportance(task)}
                <h6 class="px-1">${task.title}</h6>
            </div>
            <label> Due by: ${task.due}</label>
        </div>
        <label>Description: ${task.description}</label>
        <hr>
        <div class="d-flex justify-content-between">
            <label>Priority: ${task.priority}</label>
            <label>Location: ${task.location}</label>
            <label>Contact: ${task.contact}</label>
        </div>
    </div>
    `;

    $(".pending-tasks").append(syntax);
}

function checkImportance(task){
    if(task.important){
        let isIportant = `<i id="important" class="fas fa-star"></i>`;
        return isIportant;
    }
    else {
        let notImportant= `<i id="important" class="far fa-star"></i>`;
        return notImportant;
    }
}

function init(){
    console.log("Calender System");
    // load data
    // call a get from the same url
    // json part
    // travel the array
    // send each objet to display function

    $("#iImportant").click(toggleImportant);
    $("#btnSave").click(save);
}

window.onload = init;



/*
    1 catch the click on the icon
    2 call a function (toggleImportant)
    3 console a message
*/ 

/*
    GET --> Retrieve (cannot send data)
    POST --> Create
    PUT,PATCH --> Modify
    Delete --> Remove
*/ 