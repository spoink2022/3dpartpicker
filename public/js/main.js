$( document ).ready(function() {


    let cards = document.getElementsByClassName('products')
    console.log(cards)
    let cardsinfo = []
    for (let i = 0; i < parts.length; i++) {
        //access tags, price, image, name 
        let partName = parts[i]['name']
        let tags = [parts[i]['tag'],parts[i]['tag_2']]
        let price= parts[i]['price_20']
        let partImage = parts[i]['image']
        let card = `
            <div class='productCard'>\n

                <a href = "THELINKKKK"><img src='${partImage}' alt='Photo'></img></a>\n
                <p class='price'>${price}</p>\n
                <p class='name'>${partName}</p>\n
                <div class='tags'>\n
                `;
        for (let i = 0; i < tags.length; i++){
            if(tags[i]) {card += tags[i]}
        }
        card+='</div>\n</div>\n'
        cardsinfo.push(card)
        //card is complete for one
    }
    let count = 0;
    for (let i = 0; i < cards.length; i++){
        for (let j = 0; j < 5; j++){
            //console.log(count, cardsinfo[count])
            console.log(cards[i])
            
            cards[i].innerHTML += cardsinfo[count];
            if(count ==parts.length-1){
                count = 0;
            }else{
                count++;
            }
        }
    }
    

});
