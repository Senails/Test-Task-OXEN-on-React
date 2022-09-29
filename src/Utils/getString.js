export function getString(string) {
    let str = string;
    let arr = [];

    while (true) {
        if (str.length > 3) {
            let sub = str.substr((str.length - 3), 3);
            arr = [sub, ...arr];
            str = str.substr(0, (str.length - 3));
        } else {
            arr = [str, ...arr];
            break;
        }
    }

    let res = arr.join(' ');

    return res;
}