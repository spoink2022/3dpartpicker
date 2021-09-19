$( document ).ready(function() {

    let popularcards = document.getElementsByClassName('MS-content')[0]
    for(let i = 0;i<5;i++){
        
        let popcardinfo = parts[i]

        let popid = popcardinfo['id'];//for href anchor tag around image
        let poppartName = popcardinfo['name'];
        let poptags = [popcardinfo['tag'],popcardinfo['tag_2']];
        let popprice= popcardinfo['price_20'];
        let popdollarprice = popprice/100;
        
        let poppartImage = popcardinfo['images'][0];
        let popcardlink = document.createElement('a');
        popcardlink.setAttribute('href',`http://localhost:3000/product?id=${popid}&user=1`)
        //popcardlink.classList.add('cardlink');//css class needeed display block the link
        popcardlink.classList.add('item');
        let popcarddiv = document.createElement('div');
        popcarddiv.classList.add('carddiv');//css class needeed
        let popcardimg = document.createElement('img');
        popcardimg.setAttribute('src', poppartImage);
        popcardimg.setAttribute('alt', 'Photo');
        popcardimg.classList.add('cardimg');//css class needeed
        let popcardprice = document.createElement('p');
        popcardprice.innerHTML = 'Price: $'+popdollarprice.toFixed(2);
        let popcardname = document.createElement('p');
        popcardname.innerHTML = poppartName;
        popcardname.classList.add('cardname');//css class needeed
        popcardlink.appendChild(popcarddiv);
        popcarddiv.appendChild(popcardimg);
        popcarddiv.appendChild(popcardprice);
        popcarddiv.appendChild(popcardname);
        //console.log(cardprice)
        popcardprice.classList.add('cardprice');//css class needeed           
        for (let i = 0; i < poptags.length; i++){
            if(poptags[i]) {
                let popcardtag = document.createElement('p');
                popcardtag.innerHTML = poptags[i];
                popcardtag.classList.add('cardtag');//css class needeed
                popcarddiv.appendChild(popcardtag);
            }
        }
        popularcards.append(popcardlink)
        
        console.log(popcardlink)
        }
    
    //give each item an item class

    
    let lineofcards = document.getElementsByClassName('products')
    let cardorder = [[0,1,2,3,4],[5,6,7,8,9],[10,1,2,3,4]]
    for (let i = 0;i<lineofcards.length;i++){
        let rowOfCards = cardorder[i]
        for (let j=0; j<4; j++) { 
            //info on card
            let cardinfo = parts[rowOfCards[j]]
            let id = cardinfo['id'];//for href anchor tag around image
            let partName = cardinfo['name'];
            let tags = [cardinfo['tag'],cardinfo['tag_2']];
            let price= cardinfo['price_20'];
            let dollarprice = price/100;
            //console.log(cardinfo['price'])
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
            let cardprice = document.createElement('p');
            cardprice.innerHTML = 'Price: $'+dollarprice.toFixed(2);
            let cardname = document.createElement('p');
            cardname.innerHTML = partName;
            cardname.classList.add('cardname');//css class needeed
            
            cardlink.appendChild(cardimg);
            cardlink.appendChild(cardname);
            cardlink.appendChild(cardprice);
            //console.log(cardprice)
            cardprice.classList.add('cardprice');//css class needeed           
            for (let i = 0; i < tags.length; i++){
                if(tags[i]) {
                    let cardtag = document.createElement('p');
                    cardtag.innerHTML = tags[i];
                    cardtag.classList.add('cardtag');//css class needeed
                    cardlink.appendChild(cardtag);
                }
            }
            lineofcards[i].append(cardlink)
        }
    }
});