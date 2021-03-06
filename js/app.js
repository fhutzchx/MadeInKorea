const db = firebase.firestore();

// Home
$(function() {
    document.addEventListener('init', function(event) {
        var page = event.target;
         if (page.id === "home") {
          getAdvertising();
          getRecommend();
        }else if (page.id ==="search"){
          getEntertainment();
        }else if(page.id==="cart"){
          getfromcart(); 
        }else if(page.id==="details"){
          getproductDetail();
        }
        else if(page.id ==="profile"){
          getProfile();
        }
    });

    document.querySelector('ons-tabbar').addEventListener('reactive', function (event) {
      if (event.index == 0) {
          document.querySelector('#Navigator_home').popPage();
      } else if (event.index == 1) {
          document.querySelector('#Navigator_search').popPage();
      }else if (event.index == 2 ) {
         document.querySelector('#Navigator_cart').popPage();
    }
    else if (event.index == 3 ) {
      document.querySelector('#Navigator_profile').popPage();
  }
    })
});




function getAdvertising(){
    db.collection("advertising").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const Result = `
      <ons-carousel-item style="text-align: center;" > 
      <img src="${doc.data().posterURL}" style=" width:100%; ">
      </ons-carousel-item>`

      $("#advertiser").append(Result);
      });
    });
  }


function getRecommend(){
    db.collection("product").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const Result = ` 

        <div class="col-6 p-1" id="${doc.data().name}"  onclick="getproductDetail(this.id)">
               <div class="photoproduct"> 
                    <div class="d-flex align-items-end">
                      <img src="${doc.data().posterURL}" class="productimg" style= "width:100%">
                    </div>
               </div>
        </div> `

     $("#recommend").append(Result);
    });

    $(".productimg").click(function () {
      const productTarget = $(this).attr('id');
      getproductDetail(productTarget)
      document.querySelector("#Navigator_home").pushPage("views/details.html");
    });
  });
}


  // Search
 function getfromSearch() {

  const searchText = $("#searchInput").val()
  const newsearchText = searchText.replace(/ /g, "");

  $("#searchItem").empty();
  db.collection("product").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

      const productname = doc.data().name;
      const newproductname = productname.replace(/ /g, "");
      console.log(newproductname);
      if (newproductname.toLowerCase().indexOf(newsearchText.toLowerCase()) != -1) {
        if (`${doc.data().star}`== 5) {
          var star = `
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>`
          
        }
        else if (`${doc.data().star}`== 4) {
          var star = `
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>`
        }

        else if (`${doc.data().star}` == 3) {
          var star = `
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>`
        }

        else if (`${doc.data().star}` == 2) {
          var star = `
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>`
        }else{
          var star = `
          <ons-icon style="color: red" icon="fa-star"></ons-icon>`
   
      }

        const result = `
        <ons-row class="rowmagin se" > 
        <ons-row style="margin: 5px;">
            <ons-col class="text-center"id="${doc.data().name}"  onclick="getproductDetail(this.id)">
            <img src="${doc.data().posterURL}" width="75%" style="margin: 5px 5px;" alt="">
            </ons-col>
        <ons-col>
            <p style="font-size:18px">${doc.data().name}</p>
            <p class="detail_search">${doc.data().description}</p>
            <p style="font-size:15px">`+ star +`</p>
            </ons-col>
        </ons-row>`
      
        console.log(doc.data());
        $("#searchItem").append(result)
      }
    });
    $(".se").click(function () {
      const productTarget = $(this).attr('id');
      getproductDetail(productTarget)
      document.querySelector("#Navigator_search").pushPage("views/details.html");
      
    });
  });
}


//Search by Entertainment
function getEntertainment() {
  $("ons-carousel-item button").click(function () {
      $("#searchResult").val("")
      $("#searchItem").empty();
      const targetEntertainment = $(this).attr('id')
      db.collection("product").get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
              const Entertainment = doc.data().entertainment
              if (Entertainment.includes(targetEntertainment)) {
                  const result = `
                      <ons-col class="col-6 p-1" id="${doc.data().name}"  onclick="getproductDetail(this.id)">
                      <div class="containerH" >
                      <img src="${doc.data().posterURL}" class="productimg" width="100%">
                      </div>
                      </ons-col>
                      `
                  $("#searchItem").append(result);
              }
          });
          $(".productimg").click(function () {
              const productTarget = $(this).attr('id');
              getproductDetail(productTarget)
              document.querySelector("#Navigator_search").pushPage("views/details.html");
          });
      });
  })
}

