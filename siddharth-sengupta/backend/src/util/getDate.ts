function getCurrentDate(): string {
    const today = new Date();
  
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString();
  
    return `${day}-${month}-${year}`;
}

export default getCurrentDate;