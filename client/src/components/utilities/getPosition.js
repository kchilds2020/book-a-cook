navigator.geolocation.getCurrentPosition((position) => {
    console.log('Latitude',position.coords.latitude,'Longitude',position.coords.longitude)
});

