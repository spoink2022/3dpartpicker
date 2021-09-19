// GLOBAL VARIABLES 
let activeMarkers = [];
let lastOpenedMarker = null;


// FUNCTION
onload = function() {
    // login        
    let avatarText = document.getElementById('avatarText');
    if (part) {
        avatarText.innerHTML = user.first_name + ' ' + user.last_name;
    } else {
        avatarText.innerHTML = 'Login';
        avatarText.href = `/?user=1`;
    }
    
    let avatarImg = document.getElementById('avatarImg');
    avatarImg.src = avatarUrl;

    if (!part)
    {
        let caption1 = document.getElementById('caption1');
        caption1.style.fontSize = '70px';
        caption1.innerHTML = "Check out some of the 3D printers nearby!";

        let caption2 = document.getElementById('caption2');
        caption2.innerHTML = "Click on the icons for more details.";
    }
    else
    {
        let caption1 = document.getElementById('caption1');
        caption1.innerHTML = "YOU'RE ALMOST THERE!";

        let caption2 = document.getElementById('caption2');
        caption2.innerHTML = "Just select a nearby seller and you'll be on your way.";

        let checkoutQt = document.getElementById('checkoutQt');
        checkoutQt.value = part.qt;

        let checkoutProduct = document.getElementById('checkoutProduct');
        checkoutProduct.value = part.id;

        let selectedItem = document.getElementById('selectedItem');
        selectedItem.innerHTML = `${part.name} x${part.qt} - $${(Math.round(part.price_20*part.qt)/100).toFixed(2)}`;

        let checkoutElements = document.getElementById('checkoutElements');
        checkoutElements.style.visibility = 'visible';

        let selectedItemImage = document.getElementById('selectedItemImage');
        selectedItemImage.classList.add('itemImage'); 
        selectedItemImage.src = part.images[0];
        console.log(selectedItemImage);
    }
}

function updateSelectedPrinter(s) {
    if (!part) {
        return;
    }

    let distanceKm = Math.round(Math.sqrt(Math.pow(user.lat - s.lat, 2) + Math.pow(user.lon - s.lon, 2)) * 111 * 10)/10;

    let selectedName = document.getElementById('selectedName');
    selectedName.innerHTML = s.first_name + ' ' + s.last_name + ' - ' + distanceKm + 'km';

    let selectedAddress = document.getElementById('selectedAddress');
    selectedAddress.innerHTML = s.address;

    let selectedProfile = document.getElementById('selectedProfile');
    selectedProfile.src = s.avatar_url;

    let checkoutSeller = document.getElementById('checkoutSeller');
    checkoutSeller.value = s.id;

    let checkoutButton = document.getElementById('checkoutButton');
    checkoutButton.disabled = false;
}

// MAPS
function initMap() {
    const def = { lat: 43.6532, lng: -79.3832 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: def,
    });

    if (!sellers)
    {
        const locationButton = document.createElement("button");
        locationButton.textContent = "Discover 3D Printers";  // element text
        locationButton.classList.add("discoverbutton");  // add this as a class attribute
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

        // style the discover button
        locationButton.style.fontFamily = "Rubik";
        locationButton.style.cursor = "pointer";
        locationButton.style.border = "none"; 
        locationButton.style.marginTop = "20px";
        locationButton.style.padding = "15px"; 
        locationButton.style.boxShadow = "1px 2px 4px rgba(0,0,0,.3)";
        locationButton.style.color = "#DA8F2A";

        locationButton.addEventListener("click", () => {
            // ask user for location, true if they accept  
            navigator.geolocation.getCurrentPosition((position) => {
                user = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                // autofill the form
                let latCoord = document.getElementById('latCoord');
                latCoord.value = user.latitude;
                let lonCoord = document.getElementById('lonCoord');
                lonCoord.value = user.longitude;
                let coordinateButton = document.getElementById('coordinateButton');
                coordinateButton.click();
            }); 
        });
    }
    else if (sellers)
    {
        handleMarkers(user,sellers,map);
    }

}

// FUNCTIONS 

function handleMarkers(position,sellers,map)
{
    const userPosition = { lat: position.lat, lng: position.lon };
    let userIcon = {
        url: "https://cdn4.iconfinder.com/data/icons/devine_icons/Black/PNG/Folder%20and%20Places/Home.png",
        scaledSize: new google.maps.Size(50, 50), 
        origin: new google.maps.Point(0,0), 
    };
    
    // create the user marker, set position to their detected position  
    const userMarker = new google.maps.Marker({
        position: userPosition,
        map,
        icon: userIcon
    });
    
    // clear existing markers
    if (activeMarkers.length != 0)
    {
        for (let i = 0; i < activeMarkers.length; i++)
        {
            activeMarkers[i].setMap(null);
        }
    }
    
    // create markers for sellers   
    for (let i = 0; i < sellers.length; i++)
    {
        // determine colour of marker
        let icon = "http://labs.google.com/ridefinder/images/mm_20_red.png";
        
        if (sellers[i].rating > 4)
        {
            icon = "http://labs.google.com/ridefinder/images/mm_20_green.png";
        }
        else if (sellers[i].rating > 3)
        {
            icon = "http://labs.google.com/ridefinder/images/mm_20_yellow.png";
        }
        else if (sellers[i].rating > 2)
        {
            icon = "http://labs.google.com/ridefinder/images/mm_20_orange.png";
        }

        const sellerMarker = new google.maps.Marker({
            position: { lat: sellers[i].lat, lng: sellers[i].lon },
            map,
            animation: google.maps.Animation.DROP,
            icon: { url: icon, scaledSize: new google.maps.Size(20,30) },
            pixelOffset: new google.maps.Size(0,-100)
        })
        
        let sellerInfo = 
        `<body\>
        <h3 class="mapInfo"><u>${sellers[i].first_name} ${sellers[i].last_name}</u></h3\><br>
        <h3 class="mapInfo">Rating: ${sellers[i].rating}</h3\>
        <p class="mapInfo">Sales: ${sellers[i].transactions}</p\>
        <p class="mapInfo">Address: ${sellers[i].address}</p\>
        </body>`
        
        let sellerInfoWindow = new google.maps.InfoWindow({
            content: sellerInfo
        });

        sellerMarker.addListener("click", () => {
            if (lastOpenedMarker) 
            {
                lastOpenedMarker.window.close();
                lastOpenedMarker.marker.setAnimation(null);
            }
            
            sellerInfoWindow.open({
                anchor: sellerMarker,
                map,
                shouldFocus: true
            });

            lastOpenedMarker = { window: sellerInfoWindow, marker: sellerMarker };
            
            if (sellerMarker.getAnimation() !== null) 
            {
            sellerMarker.setAnimation(null);
            } else 
            {
            sellerMarker.setAnimation(google.maps.Animation.BOUNCE);
            }

            updateSelectedPrinter(sellers[i]);
        });

        activeMarkers.push(sellerMarker);
    }

    map.setCenter(userPosition); 
    map.setZoom(11);
}