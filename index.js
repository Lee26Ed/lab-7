const ip = document.getElementById("ip")
const location_ = document.getElementById("location")
const weatherLocation = document.getElementById("weatherLocation")
const ISP = document.getElementById("isp")

async function main() {
    const IP = await getIP()
    const locationIP = await getLocation(IP.ip)
    const weather = await getWeather(
        locationIP.location.latitude,
        locationIP.location.longitude
    )
    const isp = await getISP()
    ip.innerHTML = `Your IP is: <br> ${IP.ip}`
    location_.innerHTML = `You are from: <br/>
    ${locationIP.country.name}`
    weatherLocation.innerHTML = `Your current weather is: <br/> ${weather.current.temperature_2m}F`
    ISP.innerHTML = `Your ISP is: <br/> ${isp.isp} - ${isp.org}`
    // console.log(IP, locationIP.country.name)
    // console.log(locationIP)
}

async function getLocation(ip) {
    const locationIP = await fetch(
        `https://api.geoapify.com/v1/ipinfo?&ip=${ip}&apiKey=1b48259b810e48ddb151889f9ea58db0`
    )
    const json = await locationIP.json()
    return json
}

async function getISP() {
    const isp = await fetch(
        "https://pro.ip-api.com/json/?key=KeKC3GywhrUY7wo&fields=isp,org"
    )
    const json = await isp.json()
    return json
}

async function getIP() {
    const IP = await fetch("https://api.ipify.org?format=json")
    const json = IP.json()
    return json
}

async function getWeather(latitude, longitude) {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`
    )
    const json = response.json()
    return json
}

main()
