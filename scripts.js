let checkedStart = false
let inputTask = document.querySelector('.add_list_input')
let infinitivColor = '#FFFFFF'
let firstStyleColor = '#e88685'
let twoStyleColor = '#85e8c5'
clearInput = (() => inputTask.value = '')
//вывести отдельно помеченные
//помеченную удалить и переместить в конец
const data = {
    'text': inputTask.value,
    'background': infinitivColor, 
    'checked': checkedStart,
}



// вывод задач
let array = []
let notElem = document.querySelector('.main_lists_notElem')
let lists = document.querySelector('.main_lists')

function outputTask(){
    let keys = Object.keys(localStorage);
    let count = 0
    let arrayCheckedFalse = []
    let arrayCheckedTrue = []
    
    for(let key of keys) {

        if(key.includes('task')){
            count+=1
            let data = JSON.parse(localStorage.getItem(key))
      
            let id = key.split(' ')[1]
            if(data.checked === false){
                arrayCheckedFalse.push([Number(data.dataChange), id])
            }
            else{
                arrayCheckedTrue.push([Number(data.dataChange), id])
            }
        }
    }
    
    arrayCheckedFalse.sort((a,b)=> b[0]-a[0])
    arrayCheckedTrue.sort((a,b)=> a[0]-b[0])
    array = [...arrayCheckedFalse, ...arrayCheckedTrue]

    for(let i = 0; i < array.length; i++){
        // let dataChange = arrayCheckedFalse[i][0]
        let idElem = array[i][1]

        let dataElem = JSON.parse(localStorage.getItem(`task ${idElem}`))

        let elem = document.createElement('div');
            elem.innerHTML =  `
                <div class="main_lists_elem" style="background-color:${dataElem.background};">
                    <div class="main_lists_container_checkbox">
                        <input type="checkbox" class="main_lists_checkbox" id="${idElem}">
                        <label for="${idElem}" class="main_lists_label"></label>
                    </div>
                    <div class="main_lists_elem_text"> ${dataElem.text}</div>
                    <button class="main_lists_remove"><img  src = "./img/Remove.svg" alt="Remove elem" class="main_lists_img"/></button>
                </div>
            `;
            if(dataElem.checked){
                elem.style.textDecoration = "line-through"
            }
            else{
                elem.style.textDecoration = "none"
            }
            lists.append(elem); 
            document.getElementById(idElem).checked = dataElem.checked
    }

    if(count === 0){
        lists.style.display = "none";
        notElem.style.display = "flex"

    }
    else{
        lists.style.display = "flex";
        notElem.style.display = "none"
    }
    styleElem()
}

outputTask()

if(array.length){
    document.querySelector('.style_menu_button_even').disabled  = false
    document.querySelector('.style_menu_button_odd').disabled  = false

    document.querySelector('.remove_menu_button_first').disabled  = false
    document.querySelector('.remove_menu_button_last').disabled  = false
}
else{
    document.querySelector('.style_menu_button_even').disabled  = true
    document.querySelector('.style_menu_button_odd').disabled  = true

    document.querySelector('.remove_menu_button_first').disabled  = true
    document.querySelector('.remove_menu_button_last').disabled  = true


}

function roundStyle(){
    let elems = document.querySelectorAll('.main_lists_elem')

    for(let i = 0; i < array.length; i++){
        let infoBackground = JSON.parse(localStorage.getItem(`task ${array[i][1]}`))
        elems[i].style.background = infoBackground.background
    }
}

//Пометить выполненой

    let checkedLists = document.querySelectorAll('.main_lists_checkbox')

    for(let i = 0; i < checkedLists.length; i++){
        checkedLists[i].onclick = function(){
            let idChange = checkedLists[i].getAttribute('id')
            let elemChange = JSON.parse(localStorage.getItem(`task ${idChange}`))

            let parent = checkedLists[i].parentNode.parentNode.parentNode
            let textElem = parent
            if(checkedLists[i].checked){
                textElem.style.textDecoration = "line-through"
                parent.remove()
                lists.append(parent)
                elemChange.checked = true
            }
            else{
                textElem.style.textDecoration = "none"
                parent.remove()
                lists.prepend(parent)
                elemChange.checked = false

            }
            elemChange.dataChange = Date.now()
            localStorage[`task ${idChange}`] = JSON.stringify(elemChange)
            styleElem()
        }
        
    }
    
    let buttonAdd = document.querySelector('.add_list_button')

    function validateText(value){
        flag = false
        for(let i = 0; i < value.length; i++){
            if(value[i] !== ' '){
                flag = true
            }
        }
        return flag

    }

    buttonAdd.onclick = function() {
      
        if(validateText(inputTask.value)){            

            let id = Date.now()
            data['text'] = inputTask.value
            data['dataChange'] = id
   
            localStorage[`task ${id}`] = JSON.stringify(data)
            clearInput();
            // addTask(id);
            location.reload()
        }
    }

    
//Удалить задачу
    let removeLists = document.querySelectorAll('.main_lists_remove')
    
    for(let i = 0; i < removeLists.length; i++){
        removeLists[i].onclick = function(){
            let removeElem = removeLists[i].parentNode
            let navDom = removeElem.children
            let removeDomElem;

            for(let j = 0; j < navDom.length; j++){
                if(navDom[j].className === 'main_lists_container_checkbox'){
                    removeDomElem = navDom[j]
                    break;
                }
            }

            let idRemove = removeDomElem.children.item(0).getAttribute('id')
            localStorage.removeItem(`task ${idRemove}`)
            removeElem.parentNode.remove()
            location.reload()
        }
    }

