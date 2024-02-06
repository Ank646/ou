const frameElement = document.getElementById("frame");
const frame2Element = document.getElementById("frame2");
frameElement.addEventListener("click", toggleFrame);
// frame2Element.addEventListener("click", toggleFrame);
function toggleFrame(){
    frameElement.classList.toggle("heart");
}

const badgeButton = document.getElementById("btn-badge");
const flowerButton = document.getElementById("btn-flower");
const heartButton = document.getElementById("btn-heart");
const diaButton = document.getElementById("diamond");
const kiteButton = document.getElementById("kite");
badgeButton.addEventListener("click", selectFrame);
flowerButton.addEventListener("click", selectFrame);
heartButton.addEventListener("click", selectFrame);
diaButton.addEventListener("click", selectFrame);
kiteButton.addEventListener("click", selectFrame);

function selectFrame(button) {
    const buttonID = this.id;
    
    switch (buttonID) {
        case 'btn-badge':
            frameElement.className = "frame badge"; 
            frame2Element.className = "frame2";
            break;
        case 'btn-flower':
            frameElement.className = "frame flower";
            frame2Element.className = "frame2";
            break;
        case 'btn-heart':
            frameElement.className = "frame heart";   
            frame2Element.className = "frame2";     
            break;
        case 'kite':
            frameElement.className = "losange";        
            frame2Element.className = "los1";
              break;   
        case 'diamond':
            frameElement.className = "diamond";
            frame2Element.className = "dia";
            break;
        
    }
}


const fileInput = document.querySelector(".file-input"),
    filterOptions = document.querySelectorAll(".filter button"),
    filterName = document.querySelector(".filter-info .name"),
    filterValue = document.querySelector(".filter-info .value"),
    filterSlider = document.querySelector(".slider input"),
    rotateOptions = document.querySelectorAll(".rotate button"),
    previewImg = document.querySelector(".preview-img img"),
    resetFilterBtn = document.querySelector(".reset-filter"),
    chooseImgBtn = document.querySelector(".choose-img")
   
let brightnessValue = "100", saturationValue = "100", inversionValue = "0", grayscaleValue = "0";
let rotateValue = 0, flipHorizontalValue = 1, flipVerticalValue = 1;

const loadImage = () => {
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotateValue}deg) scale(${flipHorizontalValue}, ${flipVerticalValue})`;
    previewImg.style.filter = `brightness(${brightnessValue}%) saturate(${saturationValue}%) invert(${inversionValue}%) grayscale(${grayscaleValue}%)`;
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightnessValue;
            filterValue.innerText = `${brightnessValue}%`;
        } else if(option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturationValue;
            filterValue.innerText = `${saturationValue}%`
        } else if(option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversionValue;
            filterValue.innerText = `${inversionValue}%`;
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscaleValue;
            filterValue.innerText = `${grayscaleValue}%`;
        }
    });
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.id === "brightness") {
        brightnessValue = filterSlider.value;
    } else if(selectedFilter.id === "saturation") {
        saturationValue = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        inversionValue = filterSlider.value;
    } else {
        grayscaleValue = filterSlider.value;
    }
    applyFilter();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left") {
            rotateValue -= 90;
        } else if(option.id === "right") {
            rotateValue += 90;
        } else if(option.id === "horizontal") {
            flipHorizontalValue = flipHorizontalValue === 1 ? -1 : 1;
        } else {
            flipVerticalValue = flipVerticalValue === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

const resetFilter = () => {
    brightnessValue = "100"; saturationValue = "100"; inversionValue = "0"; grayscaleValue = "0";
    rotateValue = 0; flipHorizontalValue = 1; flipVerticalValue = 1;
    filterOptions[0].click();
    frameElement.className = "frame"; 
    applyFilter();
}


filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);

fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
