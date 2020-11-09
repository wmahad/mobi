const apiURL = 'http://ergast.com/api/f1' // put in an env variable

export async function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export function fetchChampions() {
  // offset = 2005 - 1950
  // limit = 2015 - 2005 + 1
  return client('driverstandings/1.json?limit=11&offset=55')
}

export async function fetchWinners(year = 'latest') {
  const response = await client(`${year}/results/1.json`)
  return response
}
