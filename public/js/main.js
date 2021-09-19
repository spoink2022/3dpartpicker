$( document ).ready(function() {
    updateAvatarInfo();
    //let popularcards = document.getElementsByClassName('popularProducts')
    let lineofcards = document.getElementsByClassName('products')
    let cardorder = [[0,1,2,3,4],[5,6,7,8,9],[10,1,2,3,4]]
    for (let i = 0;i<lineofcards.length;i++){
        let rowOfCards = cardorder[i]
        for (let j=0; j<4; j++) { 
            //info on card
            let cardinfo = parts[rowOfCards[j]]
            console.log(cardinfo)
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
            cardname.innerHTML = `<bold>${partName}</bold>`;
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
            
            console.log(cardlink)
        }

    }
});

function updateAvatarInfo() {
    let avatarText = document.getElementById('avatarText');
    avatarText.innerHTML = user ? user.first_name + ' ' + user.last_name : 'Login';
    if (!user) { avatarText.href = '/?user=1'; }

    let avatarImg = document.getElementById('avatarImg');
    avatarImg.src = avatarUrl;
}