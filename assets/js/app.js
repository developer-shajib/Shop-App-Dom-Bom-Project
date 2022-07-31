////get product
const product_form = document.getElementById("product-form");
const msg = document.querySelector(".msg");
const product_list = document.querySelector(".product_list");
const single_product = document.querySelector(".single-product");
const product_update_form = document.getElementById("product_update_form");


// get all product
const getAllProducts = () => {
    //get all LS data
    const data = readLSData("product");
    //check LS data exist
    if (!data) {
        product_list.innerHTML = `<tr class="text-center">
            <td colspan="7">NO Product Found</td>
        </tr>`;
    }
    // show all data to List
    else if (data) {
        // init value
        let finalAmount = 0;
        let list = "";
        // loop for data
        data.map((item, index) => {
            finalAmount += (item.price * item.quantity)
            list += `
        <tr>
            <td>${index + 1}</td>
            <td><img src="${item.image}" alt=""></td>
            <td>${item.name}</td>
            <td>${item.price} BDT</td>
            <td>${item.quantity}</td>
            <td>${item.price * item.quantity} BDT</td>
            <td>
                <a class="btn btn-info btn-sm product-view" data-bs-toggle="modal" product_index ="${index}" href="#shop_single_modal"><i class="fas fa-eye"></i></a>
                <a class="btn btn-warning btn-sm product-edit" product_index ="${index}" data-bs-toggle="modal" href="#shop_edit_modal"><i class="fas fa-edit"></i></a>
                <a class="btn btn-danger btn-sm product-delete" product_index ="${index}" href="#"><i class="fas fa-trash"></i></a>
            </td>
        </tr>`
        });

        list += `<tr>
            <td colspan="6" class="text-end">Final Amount = ${finalAmount} BDT</td>
            <td></td>
        </tr>`
        // show data on table
        product_list.innerHTML = list;
    }
    
};
getAllProducts();

// submit product form
product_form.onsubmit = (e) => {
    e.preventDefault();
    // get data to form
    let form_data = new FormData(e.target);
    let { name, price, quantity, image } = Object.fromEntries(form_data.entries());
    let productData = Object.fromEntries(form_data.entries());
    //form validation
    if (!name || !price || !quantity || !image) {
        msg.innerHTML = setAlert("All Fields are required");
    } else {
        createLSData("product", productData);
        msg.innerHTML = setAlert("Successfully Submited", "success");
        e.target.reset();
        getAllProducts();
    }
};

product_list.onclick=(e)=>{
    e.preventDefault();
    // product view
    if(e.target.classList.contains('product-view')){
        // find single data for index
    let index = e.target.getAttribute('product_index');
    let data = readLSData("product");
    // get data key
    const {name,price,image,quantity} = data[index];
    // set data to modal 
    single_product.innerHTML = `<img class="shadow" src="${image}" alt="">
    <h2 class="mt-3">${name}</h2>
    <p>price - ${price} BDT</p>`
    }
    // product edit
    else if(e.target.classList.contains("product-edit")){
        
        let index = e.target.getAttribute('product_index');
        let data = readLSData('product');

    const {name,price,image,quantity} = data[index];

        //product update form
        product_update_form.innerHTML=` 
        <div class="my-3">
        <img class="shadow" src="${image}" alt="">
    </div>
        <div class="my-3">
        <label for="">Name</label>
        <input name="name" class="form-control" type="text" value="${name}">
    </div>
    <div class="my-3">
        <label for="">Price</label>
        <input name="price" class="form-control" type="text" value="${price}">
    </div>
    <div class="my-3">
        <label for="">Quantity</label>
        <input name="quantity" class="form-control" type="text" value="${quantity}">
    </div>
    <div class="my-3">
        <input name="index" class="form-control" type="hidden" value="${index}">
    </div>
    
    <div class="my-3">
        <label for="">Image</label>
        <input name="image" class="form-control" type="text" value="${image}">
    </div>
    <div class="my-3">
        <input class="btn btn-primary w-100" type="submit" value="Update now">
    </div>`
    }
    //product delete
    else if(e.target.classList.contains("product-delete")){
        //get data index
        let confi = confirm("Do you delete it?");

        if(confi==true){
             let index = e.target.getAttribute("product_index");
        let data = readLSData('product');
        // delete index data
        data.splice(index,1);
        // update LS data
        updateLSData('product',data);

        //now reload
        getAllProducts();
        }

    }
    

}

product_update_form.onsubmit=(e)=>{
    e.preventDefault();
//get data to form
    let formData = new FormData(e.target);
    let {name,price,quantity,image,index} = Object.fromEntries(formData.entries());
    
    let all_data = readLSData('product')

    all_data[index] = {name,price,quantity,image,index};

    // Update LS Data 
    updateLSData('product',all_data);
    getAllProducts();
}
