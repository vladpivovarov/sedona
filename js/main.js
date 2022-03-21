
const link = document.querySelector("#mapView");
const modal = document.querySelector(".modal");
const modalBox = document.querySelector(".modal__box");
const modalClose = document.querySelector(".modal__close");
const btnSearchHotel = document.querySelector(".offers__button");
const offersForm = document.querySelector(".offers-form");

//Если есть форма (если это главная страница)
if(offersForm) {

    const inputDateOfIn = offersForm.querySelector("[name=dateOfIn]");
    const inputDateOfOut = offersForm.querySelector("[name=dateOfOut]");
    const inputChildQuantity = offersForm.querySelector("[name=childQuantity]");
    const inputAdultQuantity = offersForm.querySelector("[name=adultQuantity]");
    //Storage
    const storageDateIn = localStorage.getItem("inputDateOfIn");

    //Show & close search form
    offersForm.classList.add("visually-hidden");

    btnSearchHotel.addEventListener("click", function() {
        offersForm.classList.toggle("visually-hidden");
        if(!offersForm.classList.contains("visually-hidden")) {
            if (storageDateIn) {
                inputDateOfIn.value = storageDateIn;
                inputDateOfOut.focus();
            } else {
                console.log("нет сохраненных данных")
            }
            if (!inputDateOfIn.value) {
                inputDateOfIn.focus();
            }
        }
    });

    // Send form
    offersForm.addEventListener("submit", function(event) {
        if(!inputDateOfIn.value || !inputDateOfOut.value || !inputChildQuantity.value || !inputAdultQuantity.value) {
            event.preventDefault();
            console.log("Заполните все поля");
        } else {
            localStorage.setItem("inputDateOfIn", inputDateOfIn.value);
        }
    });

    window.addEventListener("keydown", function(event) {
        if(event.code === "Escape") {
            if(!offersForm.classList.contains("visually-hidden")) {
                event.preventDefault();
                offersForm.classList.add("visually-hidden");
            }
        }
    });

    window.addEventListener("click", function(event) {
        const clickedElementsTree = event.composedPath();
    
        if(!clickedElementsTree.includes(offersForm) && !clickedElementsTree.includes(btnSearchHotel)) {
            if(!offersForm.classList.contains("visually-hidden")) {
                offersForm.classList.add("visually-hidden");
                console.log("форма открыта - скрываем ее, кнопка открыти не нажата");
            }
            console.log("Мы кликнули не на форму");
        }
    });

}


// Show & close modal
link.addEventListener("click", function(event) {
    event.preventDefault();
    modal.classList.add("modal-show");
});

modalClose.addEventListener("click", function() {
    modal.classList.remove("modal-show");
});

//Закрываем всплывающие окна по Escape
window.addEventListener("keydown", function(event) {
    if(event.code === "Escape") {
        if(modal.classList.contains("modal-show")) {
            event.preventDefault();
            modal.classList.remove("modal-show");
        }
    }
});

//Закрываем всплывающие окна по клику вне окна
window.addEventListener("click", function(event) {
    const clickedElementsTree = event.composedPath();

    if (!clickedElementsTree.includes(modalBox) && !clickedElementsTree.includes(link)) {
        if(modal.classList.contains("modal-show")) {
            modal.classList.remove("modal-show");
            console.log("карта открыта - скрываем ее, кнопка открыти не нажата");
        } 
        console.log("Мы кликнули не на карту");
    }
});