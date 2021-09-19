$( document ).ready(function() {

    //let popularcards = document.getElementsByClassName('popularProducts')
    let lineofcards = document.getElementsByClassName('products')
    let cardorder = [[1,2,3,4,5],[6,7,8,9,10],[11,1,2,3,4]]
    for (let i = 0;i<lineofcards.length;i++){
        let rowOfCards = cardorder[i]
        console.log(lineofcards[i])
        for (let j=0; j<5; j++) { 
            //info on card
            let cardinfo = rowOfCards[j]
            let id = cardinfo['id'];//for href anchor tag around image
            let partName = cardinfo['name'];
            let tags = [cardinfo['tag'],cardinfo['tag_2']];//condiiton needed to check if tag is null
            let price= cardinfo['price_20'];
            let dollarprice = price/100;
            let partImage = cardinfo['images'][0];

            //creating card
            let cardlink = document.createElement('a');
            cardlink.setAttribute('href',`http://localhost:3000/product?id=${id}&user=1`)
            cardlink.classList.add('cardlink');//css class needeed display block the link
            let carddiv = document.createElement('div');
            carddiv.classList.add('carddiv');//css class needeed
            let cardimg = document.createElement('img');
            cardimg.setAttribute('src', partImage);
            cardimg.setAttribute('alt', 'Photo');
            cardimg.classList.add('cardimg');//css class needeed
            let cardprice = document.createTextNode(dollarprice);
            cardprice.classList.add('cardprice');//css class needeed           
            for (let i = 0; i < tags.length; i++){
                if(tags[i]) {
                    let cardtag = document.createTextNode(tag[i]);
                    cardtag.classList.add('cardtag');//css class needeed
                }
            }
           let cardname = document.createTextNode(partName);
            cardname.classList.add('cardname');//css class needeed
            carddiv.appendChild(cardimg);
            carddiv.appendChild(cardprice);
            carddiv.appendChild(cardtags);
            carddiv.appendChild(cardimg);
            lineofcards[i].append(carddiv)
        }

    }
});