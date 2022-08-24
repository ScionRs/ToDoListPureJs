
// класс Автомобиля
class Car{
    constructor(id,brand,model,body,color,fuelType,engine,transmission,price,trash){
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.body = body;
        this.color = color;
        this.fuelType = fuelType;
        this.engine = engine;
        this.transmission = transmission;
        this.price = price;
        this.trash = trash;
    }
    // сеттер
    set carSettings(value){
        [this.brand, this.model,this.body, this.color, this.fuelType, this.engine, this.transmission, this.price] = value.split(' ');
    }
}

// Массивы для генерации автомобилей
let brandList = ['Bmw','Mercedes','Volkswagen'];
let bmwModelList = ['X1','X2','X3','3','5'];
let mercedesModelList = ['A-class','B-class','C-class'];
let volkswagenModelList = ['Golf','Polo','Jetta'];
let colorList = ['black', 'red','blue'];
let typeOfFuel = ['Diesel','Gasoline'];
let typeOfGear = ['Manual','Robot','Automatic'];
let engineVolume = [1.0,1.2,1.5,2.0,2.5,3.5,4.5,5.0];

// Исходный массив для заполнения
cars = [];

//DOM-элементы
let generateCarArrayInput = document.querySelector('.create__input');
let generateCarArrayBtn = document.querySelector('.create__btn');
let infoBtn = document.querySelector('.create__info');
let table = document.querySelector('.user-table');
let tableElementUser = document.querySelector('#user-list');
let modal = document.querySelector('.popup');
let modalContent = document.querySelector('.popup-inner');
let modalCarContent = document.querySelector('.car-inner');
let closeContent = document.querySelector('.popup-close');
let disabledBtn = document.querySelector('.disable__btn');
let submitBtn = document.querySelector('.submit-btn');
// Блок с общей информацией об автомобилях
let showInfoBlock = document.querySelector('.info');
let infoStat = document.querySelector('.info__stat');
let infoDrawText = document.querySelector('.info__draw-text');
// Создание нового автомобиля
let btnCreate = document.querySelector('.btn__create');
let blockCreate = document.querySelector('.create__car');
let btnSubmitCreate = document.querySelector('.submit-create');
let modalCreate = document.querySelector('.popup__create');
let closeCreateContent = document.querySelector('.popup__create-close');
// Поиск автомобилей по параметру
let searchBlock = document.querySelector('.search');
let searchInput = document.querySelector('.search__input');
let searchBtn = document.querySelector('.search__btn');
let searchBtnReset = document.querySelector('.search__reset');


//Достаем случайное значение из массива
let randomArrayValue = i => i[Math.floor(Math.random() * i.length)];

/*
генерируем литраж двигателя с возможность регулировки литража конкретного бренда
 */
function randomArrayEngine(item, valueStart=0, valueEnd=0){
    if((valueStart > 0 && valueStart <= item.length) && (valueEnd > 0 && valueEnd <= item.length)){
        let filterItem = item.slice(valueStart, valueEnd);
        return filterItem[Math.floor(Math.random() * filterItem.length)];
    } else {
        return randomArrayValue(item);
    }
}

// Задаем цену на автомобиль в  выбранном диапазоне
function randomPriceValue(min, max){
    const r = Math.random()*(max-min) + min;
    return Math.floor(r);
}

//Генерируем автомобили
function genereteArrayCars(array, count) {
    for (let i = 0; i < count; i++) {
        let id = i;
        let brandRandom = randomArrayValue(brandList);
        switch (brandRandom) {
            case 'Bmw':
                let bmwModelRandom = randomArrayValue(bmwModelList);
                let modelExp = new RegExp('[.X]','i');
                if(modelExp.test(bmwModelRandom)) {
                    array.push(new Car(id, brandRandom, bmwModelRandom, 'SUV', randomArrayValue(colorList), randomArrayValue(typeOfFuel), randomArrayEngine(engineVolume,2,engineVolume.length+1), randomArrayValue(typeOfGear), randomPriceValue(2500000,5000000), false));
                } else {
                    array.push(new Car(id, brandRandom, bmwModelRandom, 'Sedan', randomArrayValue(colorList), randomArrayValue(typeOfFuel), randomArrayEngine(engineVolume,2,engineVolume.length+1), randomArrayValue(typeOfGear), randomPriceValue(2500000,5000000), false));
                }
                break;
            case 'Mercedes':
                let mercedesModelRandom = randomArrayValue(mercedesModelList);
                array.push(new Car(id, brandRandom, mercedesModelRandom, 'Sedan', randomArrayValue(colorList), randomArrayValue(typeOfFuel), randomArrayEngine(engineVolume,1,engineVolume.length+1), randomArrayValue(typeOfGear), randomPriceValue(2500000,5000000), false));
                break;
            case 'Volkswagen':
                let volkswagenModelRandom = randomArrayValue(volkswagenModelList);
                array.push(new Car(id, brandRandom, volkswagenModelRandom, 'Sedan', randomArrayValue(colorList), randomArrayValue(typeOfFuel), randomArrayEngine(engineVolume), randomArrayValue(typeOfGear), randomPriceValue(1000000,2500000), false));
                break;
        }
    }
    return array;
}

