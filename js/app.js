important = true;

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
    console.log(task);
}

function init(){
    console.log("Calender System");
    $("#iImportant").click(toggleImportant)
    $("#btnSave").click(save)
}

window.onload = init;



/*
    1 catch the click on the icon
    2 call a function (toggleImportant)
    3 console a message
*/ 