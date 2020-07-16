const BASE_URL = 'https://api.goshippo.com/tracks/';

export function getAllPackageDetail(carrier, trackingNumber) {
    return fetch(`${BASE_URL}/${carrier}/${trackingNumber}`)
    .then(res => res.json())
}