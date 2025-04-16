export const  generateAuthToken= (type) => {
    let res = ""

    if(type == "hardcode"){
        // username : flazefy
        // password : nopass123
        // Signed in at 13/3/25 14:48 WIB
        res = "426|JYoHYrzEL6ywvSDrl0bRKMp79N3GaL4qhBSbKQeE16c6f97b"
    } else if(type == "hardcode_admin"){
        res = "301|GjU9FHN9TGSz3L1wAtL7X38Y29kuAN8jT415SXpQe5e7fd02"
    }

    return res
}

export const generateDatetimeStr = (min) => {
    let inputTs

    if (min && min.trim() !== "") {
        const inputDate = new Date(min)
    
        inputTs = inputDate.getTime()
    } else {
        inputTs = Date.now();
    }
  
    const currentTimestamp = Date.now()
    const randomTimestamp = Math.floor(Math.random() * (currentTimestamp - inputTs)) + inputTs
    const rand = new Date(randomTimestamp)

    const yr = rand.getFullYear()
    const mon = String(rand.getMonth() + 1).padStart(2, '0')
    const dy = String(rand.getDate()).padStart(2, '0')
    const hr = String(rand.getHours()).padStart(2, '0')
    const mi = String(rand.getMinutes()).padStart(2, '0')
  
    const res = `${yr}-${mon}-${dy} ${hr}:${mi}`;

    return res
}

export const generateRandDate = () => {
    const start = new Date('2020-01-01T00:00:00').getTime()
    const end = new Date().getTime()
    let res = Math.floor(Math.random() * (end - start + 1)) + start
    res = new Date(res)
    console.log(res)

    return res
}

export const generateDayName = (date) => {
    const daysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    if(date != null){
        const dayIdx = date.getDay()
        const res = daysName[dayIdx]

        return res
    } else {
        return daysName
    }
}

export const generateMonthName = (idx, type) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];    
    let res = null 
    if(idx != 'all'){
        if(type == 'full'){
            res = monthNames[idx]
        } else if(type == 'short'){
            res = monthNames[idx].substring(0,3)
        }
    } else {
        if(type == 'full'){
            res = monthNames
        } else {
            res = monthNames.map(name => name.substring(0, 3));
        }
    }
    return res
}

export const generateRules = (type) => {
    if(type == 'used_context'){
        return ['Worship','Shopping','Work','School','Campus','Sport','Party']
    } else if(type == 'wash_type'){
        return ['Laundry','Self-Wash']
    } else if(type == 'clothes_type'){
        return ['hat', 'pants', 'shirt', 'jacket', 'shoes', 'socks', 'scarf', 'gloves', 'shorts', 'skirt', 'dress', 'blouse', 'sweater', 'hoodie', 'tie', 'belt', 
        'coat', 'underwear', 'swimsuit', 'vest', 't-shirt', 'jeans', 'leggings', 'boots', 'sandals', 'sneakers', 'raincoat', 'poncho', 'cardigan']
    } else if(type == 'clothes_size'){
        return ['S','M','L','XL','XXL','XXL']
    } else if(type == 'clothes_made_from'){
        return ['cotton','wool','silk','linen','polyester','denim','leather','nylon','rayon','synthetic','cloth']
    } else if(type == 'clothes_gender'){
        return ['male','female','unisex']
    } else if(type == 'clothes_category'){
        return ['upper_body','bottom_body','head','foot','hand']
    }
}

export const  generateRandNumber= (max, min) => {
    const res = Math.floor(Math.random() * max) + min

    return res
}