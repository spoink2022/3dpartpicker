$( document ).ready(function() {


    let cards = document.getElementsByClassName('products')
    console.log(cards)
    let cardsinfo = []
    for (let i = 0; i < parts.length; i++) {
        //access tags, price, image, name 
        let id = parts[i]['id'];
        let partName = parts[i]['name'];
        let tags = [parts[i]['tag'],parts[i]['tag_2']];
        let price= parts[i]['price_20'];
        let dollarprice = price/100;
        let partImage = parts[i]['images'][0];
        let card = `
            <div class='productCard'>

                <a href = "http://localhost:3000/product?id=${id}&user=1"><img src='${partImage}' alt='Photo'></img></a>
                <p class='price'>Price: $${dollarprice.toFixed(2)}</p>
                <p class='name'>${partName}</p>
                <div class='tags'>
                
                `;
        for (let i = 0; i < tags.length; i++){
            if(tags[i]) {card += tags[i]+' '}
        }
        card+='</div></div>'
        cardsinfo.push(card)
        //card is complete for one
    }
    let count = 0;
    for (let i = 0; i < cards.length; i++){
        for (let j = 0; j < 7; j++){
            //console.log(count, cardsinfo[count])
            
            
            cards[i].innerHTML += cardsinfo[count];
            if(count ==parts.length-1){
                count = 0;
            }else{
                count++;
            }
        }
    }
    

});
