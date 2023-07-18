const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6cbec1314317b40a46ce6213018aa40b&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const humidity = body.current.humidity
            const weather_description = body.current.weather_descriptions[0]
            callback(undefined,
                    weather_description + '. It is currently ' + temperature + ' degrees out. It feels like ' +
                    feelslike + ' degrees out. The humidity is ' + humidity + '%.')
        }
    })
}

module.exports = forecast
