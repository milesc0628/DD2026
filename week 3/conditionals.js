// equal == ===
// not equal != !==
// greater than >
// lesser than <
// >= greater than or equal to
// <= lesser than or equal to


if (5 === 5){
    console.log("5 is strictly equal to 5");
}

if(5 == "5"){
    console.log("5 is strictly equal to 5");
}

let a = "home";
if (a == "home"){
    console.log("show home page");
}

else if(a == "about"){
    console.log("show about page");
} else {
    console.log("Not found");
}

let page = "home";

switch(page){
    case "home":
        console.log("show home page")
    case "about":
        console.log("show about page")
    case "default":
        console.log("not found")
}