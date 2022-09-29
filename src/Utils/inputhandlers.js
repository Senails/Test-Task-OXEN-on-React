export function inputValidator1(value) {
    let nums = value.match(/[0-9]/g);
    let str;

    if (nums != null) {
        str = +nums.join('');
    } else { str = '1000000' }
    let price = +str;

    if (price < 1000000) {
        price = 1000000;
    } else if ((price > 6000000)) {
        price = 6000000;
    }
    return price;
}

export function inputValidator2(value, price) {
    let nums = value.match(/[0-9]/g);
    let str;
    if (nums === null) {
        str = price * (0.1);
    } else {
        str = +nums.join('');
    }
    let res;
    if (str < price * (0.1)) {
        res = 10;
    } else if (str > price * (0.6)) {
        res = 60;
    } else {
        res = Math.ceil((str / price) * 100)
    }
    return res;
}

export function inputValidator3(value) {
    let nums = value.match(/[0-9]/g);
    let str;
    if (nums === null) {
        str = 1;
    } else {
        str = +nums.join('');
    }

    let res;
    if (str <= 0) {
        res = 1;
    } else if (str > 60) {
        res = 60;
    } else {
        res = str;
    }

    return res;
}