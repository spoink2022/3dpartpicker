onload = async function() {
    updateTexts();
    updateImages();
}

function updateTexts() {
    let partTitle = document.getElementById('partTitle');
    partTitle.innerHTML = part.name;

    let avatarText = document.getElementById('avatarText');
    avatarText.innerHTML = fullName;

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