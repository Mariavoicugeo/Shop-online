const home=document.querySelector(".home");
const shop=document.querySelector('.shop');
const homePage=document.querySelector("#home-page");
const shopPage=document.querySelector("#shop-page");
const btnSizeL=document.querySelector(".btn-size-L");
const btnSizeM=document.querySelector(".btn-size-M");
const btnSizeXs=document.querySelector(".btn-size-Xs");
const silver=document.querySelector(".silver");
const rose=document.querySelector(".rose");
const gold= document.querySelector(".gold");
const singleProductPage=document.querySelector("#single-product-page");
const backHome=document.querySelector('.back-home');
const backShop=document.querySelector('.back-shop');
const showMore=document.querySelector('.show-more');
const cartbtn=document.querySelector("#cart-icon-btn");
const cartMenu=document.querySelector("#cart-menu");
const closeBtn=document.querySelector(".close");
const qtyBtn=document.querySelector(".qty-btn");
const quantityDsiplay=document.querySelector(".quantityDispaly");
const increase=document.querySelector('.increase');
const decrese=document.querySelector('.decrese');
let selectedQuantity = 1;
cartbtn.addEventListener("click", ()=>{
    cartMenu.classList.add("open");
   
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = '#00000033'; // Semi-transparent black
    overlay.style.zIndex = '2'; // Below the cart menu but above the rest of the content

   
    document.body.appendChild(overlay);
    
});
    
closeBtn.addEventListener("click",()=>{
    cartMenu.classList.remove("open");
    const overlay = document.getElementById('overlay');
    if (overlay) {
        document.body.removeChild(overlay); // Remove overlay from the DOM
    }
})
showMore.addEventListener("click", () => {
   
    shopPage.style.display = "flex";
    homePage.style.display = "none";
    singleProductPage.style.display = "none";

   
    shopPage.scrollIntoView({
        behavior: "smooth", 
        block: "start"      
    });
});
backHome.addEventListener("click",()=>{
    shopPage.style.display="none"
    homePage.style.display="flex"
    singleProductPage.style.display="none";
    
    homePage.scrollIntoView({
        behavior: "smooth", 
        block: "start"      
    });
})

backShop.addEventListener("click",()=>{
    shopPage.style.display="flex"
    homePage.style.display="none"
    singleProductPage.style.display="none";
    
    shopPage.scrollIntoView({
        behavior: "smooth", 
        block: "start"      
    });
})

silver.addEventListener("click",()=>{
    silver.classList.add("border");
    rose.classList.remove("border");
    gold.classList.remove("border");
})

rose.addEventListener("click",()=>{
    silver.classList.remove("border");
    rose.classList.add("border");
    gold.classList.remove("border");
})

gold.addEventListener("click",()=>{
    silver.classList.remove("border");
    rose.classList.remove("border");
    gold.classList.add("border");
})

btnSizeL.addEventListener("click",()=>{
    btnSizeL.classList.add("active");
    btnSizeM.classList.remove("active");
    btnSizeXs.classList.remove("active");
})

btnSizeM.addEventListener("click",()=>{
    btnSizeM.classList.add("active");
    btnSizeL.classList.remove("active");
    btnSizeXs.classList.remove("active");
})

btnSizeXs.addEventListener("click",()=>{
    btnSizeXs.classList.add("active");
    btnSizeM.classList.remove("active");
    btnSizeL.classList.remove("active");
})


home.addEventListener("click",()=>{
    shopPage.style.display="none"
    homePage.style.display="flex"
    singleProductPage.style.display='none';
})
shop.addEventListener("click",()=>{
    shopPage.style.display="flex"
    homePage.style.display="none"
    singleProductPage.style.display='none';
})






///AICI INCEPE ADD TO CART

const cartSalvat = JSON.parse(localStorage.getItem('cart'))
let cartProduse = cartSalvat ? cartSalvat : [];

