function solution(cacheSize, cities) {
    if (cacheSize === 0) {
        return cities.length * 5;
    }
    
    const cache = new Map();
    let time = 0;
    
    cities.forEach((city, index) => {
        city = city.toLowerCase();

        if (cache.has(city)) {
            cache.delete(city);
            cache.set(city, index);
            time += 1;
        } else {
            if (cache.size >= cacheSize) {
                const entries = Array.from(cache.entries());
                entries.sort((a, b) => a[1] - b[1]);
                cache.delete(entries[0][0]);
            }
            
            cache.set(city, index);
            time += 5;
        }
    });
    
    return time;
}