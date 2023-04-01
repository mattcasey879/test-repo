import jwt_decode from 'jwt-decode'





export const isAuthenticated = () => {
const token = localStorage.getItem("AuthenticationToken")

    if(token) {
        const decodedToken = jwt_decode(token)
        if (decodedToken.exp < Date.now()/1000) {
            return false
        }
        return true
    }
    return false 
}

export const formatLabel = (label) => {
    return label.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, label[0].toUpperCase())
}



