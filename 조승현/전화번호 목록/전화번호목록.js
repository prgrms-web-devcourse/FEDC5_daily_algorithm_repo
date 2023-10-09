function solution(phone_book) {
    let map = new Map();
    phone_book.forEach(phone => map.set(phone, 1));
    
    for(const phone of phone_book) {
        let phoneNumber = "";
        for(let i=0;i<phone.length - 1;i++) {
            phoneNumber += phone[i];
            if(map.has(phoneNumber)) return false;
        }
    }
    
    return true;
}