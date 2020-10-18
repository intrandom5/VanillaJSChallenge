const body = document.querySelector("body");
const IMG_NUMBER = 3;

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function paintImage(imgNumber, time){
    const image = new Image();
    image.src = `background/${time}/${time}${imgNumber + 1}.jpg`;
    image.classList.add('bgImage');
    body.prepend(image);
}

function get_hour(){
    const date = new Date();
    const hours = date.getHours();
    return hours;
}

function init(){
    const randomNumber = genRandom();
    const hour = get_hour();
    let time = "";
    if(hour > 19 || hour < 6){
        time = "night";
    } else if(hour >= 6 && hour < 12){
        time = "morning";
    } else {
        time = "afternoon";
    }
    paintImage(randomNumber, time);
}

init();