console.log(cartProduse);
const updateQuantityDisplay = () => {
    quantityDsiplay.innerHTML = selectedQuantity;
};

        increase.addEventListener('click', function () {
            selectedQuantity += 1; 
            updateQuantityDisplay(); 
        });

        decrese.addEventListener('click', function () {
            if (selectedQuantity > 1) {
                selectedQuantity -= 1; 
                updateQuantityDisplay(); 
            }
         
        });

updateQuantityDisplay();

const renderCart = () => {
    const cartItemsContainer = document.querySelector('.cart-list'); 
    cartItemsContainer.innerHTML = ''; 
    cartProduse.forEach(item => {
        const productCart = document.createElement("div");
        productCart.classList.add("product-added");
        productCart.innerHTML = ` 
            <div class="product-added">
                <div class="item-added-photo">
                    <img src="${item.image}" alt="">
                </div>
                <div class="detalii-add-to">
                    <h6>${item.title}</h6>
                    <div class="price-total-per-product">
                        <span class="quantity-added">${item.quantity}</span>
                        <span class="ori"> X </span>
                        <span class="total-price-one-p">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
                <div class="delete-product" data-id="${item.id}"><i class="fa-solid fa-circle-xmark"></i></div>
            </div>`;
        cartItemsContainer.appendChild(productCart);
       
    });
    const totalAmount = calculateTotal(); 
    const subtotalDisplay = document.querySelector('.subtotal-price'); 
    subtotalDisplay.textContent = `$${totalAmount}`;
    const deleteButtons = document.querySelectorAll('.delete-product');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.getAttribute('data-id')); 
            removeFromCart(productId); 
        });
    });
   
};
const removeFromCart = (productId) => {
    cartProduse = cartProduse.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cartProduse));
    renderCart();
    
};

function addToCart(produs) {
    const cartDinLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cartDinLocalStorage.findIndex(item => item.id === produs.id);
    
    if (existingProductIndex > -1) {
        cartDinLocalStorage[existingProductIndex].quantity += selectedQuantity;
    } else {
        cartDinLocalStorage.push({ ...produs, quantity: selectedQuantity });
    }

    localStorage.setItem('cart', JSON.stringify(cartDinLocalStorage));
    
    cartProduse.length = 0; 
    cartProduse.push(...cartDinLocalStorage); 
    renderCart();
  
  
  }


  const calculateTotal = () => {
    let total = 0;
    cartProduse.forEach(item => {
       
        total += item.price * item.quantity;
    });
    return total.toFixed(2);
};






//AICI SE AFLA PRODUSELE PRINTATE 
const printeazaProdus=(product, productBox)=>{
    
    const item=document.createElement("div");
    item.classList.add('card');
    item.dataset.id=product.id;
    item.innerHTML=` <div class="item">
                <img src="${product.image}" alt="${product.description}" />
                <div class="info">
                    <h4>${product.title}</h4>
                    <h6>lorem ipsum </h6>
                    <p> ${product.price}$</p>
                </div>
              </div>
              <div class="hover">
                <div class="arrage-buttons">
                    <button aria-label="Add to Cart" class="add-to-cart">Add to cart</button>
                <div class="links-icons">
                  <div class="hover-icon"><i class="fa-solid fa-share-nodes"></i> Share</div>
                  <div class="hover-icon"><i class="fa-solid fa-arrow-right-arrow-left"></i>Compare</div>
                  <div class="hover-icon"><i class="fa-regular fa-heart"></i>Like</div>
                </div>
                </div>
              </div>`;
        productBox.appendChild(item);
       
       
        const hover=item.querySelector(".hover");
        const itemContent = item.querySelector(".item");
        const itemBtn=item.querySelector(".add-to-cart");

        item.addEventListener("mouseenter", () => {
            timer = setTimeout(() => {
                hover.classList.add("hoverd");
            }, 900); 
        });
    
        item.addEventListener("mouseleave", () => {
            clearTimeout(timer); 
            hover.classList.remove("hoverd"); 
        });

      itemContent.addEventListener("click", () => {
        showProductDetails(product);
        singleProductPage.scrollIntoView({
            behavior: "smooth", 
            block: "start"      
        });
        productsDetalii(product);
      });  

      itemBtn.addEventListener("click",()=>{
        console.log('Adding to cart:', product);
        addToCart(product);
      })

}

