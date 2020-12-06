const db = firebase.firestore();

// Home
$(function() {
    document.addEventListener('init', function(event) {
        var page = event.target;
         if (page.id === "home1") {
          getAdvertising();
          getRecommend();
        }else if (page.id ==="search1"){
          getEntertainment();
        }else if(page.id ==="profile"){
          getProfile();
        }
    });
    document.querySelector('ons-tabbar').addEventListener('reactive', function (event) {
      if (event.index == 0) {
          document.querySelector('#Navigator_home').popPage();
      } else if (event.index == 1) {
          document.querySelector('#Navigator_search1').popPage();
      }
    })
});

function getAdvertising(){
    db.collection("advertising").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const Result = `
      <ons-carousel-item style="text-align: center;" id="${doc.data().name}"> 
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

        <div class="col-6 p-1">
               <div class="photoproduct"> 
                    <div class="d-flex align-items-end">
                      <img src="${doc.data().posterURL}" style= "width:100%">
                    </div>
               </div>
        </div> `

     $("#recommend").append(Result);
    });
  });
}

function openproductDetails(id) {
    document.querySelector('#myNavigator').pushPage('product_details.html', {data: {title: id}});
  }

  function goBack() {
    document.querySelector('#menu').close().then(function() {
      document.querySelector('#myNavigator').popPage()
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
        <ons-row class="rowmagin se" id="${doc.data().name}"> 
        <ons-row style="margin: 5px;">
            <ons-col class="text-center">
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
      product_detials($(this).attr('id'))
      document.querySelector("#myNavigator_search").pushPage('view/product_details.html');
    })
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
                  const result =
                      /*html*/
                      `

                      <ons-col class="col-6 p-1">
                      <div class="containerH" >
                      <img src="${doc.data().posterURL}" width="100%">
                   </div>
                      </ons-col>
                      `
                  $("#searchItem").append(result);
              }
          });
          $(".imgSrc").click(function () {
              const productTarget = $(this).attr('id');
              getmovieDetailSrc(productTarget)
              document.querySelector("#Navigator_search").pushPage("views/product_details.html");
          });
      });
  })
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
