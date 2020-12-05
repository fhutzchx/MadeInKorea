
function productDetail(id) {
    db.collection("product").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            if (doc.data().rating == 5) {
                var star = ` 
           <ons-icon style="color: black" icon="fa-star"></ons-icon>
            <ons-icon style="color: black" icon="fa-star"></ons-icon>
            <ons-icon style="color: black" icon="fa-star"></ons-icon>
            <ons-icon style="color: black" icon="fa-star"></ons-icon>
            <ons-icon style="color: black" icon="fa-star"></ons-icon>
            `

            } else if (doc.data().rating == 4) {
                var star = ` 
           <ons-icon style="color: black" icon="fa-star"></ons-icon>
            <ons-icon style="color: black" icon="fa-star"></ons-icon>
            <ons-icon style="color: black" icon="fa-star"></ons-icon>
            <ons-icon style="color: black" icon="fa-star"></ons-icon>
            <ons-icon style="color: gray" icon="fa-star"></ons-icon>`

            } else if (doc.data().rating == 3) {
                var star = ` 
           <ons-icon style="color: black" icon="fa-star"></ons-icon>
            <ons-icon style="color: black" icon="fa-star"></ons-icon>
            <ons-icon style="color: black" icon="fa-star"></ons-icon>
            <ons-icon style="color: gray" icon="fa-star"></ons-icon>
            <ons-icon style="color: gray" icon="fa-star"></ons-icon>`

            } else if (doc.data().rating == 2) {
                var star = ` 
           <ons-icon style="color: black" icon="fa-star"></ons-icon>
            <ons-icon style="color: black" icon="fa-star"></ons-icon>
            <ons-icon style="color: gray" icon="fa-star"></ons-icon>
            <ons-icon style="color: gray" icon="fa-star"></ons-icon>
            <ons-icon style="color: gray" icon="fa-star"></ons-icon>`

            } else if (doc.data().rating == 1) {
                var star = ` 
           <ons-icon style="color: black" icon="fa-star"></ons-icon>
            <ons-icon style="color: gray" icon="fa-star"></ons-icon>
            <ons-icon style="color: gray" icon="fa-star"></ons-icon>
            <ons-icon style="color: gray" icon="fa-star"></ons-icon>
            <ons-icon style="color: gray" icon="fa-star"></ons-icon>`

            }


            if (doc.data().name == id) {
                const result = `
              <div class="container">
                  <div> 
                  <div style="color:black; font-size:30px; margin-top:10px; text-align: left;">
                  <br>
                    <b> ${doc.data().name}</b></div>
                  <div class="row" style="color: grey; font-size:16px; margin-top: 5px; text-align: left; display: flex;">
                  <div class="col-4" style="padding-right :10px;">`+ star + `</div>
                  <div class="col-4" style="padding-right :10px;">${doc.data().entertainment}</div>
                  <div class="col-4" style="padding-right :10px;" >${doc.data().price}</div>
                  </div>
              </div>
            `
                $("#productdetail").append(result)
            }

        });
    });
    document.querySelector('#myNavigator').pushPage('views/product_details.html');
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
