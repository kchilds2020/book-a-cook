
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

function distanceBetween(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;
      
        var dLat = degreesToRadians(lat2-lat1);
        var dLon = degreesToRadians(lon2-lon1);
      
        lat1 = degreesToRadians(lat1);
        lat2 = degreesToRadians(lat2);
      
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 

        var miles = (earthRadiusKm * c) / 1.6;
        return miles;
}

export default distanceBetween