//Стилизация (чет\нечет)
 // drop down menu четных элементов
    let buttonStyle = document.querySelector('.panel_button_style')
    let containerStyle = document.querySelector('.panel_button_style_menu')
    let imgStyle = document.querySelector('.panel_buttons_style_img')

    buttonStyle.onclick = function(){

        if(containerStyle.style.visibility === '' || containerStyle.style.visibility === 'hidden'){
            containerStyle.style.visibility = "visible"
            imgStyle.style.transform = 'rotate(180deg)';
            let buttonEven = document.querySelector('.style_menu_button_even')
            let buttonOdd = document.querySelector('.style_menu_button_odd')
            
            if(array.length){
                buttonEven.onclick = function(){
            
                    if(localStorage.getItem('grinatom2023even')) {
                        let storageEven = localStorage.getItem('grinatom2023even')
                        localStorage.grinatom2023even = storageEven === 'false' ? 'true' : 'false'
                    }
                    else {
                        localStorage.grinatom2023even = 'false'
                    }
                    styleElem()
                        
                }
                buttonOdd.onclick = function(){
                    if(localStorage.getItem('grinatom2023odd')) {
                        let storageOdd = localStorage.getItem('grinatom2023odd')
                        localStorage.grinatom2023odd = storageOdd === 'false' ? 'true' : 'false'
                    }
                    else {
                        localStorage.grinatom2023odd = 'false'
                    }
                    styleElem()
                }
            }
       

        }

        else{
            containerStyle.style.visibility = "hidden"
            imgStyle.style.transform = 'rotate(0deg)';
            
        }

    }
    function styleElem(){
        let storageEven = false;
        let storageOdd = false; 
        if(localStorage.getItem('grinatom2023even')){
            storageEven = localStorage.getItem('grinatom2023even')
        }
        else{
            localStorage.grinatom2023even = 'false'

        }
        if(localStorage.getItem('grinatom2023odd')){
            storageOdd = localStorage.getItem('grinatom2023odd')
        }
        else{
            localStorage.grinatom2023odd = 'false'
        }
        
        for(let i = 0; i < array.length; i++){
            let infoStyle = JSON.parse(localStorage.getItem(`task ${array[i][1]}`))

            if(storageEven === 'true'){

                document.querySelector('.style_menu_button_even').classList.remove('hover')
                document.querySelector('.style_menu_button_even').classList.add("active")
 
                if((i+1) % 2 === 0 ){
                    infoStyle.background = firstStyleColor
                }
                else if((i+1) % 2 !== 0 && infoStyle.background === firstStyleColor){
                    infoStyle.background = infinitivColor
                }
  
                localStorage[`task ${array[i][1]}`] = JSON.stringify(infoStyle)
            }
            else if(storageEven === 'false'){
                document.querySelector('.style_menu_button_even').classList.remove("active")
                document.querySelector('.style_menu_button_even').classList.add('hover')
                if((i+1) % 2 === 0 ){
                    infoStyle.background = infinitivColor
                }
                localStorage[`task ${array[i][1]}`] = JSON.stringify(infoStyle)
            }
            if(storageOdd === 'true'){
                document.querySelector('.style_menu_button_odd').classList.remove('hover')
                document.querySelector('.style_menu_button_odd').classList.add("active")
               
                if((i+1) % 2 ==! 0 ){
                    infoStyle.background = twoStyleColor
                }
                else if((i+1) % 2 === 0 && infoStyle.background === twoStyleColor){
                    infoStyle.background = infinitivColor
                }
                localStorage[`task ${array[i][1]}`] = JSON.stringify(infoStyle)
            }
            else if(storageOdd === 'false'){
                document.querySelector('.style_menu_button_odd').classList.remove("active")
                document.querySelector('.style_menu_button_odd').classList.add('hover')
                if((i+1) % 2 !== 0 ){
                    infoStyle.background = infinitivColor
                }
                localStorage[`task ${array[i][1]}`] = JSON.stringify(infoStyle)
            }
        }
        roundStyle()
    }
    

 // drop down menu удаления
 
//Удаление(Первого/Последнего)

    let buttonRemove = document.querySelector('.panel_button_remove')
    let containerRemove = document.querySelector('.panel_button_remove_menu')
    let imgRemove = document.querySelector('.panel_buttons_remove_img')

    buttonRemove.onclick = function(){
        let firstRemoveButton = document.querySelector('.remove_menu_button_first') 
        let lastRemoveButton = document.querySelector('.remove_menu_button_last')
        if(containerRemove.style.visibility === '' || containerRemove.style.visibility === 'hidden'){
            containerRemove.style.visibility = "visible"
            imgRemove.style.transform = 'rotate(180deg)';
            if(array.length){
                firstRemoveButton.onclick = function(){
                    let firstElem;
                    let searchElem = lists.firstChild.children.item(0).children

                    for(let j = 0; j < searchElem.length; j++){
                        if(searchElem[j].className === 'main_lists_container_checkbox'){
                            firstElem = searchElem[j]
                            break;
                        }
                    };
                    let firstId = firstElem.children.item(0).getAttribute('id')
                    localStorage.removeItem(`task ${firstId}`)
                    location.reload()

                }
                    
                    
                lastRemoveButton.onclick = function(){
                    let lastElem;
                    let searchElem = lists.lastChild.children.item(0).children

                    for(let j = 0; j < searchElem.length; j++){
                        if(searchElem[j].className === 'main_lists_container_checkbox'){
                            lastElem = searchElem[j]
                            break;
                        }
                    };
                    let lastId = lastElem.children.item(0).getAttribute('id')
                    localStorage.removeItem(`task ${lastId}`)
                    location.reload()
                }
            }
            
        }

        else{
            containerRemove.style.visibility = "hidden"
            imgRemove.style.transform = 'rotate(0deg)';
  
        }
    }