// Поиск значения в массиве
let showValue = i => cars.find(e => Object.values(e).includes(i));
// фильтруем массив, отбрасывая удаленные значения
let transArray = i => i.filter(e => e.trash === false);
// Максимальная цена
let maxPrice = i => Math.max(...i.map(o => o.price));
// Минимальная цена
let minPrice = i => Math.min(...i.map(o => o.price));
// Счетчик
let arrayLength = i => i.length;
// Поиск по параметру
let getCarsFilter = (i,value) => i.filter(e => Object.keys(e).find(o => e[o] === value));

/*
    Выводим сгенерированный список автомобилей, попутно
    добавляя события(Удаление,Изменение)
 */
function buildCarList(item){

    for (let i = 0; i < item.length; i++){
        let textElement = document.createElement('tr');
        textElement.classList.add('element');
        textElement.innerHTML = `${tableTemplate(item[i])}`;
        let deleteBtn = document.createElement('button'),
            changeBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Удалить';
        changeBtn.innerHTML = 'Изменить';
        tableElementUser.appendChild(textElement);
        textElement.appendChild(deleteBtn);
        textElement.appendChild(changeBtn);
        deleteBtn.addEventListener('click', function(){
            textElement.remove(this);
            item[i].trash = true;
            deleteDomArray();
            buildCarList(transArray(item));
            console.log(item);
            console.log(transArray(item));
        });
        changeBtn.addEventListener('click', function () {
            modal.classList.toggle('showPopup');
            modalContent.innerHTML = `${buildPersonalPage(showValue(item[i].id))}`;
            console.log(showValue(item[i].id));
        });
    }
}

// Поиск наиболее популярного цвета
function getMostFrequentColor(item) {
    let arr = item.map(item => item.color);
    console.log(arr);
    const hashmap = arr.reduce( (acc, val) => {
        acc[val] = (acc[val] || 0 ) + 1;
        return acc
    },{});
    drawMostPopularColor(Object.keys(hashmap ).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b));
    return Object.keys(hashmap ).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b);
}



// Отрисовать самый популярный цвет
function drawMostPopularColor(item){
   let value =  colorList.includes(`${item}`);
   console.log(value);
   console.log(item);
    if (value === true) {
        let popColor = document.querySelector('.info__draw-color');
        console.log(popColor);
        popColor.style.backgroundColor = `${item}`;
    }
}


// отключить disabled у все выбранных кнопок
function switchEnable(){
    let inputs = document.getElementsByClassName('form__item-input');
    for (let i = 0; i < inputs.length; i++){
        inputs[i].disabled = '';
    }
    submitBtn.disabled = '';
}

// изменяем значения у выбранного элемента
function changeArrayValue() {
    let inputId = document.querySelector('.form__item-id').value,
        inputBrand = document.querySelector('#change_brand').value,
        inputModel = document.querySelector('#change_model').value,
        inputColor = document.querySelector('#change_color').value,
        inputEngine = document.querySelector('#change_engine').value,
        inputBody = document.querySelector('#change_body').value,
        inputFuelType = document.querySelector('#change_fuelType').value,
        inputTransmission = document.querySelector('#change_transmission').value,
        inputPrice = document.querySelector('#change_price').value;
    console.log(inputId);
    let value = showValue(Number(inputId));
    value.carSettings = `${inputBrand} ${inputModel} ${inputBody} ${inputColor} ${inputFuelType} ${inputEngine} ${inputTransmission} ${inputPrice}`;
    console.log(value);
    cars[Number(inputId)] = value;
    modal.classList.toggle('showPopup');
    disabledBtn.checked = '';
    submitBtn.disabled = 'disabled';
    deleteDomArray();
    buildCarList(transArray(cars));
}

// Затираем весь список элементов dom
function deleteDomArray(){
    let tableArray = document.querySelector('#user-list');
    while (tableArray.firstChild) {
        tableArray.removeChild(tableArray.firstChild);
    }
}
//Вывод фильтрованных автомобилей
function showFilterCars(){
    let filterArray = getCarsFilter(cars,searchInput.value);
    deleteDomArray();
    buildCarList(filterArray);

}
// Сбросить поиск
function resetSearch() {
    deleteDomArray();
    buildCarList(cars);
}

/*
 Создание массива пользователем
*/
function createCarsWithUser(){
    let value = generateCarArrayInput.value;
    console.log(value);
    deleteDomArray();
    cars.length = 0;
    buildCarList(genereteArrayCars(cars,Number(value)));
    console.log(cars);
    console.log(getCarsFilter(cars,'Diesel'));
    table.classList.toggle('table-show');
    infoBtn.classList.toggle('showBtn');
    btnCreate.classList.toggle('showBtn');
    searchBlock.classList.toggle('showPopup');
    showInfoBlock.classList.remove('showPopup');
}

