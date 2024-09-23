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
                    <button aria-label="Add to Cart">Add to cart</button>
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
    document.querySelector(".number-reviews").textContent=product.rating.count;
    document.querySelector(".product-img").src= product.image;
    document.querySelector("#title-product").textContent = product.title;
    document.querySelector(".description").textContent = product.description;
    document.querySelector("#price-product").textContent = `${product.price}$`;
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
        console.log(jewleryData);
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



fetchJewelery();

