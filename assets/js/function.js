
//setalert
let setAlert= (msg, type = 'danger')=>{
   return `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button data-bs-dismiss="alert" class="btn-close"></button> </p>`
}

//Email check
const checkmail = (mail)=>{
    let pattern = /^[a-z0-9_]{1,}@[a-z0-9]{1,}\.[a-z]{1,}$/
    return pattern.test(mail)
}

//Phone number check bd
const checkcell = (cell)=>{
    let pattern = /^(\+8801|8801|01){1}[3-9]{1}[0-9]{8}$/
    return pattern.test(cell)
}

//age check
const checkage = (age)=>{
    let pattern = /^[0-9]{2}$/;
    return pattern.test(age);
}



// set data localstorage
const createLSData = (key,value)=>{
    let data = [];
    if(localStorage.getItem(key)){
        data = JSON.parse(localStorage.getItem(key));
    }
    data.push(value)
    localStorage.setItem(key,JSON.stringify(data))
}



// get data from localstorage
const readLSData  = (key) => {

    if( localStorage.getItem(key) ){
        return JSON.parse(localStorage.getItem(key));
    } else {
        return false;
    }

}

// Update LS data 
const updateLSData = (key,array)=>{
    localStorage.setItem(key,JSON.stringify(array));
}
