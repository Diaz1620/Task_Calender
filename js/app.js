important = true;
showing = true;
serverUrl = "https://fsdiapi.azurewebsites.net/";
allTasks= [];

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


function toggleForm(){
    if(showing){
        $(".section-form").toggle();
        // $("#toggle-form").removeClass("fa-caret-square-right").addClass("fa-caret-square-left");
        showing = false;
    }
    else{
        $(".section-form").toggle();
        // $("#toggle-form").removeClass("fa-caret-square-left").addClass("fa-caret-square-right");
        showing = true;
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

    let task = new Task(title, important, due, location, priority, color, contact, description);

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

    $("#txtTitle").val("");
    $("#dueDate").val("");
    $("#txtLocation").val("");
    $("#txtPriority").val("");
    $("#selColor").val("000000");
    $("#txtContact").val("");
    $("#txtDescription").val("");
}

function displayTask(task){
    // <div class="task" style="border: 2px solid ${task.color}">
    let btn = "";
    if(!task.done){ //if not done
        btn = `<button onclick="taskCompleted('${task._id}')" class="btn btn-info">Done</button>`;
    }
    let syntax = `
    <div id='${task._id}' class="task">
        <div class="d-flex justify-content-between">
            <div class="d-flex">
                ${checkImportance(task)}
                <h6 class="px-1">${task.title}</h6>
            </div>
            <label> Due by: ${task.due}</label>
        </div>
        <div class="d-flex justify-content-between">
            <label>Description: ${task.description}</label>
            ${btn}
        </div>
        <hr>
        <div class="d-flex justify-content-between">
            <label>Priority: ${task.priority}</label>
            <label>Location: ${task.location}</label>
            <label>Contact: ${task.contact}</label>
        </div>
    </div>
    `;
    if(task.done == true){
        $(".completed-tasks").append(syntax);
    }
    else{
        $(".pending-tasks").append(syntax);
    }
}

function taskCompleted(id) {
    console.log("Mark as done");
    $("#" + id).remove();
    for(let i = 0; i < allTasks.length; i++){
        if(allTasks[i]._id == id){
            console.log(allTasks[i]);
            allTasks[i].done = true;

            $.ajax({
                type: "PUT",
                url: serverUrl + "api/tasks",
                data: JSON.stringify(allTasks[i]),
                contentType: "application/json",
                success: function(res){
                    console.log(res);
                    displayTask(allTasks[i])
                },
                error: function(error){
                    console.error("Error updating task", err);
                }
            });
        }
    }
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

function getTasks(){
    $.ajax({
        type: "GET",
        url: serverUrl + 'api/tasks',
        success: function(res){
            console.log("Got It");
            let tasks = JSON.parse(res);
            for(i=0;i<tasks.length;i++){
                if(tasks[i].name === 'Yadiel'){
                    allTasks.push(tasks[i]);
                    displayTask(tasks[i]);
                    console.log(tasks[i]);
                }
            }
        },
        error: function(error){
            console.log("Request failed ;(", error);
        }
    });
}

// function completedTask(task) {
//     let syntax = `
//     <div class="task">
//         <div class="d-flex justify-content-between ">
//             <div class="d-flex">
//                 ${checkImportance(task)}
//                 <h6 class="px-1">${task.title}</h6>
//             </div>
//             <label> Due by: ${task.due}</label>
//         </div>
//         <label>Description: ${task.description}</label>
//         <hr>
//         <div class="d-flex justify-content-between">
//             <label>Priority: ${task.priority}</label>
//             <label>Location: ${task.location}</label>
//             <label>Contact: ${task.contact}</label>
//         </div>
//     </div>
//     `;

//     $(`.completed-tasks`).append(syntax);
// }

// function testDel(){
//     var id = "6128463f9102ba0acab07231";
//     $.ajax({
//         type: "GET",
//         url: serverUrl + 'api/tasks/',
//         success: function(res) {
//             console.log("Request ok", res);
//             // getTasks();
//         },
//         error: function(error) {
//             console.log("Request failed", error);
//         }
//     });
// }

function clearTasks(){
    $.ajax({
        type: "DELETE",
        url: serverUrl + "api/tasks/clear/Yadiel",
        success: function(res) {
            alert("Successfully cleared tasks");
            console.log(res);
        },
        error: function(error) {
            console.error("Problem clearing tasks", error);
        }

    })
}

function init(){
    console.log("Calender System");
    // load data
    getTasks();
    $("#clear-tasks").click(clearTasks);
    $("#toggle-form").click(toggleForm);
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


/*
delete request to:
serverUrl + "api/tasks/clear/Yadiel",
*/ 