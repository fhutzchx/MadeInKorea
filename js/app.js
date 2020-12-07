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

// Search by Entertainment
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
              <ons-carousel-item>
                <img src="${doc.data().posterDetail3}">
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
            <ons-button type="button" id="btnPlayFav" class="cart-btn btn-lg btn-block">ADD TO CART</ons-button>
            <div id="showVideoFav"></div>
        </div>

        <div class="area-btn">
            <ons-button type="button" id="btnPlayFav" class="buy-btn btn-lg btn-block">BUY WITH <i class="fa fa-google fa-fw"></i> PAY</ons-button>
            <div id="showVideoFav"></div>
        </div>


        <div class="movie_list">
            <div class="detail_product">You might also Like</div>
            <ons-carousel auto-refresh swipeable overscrollable item-width="50px">
                <ons-carousel-item modifier="nodivider">
                    <img src="assets/images/e12.png">
                </ons-carousel-item>
                <ons-carousel-item modifier="nodivider">
                    <img src="assets/images/e13.png">
                </ons-carousel-item>
                <ons-carousel-item modifier="nodivider">
                    <img src="assets/images/e14.png">
                </ons-carousel-item>
                <ons-carousel-item modifier="nodivider">
                    <img src="assets/images/e6.png">
                </ons-carousel-item>
                <ons-carousel-item modifier="nodivider">
                    <img src="assets/images/e7.png">
                </ons-carousel-item>
            </ons-carousel>
        </div>

    </div>

          
          `
              $("#productdetail").append(Result)
          }
      }); 
      document.querySelector("#Navigator_search").pushPage("views/details.html");
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
// Tab
window.fn = {};

  window.fn.open = function() {
    var menu = document.getElementById('menu');
    menu.open();
  };
  
  window.fn.load = function(page) {
    var content = document.getElementById('content');
    var menu = document.getElementById('menu');
    content.load(page)
      .then(menu.close.bind(menu));
  };