const printeazaProduse=(arrayProduse)=>{
    const primaCutie=document.querySelector('#first-box');
    const aDouaCutie=document.querySelector('#second-box');
    const atreiaCutie=document.querySelector("#third-box");
    const apatraCutie=document.querySelector("#forth-box");
    const acinceaCutie=document.querySelector("#fifth-box");
    const asaseaCutie=document.querySelector("#sixth-box");
    primaCutie.innerHTML='';
    aDouaCutie.innerHTML='';
    atreiaCutie.innerHTML='';
    apatraCutie.innerHTML='';
    acinceaCutie.innerHTML='';
    asaseaCutie.innerHTML='';
        arrayProduse.forEach((produs) => {
            printeazaProdus(produs , primaCutie);
            printeazaProdus(produs , aDouaCutie);
            printeazaProdus(produs , atreiaCutie);
            printeazaProdus(produs , apatraCutie);
            printeazaProdus(produs , acinceaCutie);
            printeazaProdus(produs , asaseaCutie);
        });
}


const showProductDetails = (product) => {
    homePage.style.display = "none";
    shopPage.style.display = "none";
    singleProductPage.style.display = "flex";
    
    document.querySelector(".number-reviews").textContent = product.rating.count;
    document.querySelector(".product-img").src = product.image;
    document.querySelector("#title-product").textContent = product.title;
    document.querySelector(".description").textContent = product.description;
    document.querySelector("#price-product").textContent = `${product.price}$`;

    selectedQuantity = 1;
    updateQuantityDisplay();
    
    const addToCartButton = document.querySelector("#single-product .add-to-cart");

    // Remove any previously attached event listeners to avoid duplication
    const newAddToCartButton = addToCartButton.cloneNode(true);
    addToCartButton.parentNode.replaceChild(newAddToCartButton, addToCartButton);

    newAddToCartButton.addEventListener("click", () => {
        addToCart(product); // Add product with the current quantity
    });

    console.log("Product details viewed:", product);
    console.log("Reset selected quantity to:", selectedQuantity);
};





  const productsDetalii = (product) => {
  
   
    
    const images = document.querySelectorAll(".img-side");
    images.forEach(img=>{
        img.src=product.image;
    })
    document.querySelector("#bread-crum").textContent = product.title;
   
    
  };
  

const fetchJewelery=async function (){
    try{
        const response= await fetch('https://fakestoreapi.com/products/category/jewelery');
        const jewleryData=await response.json();
        
        const productImages = [
            { id: 5, image: './photos/dragon-jewel.jpg',title: "John Hardy Women's Legends  "}, 
            { id: 6, image: './photos/ring.webp',title:"Solid Gold Petite Micropave" },
            { id: 7, image: './photos/ring-diamon.jpg',title: "White Gold Plated Princess" },
            { id: 8, image: './photos/cercei.jpeg',title:"Pierced Gold Plated Stainless" }
        ];
        
        productImages.forEach(product => {
            const productToUpdate = jewleryData.find(p => p.id === product.id);
            if (productToUpdate) {
                productToUpdate.image = product.image; 
                productToUpdate.title=product.title;
                updateProductImage(product.id, product.image,product.title); 
            }
        });
        
        printeazaProduse(jewleryData);
    }catch(error){
        console.log("error fetching jewelery: ", error);
    }
}

function updateProductImage(productId, newImageUrl,title) {
    fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "PUT",
        body: JSON.stringify({
            image: newImageUrl,
            title:title
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(json => console.log(`Updated product ${productId} image:`, json))
    .catch(err => console.error(`Error updating product ${productId}:`, err));
}

renderCart(cartProduse);
fetchJewelery();

