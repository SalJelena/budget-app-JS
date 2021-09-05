// # Апликација за израчунавање зараде


// Апликација која служи за лако рачунање месечне зараде и потрошње
// Додатак*(није обавезан): Омогућити да се информације чувају негде и поново користе


// ## Спецификације:
// 1. Постоји форма којом убацујемо информације о приходу/расходу и она се састоји од:  DONE
//     1. Dropdown којим се бира приход/расход    DONE
//     2. Текстуални опис трансакције (не може бити празан)    DONE
//     3. Износ трансакције (пазити да се не уносе негативни бројеви, нити 0)    DONE
//     4. Дугме за потврду, којим се убацују елементи у одговарајућу листу    DONE
// 2. Постоје две листе (једна за расходе, друга за приходе) (Напомена: Ове листе не мoрају конкретно бити ul или ol, већ се може реализовати на други начин, ако вам је лакше)     DONE
// 3. Елементима листе се на hover појављује дугме за уклањање тог елемента    DONE
// 4. Сваки елемент садржи Опис и цену, док елементи за расходе,садрже и додатну информацију о томе колики проценат од укупне зараде чине (ако смо зарадили 100рсд и потрошили 2.3рсд, поред трансакције од 2.3рсд стоји 2.3%)      DONE
// 5. Постоје информације о укупним приходима,расходима и укупном стању, које се мењају сваки пут када се нека од листа промене. Расход такође има информацију о проценту  DONE
// 6. Радити са модулима.  DONE





import { dataPrihod, dataRashod, addPrihod, addRashod, deleteByIdPrihod, deleteByIdRashod, formatNumber, calculateTotalPrihod, calculateTotalRashod, preostak, procentiRashod, procentiRashodUkupno } from "./service.js";


// Treba selektovati SVE inpute i polja 


let forma = document.querySelector('form')

let divPrihodLista = document.querySelector('.prihod-lista')
let divRashodLista = document.querySelector('.rashod-lista')

let inputOption = document.querySelector('.add-type')
let inputOpis = document.querySelector('.add-description')
let inputIznos = document.querySelector('.add-value')

let divError = document.querySelector('.error-field')



let budzetPreostatak = document.querySelector('.budget-vrednost-final')
let budzetPrihod = document.querySelector('.budget-prihod-vrednost')
let budzetRashod = document.querySelector('.budget-rashod-vrednost')

let procentiUkupno = document.querySelector('.budget-rashod-procenat')



//funkcija koja radi upisivanje u gornji deo kalkulacija

function topBudzet (niz1, niz2, a, b) {

    if(calculateTotalPrihod(niz1) > calculateTotalRashod(niz2)){
        a.textContent =`+  ${preostak(calculateTotalPrihod(niz1),calculateTotalRashod(niz2))}`
          b.textContent = `${procentiRashodUkupno(niz1, niz2)}%` 
        
        }else{
            a.textContent =`  ${preostak(calculateTotalPrihod(niz1),calculateTotalRashod(niz2))}` 
            b.textContent = `${procentiRashodUkupno(niz1, niz2)}%`
        }

}


//funkcija koja dodaje u DOM

function addToDom (niz){

    //kreacija elemenata, povezivanje, dodavanje teksta

    let item = document.createElement('div')
    item.classList.add('item')
    item.classList.add('clearfix')

    let divRight1 = document.createElement('div')
    divRight1.classList.add('right')
    divRight1.classList.add('clearfix')

    let itemOpis = document.createElement('div')
    itemOpis.className = 'item-opis'
    
    let itemIznos = document.createElement('div')
    itemIznos.className = 'item-iznos'

    itemOpis.textContent = niz.desc

    if(niz.name == 'income'){
    itemIznos.textContent =`+  ${formatNumber(niz.iznos)}`
    }else{
        itemIznos.textContent =`-  ${formatNumber(niz.iznos)}`
    }

    let divBtn = document.createElement('div')
    divBtn.className = 'div-btn'

    let btnDelete = document.createElement('button')
    btnDelete.className = 'btn-delete'
    btnDelete.innerHTML = `<i class="fa fa-close"></i>`
    

    let procenti = document.createElement('div')
    procenti.className = 'item-percentage'
   
    divBtn.append(btnDelete)
   

    //odredjujem u koji nivo ide iznos - da li prihod ili rashod
    if (niz.name == 'income') {
        divRight1.append(itemIznos, divBtn)
        item.append(itemOpis, divRight1)
        divPrihodLista.append(item)
    }else {
        divRight1.append(itemIznos, divBtn, procenti)
        item.append(itemOpis, divRight1)
        divRashodLista.append(item)
    }

    //ukupni zbirovi prihoda i rashoda
    budzetPrihod.textContent =`+ ${calculateTotalPrihod(dataPrihod)}` 
    budzetRashod.textContent =`- ${calculateTotalRashod(dataRashod)}`

    //procenat za svaki pojedinacni rashod u odnosu na ukupan zbir prihoda do tada
    procenti.textContent = `${procentiRashod(dataPrihod, niz.iznos)}%`
    
    topBudzet(dataPrihod, dataRashod, budzetPreostatak, procentiUkupno)


//  event na button koji brise, i koji azurira brojke ukoliko nesto obrise

    btnDelete.addEventListener('click',()=>{
        item.remove()

        if(niz.name == 'income'){

        deleteByIdPrihod(niz.id)
        console.log(dataPrihod)   
        calculateTotalPrihod(dataPrihod)
        budzetPrihod.textContent =`+ ${calculateTotalPrihod(dataPrihod)}` 
        topBudzet(dataPrihod, dataRashod, budzetPreostatak, procentiUkupno)
     
        }else{

        deleteByIdRashod(niz.id)
        console.log(dataRashod)
        calculateTotalRashod(dataRashod)
        budzetRashod.textContent =`- ${calculateTotalRashod(dataRashod)}`
        procenti.textContent = `${procentiRashod(dataPrihod, niz.iznos)}%`
        topBudzet(dataPrihod, dataRashod, budzetPreostatak, procentiUkupno)

        }       

    }) 

}

let greska = document.createElement('p')

//event na formi

forma.addEventListener('submit',(event)=>{
    event.preventDefault()

    let items = {name: inputOption.value, desc: inputOpis.value, iznos: inputIznos.value}


    if (items.desc != '' && !isNaN(items.iznos) && items.iznos > 0) {

         

        if (inputOption.options[inputOption.selectedIndex].value == 'income') {
            addToDom(items)
            addPrihod(items)
            console.log(dataPrihod) 
            
            budzetPrihod.textContent =`+ ${calculateTotalPrihod(dataPrihod)}` 

         
            
        } else if (inputOption.options[inputOption.selectedIndex].value == 'expenses') {
            addToDom(items)
            addRashod(items)
            console.log(dataRashod)

            budzetRashod.textContent =`- ${calculateTotalRashod(dataRashod)}`   
              

        }

        topBudzet(dataPrihod, dataRashod, budzetPreostatak, procentiUkupno)
            
            greska.textContent = ''

    } else {
     
        greska.textContent = 'Proverite unete podatke.'
        greska.className = 'greska'
        divError.append(greska)

        
        
    }

    
    inputOpis.value = ''
    inputIznos.value = ''



})

//dodajem u DOM i elemente predefinisane, koje sam dodala radi preglednosti samo - ali iz niza i dokumenta mogu i da se izbrisu 

dataPrihod.forEach(element => {
    addToDom(element)
    console.log(dataPrihod)
});

dataRashod.forEach(element => {
    addToDom(element)
    console.log(dataRashod)
});

