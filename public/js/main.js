$( document ).ready(function() {


    let cards = docuemnt.getElementsByClassName('products')
        for (let i = 0; i < parts.length; i++) {
            //access tags, price, image, name 
            let name = parts[i][name]
            let tags = [parts[i][tag],parts[i][tag_2]]
            let price= parts[i][price_20]
            let image = parts[i][image]
            let card = `
                <div class='productCard'>

                    <a href = "THELINKKKK"><img src='${image}' alt='Photo'></img></a>
                    <p class='price'>${price}</p>
                    <p class='name'>${name}</p>
                    <div class='tags'>
                    `
            for (let i = 0; i < tags.length; i++){
                if(tags[i]) {card += tag[i]}
            }
            card+='</div>'
            //card is complete for one

    
    }
});
