// GLOBAL VARIABLES 
let activeMarkers = [];
let lastOpenedMarker = null;


// FUNCTION

function initMap() {
    const def = { lat: 43.6532, lng: -79.3832 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: def,
    });
    // if user is logged in, don't display discover button
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

    if (!sellers)
    {
        locationButton.addEventListener("click", () => {
            // ask user for location, true if they accept  
            navigator.geolocation.getCurrentPosition((position) => {
                user = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                console.log(user);
                fetch(action='/findSellers',{
                    method:"POST",
                    body: JSON.stringify({lat: user.latitude, lon: user.longitude}),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
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
    const userPosition = { lat: position.latitude, lng: position.longitude };
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
        
        if (sellers[i].ratings > 4)
        {
            icon = "http://labs.google.com/ridefinder/images/mm_20_green.png";
        }
        else if (sellers[i].ratings > 3)
        {
            icon = "http://labs.google.com/ridefinder/images/mm_20_yellow.png";
        }
        else if (sellers[i].ratings > 2)
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
        `<body style='text-align:center'\>
        <h3><u>${sellers[i].first_name} ${sellers[i].last_name}</u></h3\>
        <h4>Rating: ${sellers[i].ratings}</h4\>
        <p>Sales: ${sellers[i].sales}</p\>
        <p>Address: ${sellers[i].address}</p\>
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
        });

        activeMarkers.push(sellerMarker);
    }

    map.setCenter(userPosition); 
    map.setZoom(11);
}