function getproductDetail(id) {
  db.collection("product").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {

          if(doc.data().name == id){
              const Result = `
            <ons-carousel class="carousel" swipeable auto-scroll id="carousel"">
              <ons-carousel-item>
                <img src="${doc.data().posterDetail}">
              </ons-carousel-item>
              <ons-carousel-item>
                <img src="${doc.data().posterDetail2}">
              </ons-carousel-item>
            </ons-carousel>
    
          <div class="movie_info">
          <div class="movie_synopsis Prompt"><h1>${doc.data().name}</h1>
            <ons-row class="movie_general_info">

                <ons-col class="stars">
                    <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                    <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                    <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                    <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                    <ons-icon style="color: #EC1D8F" icon="fa-star"></ons-icon>
                </ons-col>

                <ons-col>${doc.data().entertainment}</ons-col>
            </ons-row>

            <div class="movie_cast">
            ${doc.data().price} THB
            </div>

            <div class="detail_product">
            ${doc.data().description}
            </div>
            
        </div>
        <div class="area-btn">
            <button type="button" onclick="addtocart('${doc.data().posterURL}','${doc.data().name}','${doc.data().price}')" class="cart-btn btn-lg btn-block" >ADD TO CART</button>
            <div id="showVideoFav"></div>
        </div>
          `
              $("#productdetail").append(Result)
          }
      }); 
   
  });
}


document.addEventListener('init', function (event) {
  var page = event.target;

  if (page.id === 'page1') {
      page.querySelector('#push-button').onclick = function () {
          document.querySelector('#myNavigator').pushPage('index.html', { data: { title: 'Page 2' } });
      };
  } else if (page.id === 'page2') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
  }
});

 function goBack() {
    document.querySelector('#back').close().then(function() {
      document.querySelector('#myNavigator').popPage();
    });
  }

function addtocart(photo,name,price){
  firebase.auth().onAuthStateChanged
  (function (user) {
    var uid = user.uid;
    if (user) {

      console.log(uid);
      console.log(photo,name,price);
      
       db.collection("Cart").add({
        uid: uid,
        productName: name,
        photo : photo,
        price: price,
        
     
      }) 
      
        .then(function (docRef) {
          console.log("success");
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        })
      }
    })
}

function getfromcart() {
  db.collection("Cart").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {

          
              const Result = `
              <hr>
              <ons-row class="rowmagin" > 
              <ons-row style="margin: 5px;">
                <ons-col class="text-center">
                <img src="${doc.data().photo}" width="82%" style="margin: 5px 5px;" alt="">
                </ons-col>

              <ons-col>
                <p style="font-size:18px">${doc.data().productName}</p>
                <p style="font-size:18px" class="detail_search">${doc.data().price} THB </p>
              </ons-col>
       
            <div class="area-btn">
            <button type="button" id="${doc.id}" onclick="payment(id)" class="cart-btn btn-lg btn-block" >PAYMENT</button>
            <br><br>
            <button type="button" id="${doc.id}" onclick="deleted(id)" class="cart-btn2 btn-lg btn-block" >DELETE</button>
            </div>
            <hr>
              
            
          `
              $("#showShoppingCart").append(Result)
              
      }); 
    
  });
}

function deleted(id){
  ons.notification.alert('Delete Success!');
  $('#showShoppingCart').hide();
  console.log(id);
  db.collection("Cart").doc(id).delete();
};


function payment(id) {
  ons.notification.alert('Payment Success!');
  $('#showShoppingCart').hide();
    db.collection("Cart").doc(id).delete();
};



document.addEventListener('init', function (event) {
  var page = event.target;
  if (page.id === 'cartpage') {
    db.collection("Cart").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        firebase.auth().onAuthStateChanged
        (function (user) {
          var uid = user.uid;
          if (user) {
        if(doc.data().uid == uid){
          const Result = `
          <div class="">
          ${doc.data().name} 
          </div>
    
          `
          $("#productcart").append(Result)
        }
      }
      })
      })
    })
  }
})



