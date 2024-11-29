var webSiteName = document.getElementById('sitename');
var webSiteUrl = document.getElementById('title');

var products = [];
if (localStorage.getItem('products') == null) {
    products = [];
} else {
    products = JSON.parse(localStorage.getItem('products'));
    display();
}

function bookmarks() {
    if (validation(webSiteName) && validation(webSiteUrl)) {
        var product = {
            name: webSiteName.value,
            url: webSiteUrl.value,
        };

        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));

        clearForm();
        display();
    }
}

function clearForm() {
    webSiteName.value = "";
    webSiteUrl.value = "";
}

function display() {
    var cartona = '';
    for (var i = 0; i < products.length; i++) {
        cartona += `
            <tr>
                <td>${i + 1}</td>
                <td>${products[i].name}</td>
                <td>
                    <button type="button" class="btn btn-warning text-white"><i class="fa-solid fa-eye"></i> 
                        <a class="text-decoration-none text-white" href="${products[i].url}" target="_blank">Visit</a>
                    </button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="showModal(${i})"><i class="fa-solid fa-trash"></i> Delete</button>
                </td>
            </tr>`;
    }
    document.getElementById('content').innerHTML = cartona;
}

let currentDeleteIndex = null; // Variable to store the index of the product to delete

function deleteProduct() {
    if (currentDeleteIndex !== null) {
        products.splice(currentDeleteIndex, 1);
        localStorage.setItem("products", JSON.stringify(products)); // Update local storage
        hideModal();
        display();
    }
}

function validation(ele) {
    var regex = {
        sitename: /^(?=(?:.*[a-zA-Z0-9]){3,})/,
        title: /\.[a-zA-Z]{2,}$/
    };
    ele.classList.remove('is-valid', 'is-invalid');
    if (regex[ele.id].test(ele.value)) {
        ele.classList.add('is-valid');
        console.log("match");
        return true; // Return true for valid input
    } else {
        ele.classList.add('is-invalid');
        return false; // Return false for invalid input
    }
}

const modal = document.getElementById('confirmModal');

function showModal(index) {
    currentDeleteIndex = index; // Store the index of the product to delete
    modal.style.display = 'flex';
}

function hideModal() {
    modal.style.display = 'none';
}