export async function sendRequest(price, initial, months) {
    let data = {
        price,
        initial,
        months,
    }

    console.log(JSON.stringify(data))

    try {
        let res = await fetch('https://eoj3r7f3r4ef6v4.m.pipedream.net', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;'
            },
            body: JSON.stringify(data)
        })
        let data1 = await res.json();
        console.log(data1);
    } catch (error) {
        console.log(error);
    }

}