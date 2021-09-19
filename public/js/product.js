onload = async function() {
    updateTexts();
    updateImages();

    if (user) {
        // fill in hidden form attributes
        let hiddenUserInput = document.getElementById('hiddenUserInput');
        hiddenUserInput.value = user ? user.id : false;
        let hiddenPartInput = document.getElementById('hiddenPartInput');
        hiddenPartInput.value = part.id;
    } else {
        // erase checkout form
        let checkoutForm = document.getElementById('checkoutForm');
        checkoutForm.remove();
    }
}

function updateTexts() {
    let discover = document.getElementById('discover');
    if (!user) { discover.style.visibility = 'visible'; }
    
    let partTitle = document.getElementById('partTitle');
    partTitle.innerHTML = part.name;

    let avatarText = document.getElementById('avatarText');
    avatarText.innerHTML = user ? user.first_name + ' ' + user.last_name : 'Login';
    if (!user) { avatarText.href = '/?user=1'; }

    let tagList = document.getElementById('tagList');
    let elem = document.createElement('h3');
    elem.innerHTML = part.tag;
    tagList.appendChild(elem);
    if (part.tag_2) {
        let elem = document.createElement('h3');
        elem.innerHTML = part.tag_2;
        tagList.appendChild(elem);
    }

    let partDescription = document.getElementById('partDescription');
    for (let text of part.description) {
        let elem = document.createElement('li');
        elem.innerHTML = text;
        partDescription.appendChild(elem);
    }
}

function updateImages() {
    let imageList = document.getElementById('imageList');
    for (let i=0; i<part.img_qt; i++) {
        let elem = document.createElement('img');
        elem.setAttribute('src', part.images[i]);
        imageList.appendChild(elem);
    }

    let avatarImg = document.getElementById('avatarImg');
    avatarImg.setAttribute('src', avatarUrl);
}