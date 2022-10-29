
export const isExpired = (date) => {
  const expireDate = new  Date(date);

  if( expireDate.getTime() <= Date.now()){
    return true;
 }
 return false;
}