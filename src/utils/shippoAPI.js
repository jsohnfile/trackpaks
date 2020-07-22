import tokenService from './tokenService';

const BASE_URL = '/api/shippoAPI';

export function getPackageDetails(carrier, trackingNumber) {
    return fetch(`${BASE_URL}/${carrier}/${trackingNumber}`, {
        headers: {
            'Authorization': `Bearer ${tokenService.getTokenFromLocalStorage()}`
        }
    })
    .then(allPackages => allPackages.json());
}