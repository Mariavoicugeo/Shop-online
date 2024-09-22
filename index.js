

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
        const card=item.querySelector(".card");


    item.addEventListener("mouseenter",()=>{
    hover.classList.add("hoverd");
})
       

}

const printeazaProduse=(arrayProduse)=>{
    const primaCutie=document.querySelector('#first-box');
    const aDouaCutie=document.querySelector('#second-box');
    primaCutie.innerHTML='';
    aDouaCutie.innerHTML='';
        arrayProduse.forEach((produs) => {
            printeazaProdus(produs , primaCutie);
            printeazaProdus(produs , aDouaCutie);
        });
}


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

