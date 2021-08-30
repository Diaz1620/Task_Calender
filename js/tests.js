

function sayHello(name) {
if(!name) return "error";

    console.log("Hello " + name);
    return "Hi there: " + name;
}






function testFns() {
    let x = "Yadiel";
    let res = sayHello(x);
    console.log(res);
}


function Dog(name, age) {
    this.name = name;
    this.age = age;
    this.owner = "Alex"
}

class Cat {
    constructor(name, age, color) {
        this.name = name;
        this.age = age;
        this.color = color;
    }

    roar() {
        console.log("I'm roaringggg!");
    }
}

function testObj() {
    // object literal
    let lola = { 
        name: "lola",
        age: "3",
    };
    console.log(lola);

    // object constructor
    let fido = new Dog("fido", 4);
    let mouse = new Dog("Mouse", 5);
    console.log(fido);
    console.log(mouse);

    // class

    let king = new Cat("King", 3, "Black")
    console.log(king);

    // use objects
    console.log(lola.name);

    console.log(fido.age);

    console.log(king.roar());
}


function testReq() {
    $.ajax({
        type: "GET",
        url: "http://restclass.azurewebsites.net/api/test",
        success: function(res) { // res is variable name could be anything
            console.log("Request Ok", res);

        },
        error: function(error) { //error is variable name could be anything
            console.error("Request failed :(", error)
        }
    });
}