// Показать настройки массива
function showArraySetting() {
    showInfoBlock.classList.toggle('showPopupBlock');
    console.log('check');
    infoStat.innerHTML = `${infoTemplate(cars)}`;
    drawTemplate(cars);
}

// Отрисовываем информационную панель
function infoTemplate (item) {
    return `
<p>Количество элементов в массиве: ${arrayLength(item)}</p>
<p>Автомобиль с минимальной ценой: ${minPrice(item)}</p>
<p>Автомобиль с максимальной ценой: ${maxPrice(item)}</p>
`;
}

// Отрисовываем информацию о цвете
function drawTemplate(item) {
    infoDrawText.innerHTML = `Самый популярный цвет: ${getMostFrequentColor(item)}`;
}

// Отрисовываем все элементы таблицы
function tableTemplate(item){
    return `<tr>
    <td>${item.id}</td>
       <td>${item.brand}</td>
       <td>${item.model}</td>
       <td>${item.color}</td>
       <td>${item.fuelType}</td>
       <td>${item.engine}</td>
       <td>${item.transmission}</td>
       <td>${item.price}</td>
        </tr>`;
}


// Отрисовать индивидуальную страницу
function buildPersonalPage(item){
    return `
    <div class="form">    
<div class="form__item"><p>id:</p><input class="form__item-id" value="${item.id}" disabled/></div>
<div class="form__item"><p>Бренд:</p><input id="change_brand" class="form__item-input" value="${item.brand}" disabled/></div>
<div class="form__item"><p>Модель:</p><input id="change_model" class="form__item-input" value="${item.model}" disabled/></div>
<div class="form__item"><p>Цвет:</p><input id="change_color" class="form__item-input" value="${item.color}" disabled/></div>
<div class="form__item"><p>Кузов:</p><input id="change_body" class="form__item-input" value="${item.body}" disabled/></div>
<div class="form__item"><p>Вид топлива:</p><input id="change_fuelType" class="form__item-input" value="${item.fuelType}" disabled/></div>
<div class="form__item"><p>Двигатель:</p><input id="change_engine" class="form__item-input" value="${item.engine}" disabled/></div>
<div class="form__item"><p>Трансмиссия:</p><input id="change_transmission" class="form__item-input" value="${item.transmission}" disabled/></div>
<div class="form__item"><p>Цена:</p><input id="change_price" class="form__item-input" value="${item.price}" disabled/></div>
</div>`;
}

// вызываем форму добавления
function newCarForm(){
    modalCreate.classList.toggle('showPopup');
    modalCarContent.innerHTML = `${createCarTemplate()}`;
}

// Созданние нового автомобиля
function createNewCar() {
    let createBrand = document.querySelector('#create__brand').value;
    let createModal = document.querySelector('#create__model').value;
    let createColor = document.querySelector('#create__color').value;
    let createBody = document.querySelector('#create__body').value;
    let createFuel = document.querySelector('#create__fuel').value;
    let createEngine = document.querySelector('#create__engine').value;
    let createTransmission = document.querySelector('#create__transmission').value;
    let createPrice = document.querySelector('#create__price').value;
    let newCar = new Car(cars.length, createBrand, createModal, createBody, createColor,createFuel,Number(createEngine),createTransmission,Number(createPrice),false);
    console.log(newCar);
    cars.push(newCar);
    deleteDomArray();
    buildCarList(transArray(cars));
    modalCreate.classList.toggle('showPopup');
}

// Форма добавления нового автомобиля
function createCarTemplate(){
    return `
     <div class="form">
     <div class="form__item"><p>Бренд:</p><input id="create__brand" class="create__item-input"/></div>
    <div class="form__item"><p>Модель:</p><input id="create__model" class="create__item-input"/></div>
    <div class="form__item"><p>Цвет:</p><input id="create__color" class="create__item-input"/></div>
    <div class="form__item"><p>Кузов:</p><input id="create__body" class="create__item-input"/></div>
    <div class="form__item"><p>Вид топлива:</p><input id="create__fuel" class="create__item-input"/></div>
    <div class="form__item"><p>Двигатель(литраж):</p><input id="create__engine" class="create__item-input"/></div>
    <div class="form__item"><p>Трансмиссия:</p><input id="create__transmission" class="create__item-input"/></div>
    <div class="form__item"><p>Цена:</p><input id="create__price" class="create__item-input"/></div>
    </div>
`;
}

// События
closeContent.addEventListener('click', function () {
    modal.classList.toggle('showPopup');
});

closeCreateContent.addEventListener('click', function () {
    modalCreate.classList.toggle('showPopup');
});

searchBtn.addEventListener('click', showFilterCars);

searchBtnReset.addEventListener('click', resetSearch);

btnCreate.addEventListener('click', newCarForm);

disabledBtn.addEventListener('click', switchEnable);

submitBtn.addEventListener('click', changeArrayValue);

generateCarArrayBtn.addEventListener('click', createCarsWithUser);

infoBtn.addEventListener('click', showArraySetting);

btnSubmitCreate.addEventListener('click', createNewCar);





