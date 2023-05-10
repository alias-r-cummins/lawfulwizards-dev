import { Dimensions } from "react-native"



const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const wp = float => WIDTH * float / 100
const hp = float => HEIGHT * float / 100




export {
    wp,
    hp, 
    
}