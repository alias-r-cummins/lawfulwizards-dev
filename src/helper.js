import { Dimensions } from "react-native"



const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const wp = float => WIDTH * float / 100
const hp = float => HEIGHT * float / 100

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    //  calculating in KM
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in kilometers

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
};


export {
    wp,
    hp,
    calculateDistance 
    
}