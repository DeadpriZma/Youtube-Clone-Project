export const API_KEY = "AIzaSyDiUp2hM7RGWX8whWhL7QSAQtuIeDtu5fU";

export const value_converter = (value) =>{
  if(value >= 1000000){
    return Math.floor(value/1000000)+"M"
  }
  else if(value >= 1000){
    return Math.floor(value/1000)+"k"
  }
  else{
    return value;
  }
}