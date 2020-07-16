import tokenService from './tokenService';

const BASE_URL = '/api/packages';

// index
export function getAllPackagesAPI() {
  return fetch(BASE_URL, {
      headers: {
        'Authorization': `Bearer ${tokenService.getTokenFromLocalStorage()}`
      }
  })
  .then(allPackages => allPackages.json());
}

// create
export function createPackageAPI(packageToCreate) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${tokenService.getTokenFromLocalStorage()}`
        },
        body: JSON.stringify(packageToCreate)
    }).then(newPackage => newPackage.json());
}


// delete
export function deletePackageAPI(packageIdToDelete) {
    return fetch(`${BASE_URL}/${packageIdToDelete}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${tokenService.getTokenFromLocalStorage()}`
        }
    }).then(deletedPackage => deletedPackage.json());
}

//
export function updatePackageAPI(packageToUpdate) {
    return fetch(`${BASE_URL}/${packageToUpdate._id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getTokenFromLocalStorage()}`
        },
        body: JSON.stringify(packageToUpdate)
    }).then(updatedPackage => updatedPackage.json());
}