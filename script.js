var score = 0;
var house = "";
var person;
var isNameValid = false;
var isAgeValid = false;
var isMale = false;
var isFemale = false;
let firstTimeTakingQuiz = true;

function addPerson(name, age, male, female) {
    validName(name);
    validAge(age);
    validGender(male, female);
    if (isNameValid && isAgeValid && (isMale || isFemale)) { //if all inputs the user entered are valid
        //object is created to store all details of 1 person in 1 variable
        person = { name: name, age: age, male: male, female: female, house: "", }
        let peopleJSON = localStorage.getItem("allPeopleJSON");
        let people = JSON.parse(peopleJSON);
        if (people===null) { //if there is NO data in the array in the local storage
            let userList = [];
            userList.push(person);
            peopleJSON = JSON.stringify(userList);
            localStorage.setItem("allPeopleJSON", peopleJSON);
        } else { //if there IS data ALREADY in the array in the local storage
            //purpose of the for loop is to ensure that a user completes the quiz only once
            //the code does this by traversing through the people array and comparing its contents with the recently created person object
            //in the Harry Potter franchise, Hogwarts students can only get sorted once, and this quiz simulates that
            for (let i = 0; i<people.length; i++) {
                if (people[i].name === name && people[i].age === age && people[i].male === male && people[i].female === female) {
                    localStorage.setItem("house", people[i].house);
                    userGender(male, female);
                    alert("you have already taken this quiz before, " + people[i].name);
                    window.location.href = "sorting.html";
                    return;
                }
            }
            people.push(person);
            peopleJSON = JSON.stringify(people);
            localStorage.setItem("allPeopleJSON", peopleJSON);
        }
        userGender(male, female);
        resettingUserDetails();
        window.location.href = "quiz.html";
    }
}

function resettingUserDetails() {
    isNameValid = false;
    isAgeValid = false;
    isMale = false;
    isFemale = false;
    score = 0;
    house = "";
}

function userGender(male, female) {
    if (male) {
        let male = "male";
        localStorage.setItem("gender", male);
    } else if (female) {
        let female = "female";
        localStorage.setItem("gender", female);
    }
}

function validName(name) {
    if (name==="") {
        alert("please enter your name");
    } else {
        isNameValid = true;
    }
}

function validAge(age) {
    if (isNaN(age)) {
        alert("please enter a number for your age");
    } else if (age==="") {
        alert("please enter your age");
    } else if (age<=0) {
        alert("please enter in your age. it is not possible for your age to be a negative number");
    } else {
        isAgeValid = true;
    }
}

function validGender(male, female) {
    if (!male && !female) {
        alert("please enter your gender");
    } else if (male) {
        isMale = true;
    } else if (female) {
        isFemale = true;
    }
}

function calculateHogwartsHouse() {
    //if all questions have been answered
    if (document.getElementById("answers1").querySelector('input[name="radio"]:checked') &&
        document.getElementById("answers2").querySelector('input[name="radio"]:checked') &&
        document.getElementById("answers3").querySelector('input[name="radio"]:checked') &&
        document.getElementById("answers4").querySelector('input[name="radio"]:checked') &&
        document.getElementById("answers5").querySelector('input[name="radio"]:checked') &&
        document.getElementById("answers6").querySelector('input[name="radio"]:checked') &&
        document.getElementById("answers7").querySelector('input[name="radio"]:checked') &&
        document.getElementById("answers8").querySelector('input[name="radio"]:checked')) {

        singleAnswer(document.getElementById("answers1").querySelector('input[name="radio"]:checked').value);
        singleAnswer(document.getElementById("answers2").querySelector('input[name="radio"]:checked').value);
        singleAnswer(document.getElementById("answers3").querySelector('input[name="radio"]:checked').value);
        singleAnswer(document.getElementById("answers4").querySelector('input[name="radio"]:checked').value);
        singleAnswer(document.getElementById("answers5").querySelector('input[name="radio"]:checked').value);
        singleAnswer(document.getElementById("answers6").querySelector('input[name="radio"]:checked').value);
        singleAnswer(document.getElementById("answers7").querySelector('input[name="radio"]:checked').value);
        singleAnswer(document.getElementById("answers8").querySelector('input[name="radio"]:checked').value);

        if (score>=8 && score<=13) {
            house = "gryffindor";
            localStorage.setItem("house", house);
        } else if (score>=14 && score<=19) {
            house = "slytherin";
            localStorage.setItem("house", house);
        } else if (score>=20 && score<=25) {
            house = "ravenclaw";
            localStorage.setItem("house", house);
        } else if (score>=26 && score<=32) {
            house = "hufflepuff";
            localStorage.setItem("house", house);
        }
        window.location.href = "sorting.html";
    } else {
        alert("you have not answered all the questions")
    }
}

function singleAnswer(answer) {
    if (answer==="gryffindor") {
        score += 1;
    } else if (answer==="slytherin") {
        score += 2;
    } else if (answer==="ravenclaw") {
        score += 3;
    } else { //when answer==="hufflepuff"
        score += 4;
    }
}

/*
Modified from:
*   Title: Harry Potter: Sorting Hat
*   Author: Olivia Ng
*   Date: January 18, 2019
*   Code version: Unknown, but code was updated on May 28, 2019
*   Availability: https://codepen.io/oliviale/pen/dwBqwV
*/
function hairAnimation() {
    let genderOfUser = localStorage.getItem("gender");
    if (genderOfUser==="male") {
        $('.avatar__hair').removeClass('female');
    } else if (genderOfUser==="female") {
        $('.avatar__hair').addClass('female');
    }
}

$(".js-sort").on("click", function() {
    $(".main-content__wrapper")
        .removeClass()
        .addClass("main-content__wrapper");
    $(".sorting-hat,.avatar__mouth").removeClass("animate");

    var houses = ["gryffindor", "slytherin", "ravenclaw", "hufflepuff"];
    var currentHouse = localStorage.getItem("house");
    var urlLink = document.getElementById("link");

    if (currentHouse==="gryffindor") {
        item = houses[0];
        urlLink.href = "https://www.wizardingworld.com/collections/gryffindor";
    } else if (currentHouse==="slytherin") {
        item = houses[1];
        urlLink.href = "https://www.wizardingworld.com/collections/slytherin";
    } else if (currentHouse==="ravenclaw") {
        item = houses[2];
        urlLink.href = "https://www.wizardingworld.com/collections/ravenclaw";
    } else if (currentHouse==="hufflepuff") {
        item = houses[3];
        urlLink.href = "https://www.wizardingworld.com/collections/hufflepuff";
    }

    let allPeopleJSON1 = localStorage.getItem("allPeopleJSON");
    let allPeople = JSON.parse(allPeopleJSON1);

    if (firstTimeTakingQuiz) {
        let newPerson = {
            name: allPeople[allPeople.length-1].name,
            age: allPeople[allPeople.length-1].age,
            male: allPeople[allPeople.length-1].male,
            female: allPeople[allPeople.length-1].female,
            house: currentHouse,
        }
        allPeople[allPeople.length-1] = newPerson;
        const allPeopleJSON2 = JSON.stringify(allPeople);
        localStorage.setItem("allPeopleJSON", allPeopleJSON2);
    }

    setTimeout(function() {
        $(".sorting-hat").addClass("animate");
        $(".sorting-hat__answer").text(item + "!");
    }, 1000);
    setTimeout(function() {
        $(".avatar__mouth").addClass("animate");
    }, 1500);
    setTimeout(function() {
        $(".main-content__wrapper").addClass(item);
    }, 4000);
});
/* End of citation */