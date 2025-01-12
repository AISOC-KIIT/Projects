const student={
    fullName: "Akshat Chauhan",
    age: 19,
    cgpa: 9.4,
    calcFees(){
        console.log("Marks is 9.8");
    },
};

const CGPA={
    calcMarks: function(){
        console.log("CGPA is 9.4");
    },
};

student.__proto__=CGPA;

class mentor{
    fullname(){
        console.log("My name is...")
    }

    setCourse(Course){
        this.Course = Course;
    }

    setAge(age){
        this.age = age;
    }
}

let Alok = new mentor();
Alok.setCourse("DSA");
Alok.setAge(59);

class Human{
    constructor(){
        this.species = "Homo Sapiens";
    }

    eat(){
        console.log("eat");
    }

    sleep(){
        console.log("sleep");
    }
}

class Fresher extends Human{
    constructor(branch){
        super();
        this.branch = branch;
    }

    work(){
        console.log("Fix Bugs");
    }

    skills(){ 
        console.log("upgrade skills");
    }
}

let AkshatChauhan = new Fresher();
AkshatChauhan.branch = "CSE";
