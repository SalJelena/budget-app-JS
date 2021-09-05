
//modul 1 - Matematika



export let countPrihod = 2
export let countRashod = 3


export let dataPrihod = [
    {name: 'income', desc: 'Plata', iznos: 80000, id: 1}
]
export let dataRashod = [
    {name: 'expense', desc: 'Racuni', iznos: 6000, id: 1},
    {name: 'expense', desc: 'Namirnice', iznos: 3400, id: 2}
]


//ubacivanje itema u niz

export const addPrihod = (item)=> {   
    item.id = countPrihod++
 
    dataPrihod.push(item)

   return item.id
}



export const addRashod = (item)=> {  
    item.id = countRashod++
 
    dataRashod.push(item)

   return item.id
}



//brisanje iz niza

export const deleteByIdPrihod =  id => {
    let index = dataPrihod.findIndex(item=>item.id == id)
    dataPrihod.splice(index, 1)

   
}

export const deleteByIdRashod =  id => {
    let index = dataRashod.findIndex(item=>item.id == id)
    dataRashod.splice(index, 1)

}


//formatiranje brojeva 


export function formatNumber (number) {
    var numSplit, int, dec
    
    number = Math.abs(number)
    number = number.toFixed(2)
    numSplit = number.split('.')
    int = numSplit[0]

    if (int.length > 3) {
        int = int.substr(0, int.length - 3) + '.' + int.substr(int.length - 3, 3)
    }

    dec = numSplit[1]

    return ' ' + int + ',' + dec
}




//matematika za zbir prihoda i rashoda

export function calculateTotalPrihod (niz){
    let sum = 0

    niz.forEach(element => {
        sum = sum + Number(element.iznos)
       
    });

    return sum
}



export function calculateTotalRashod (niz) {
    let sum = 0

    niz.forEach(element => {
        sum += Number(element.iznos)
    });

    return sum
}

export function preostak (broj1, broj2) {
    let ost
    if(broj1 > broj2){
        ost = broj1 - broj2
        return formatNumber(ost)
    }else if(broj1 == broj2){
        return 0
    }else if(broj2>broj1){
        ost = broj1 - broj2
        return formatNumber(ost)    
    }

}



export function procentiRashod(niz1, num){
    
    num = Math.round((num / calculateTotalPrihod(niz1)) * 100)
    return num
    
}



export function procentiRashodUkupno (niz1, niz2){
        let pro = 0
        pro = Math.round((calculateTotalRashod(niz2) / calculateTotalPrihod(niz1)) * 100)
        return pro
}








