import moment from "moment";

export const getFormattedName = (name: string): string => {
    name = name.slice(3, 9).toUpperCase()
    return getBankNameMappings(name);
}

export const getBankNameMappings = (name: string): string => {
    switch(name)
    {
        case 'ICICIB': return "ICICI Bank";
        case 'HDFCBK': return "HDFC Bank";
        case 'HDFCLD': return "HDFC Bank";
        case 'SODEXO': return "Sodexo";
        case 'AXISBK': return "Axis Bank";
        case 'IPAYTM': return "Paytm";
        default : return name
    }
}

export const getFormattedTime = (time: string): string => {
    var now = moment().startOf('day').valueOf()
    if(parseInt(time) > now){
        return "current time";
    }
    var date = new Date(time).toDateString();

    return date;
}