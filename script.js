function getLocation(phoneNumber) {
  return new Promise((resolve, reject) => {
    try {
      const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
      const number = phoneUtil.parseAndKeepRawInput(phoneNumber);

      const region = phoneUtil.getRegionCodeForNumber(number);
      const location = phoneUtil.getGeocoderDescriptionForNumber(number, 'en');

      const countryCode = number.getCountryCode();
      const nationalNumber = number.getNationalNumber();
      const extension = number.getExtension();
      const countryCodeSource = number.getCountryCodeSource();
      const italianLeadingZero = number.getItalianLeadingZero();
      const rawInput = number.getRawInput();
      const isPossibleNumber = phoneUtil.isPossibleNumber(number);
      const isValidNumber = phoneUtil.isValidNumber(number);
      const isValidNumberForRegion = phoneUtil.isValidNumberForRegion(number, region);
      const numberType = phoneUtil.getNumberType(number);
      const e164Format = phoneUtil.format(number, require('google-libphonenumber').PhoneNumberFormat.E164);
      const originalFormat = phoneUtil.formatInOriginalFormat(number, region);
      const nationalFormat = phoneUtil.format(number, require('google-libphonenumber').PhoneNumberFormat.NATIONAL);
      const internationalFormat = phoneUtil.format(number, require('google-libphonenumber').PhoneNumberFormat.INTERNATIONAL);
      const outOfCountryFromUS = phoneUtil.formatOutOfCountryCallingNumber(number, 'US');
      const outOfCountryFromCH = phoneUtil.formatOutOfCountryCallingNumber(number, 'CH');

      resolve({
        location,
        region,
        countryCode,
        nationalNumber,
        extension,
        countryCodeSource,
        italianLeadingZero,
        rawInput,
        isPossibleNumber,
        isValidNumber,
        isValidNumberForRegion,
        numberType,
        e164Format,
        originalFormat,
        nationalFormat,
        internationalFormat,
        outOfCountryFromUS,
        outOfCountryFromCH
      });
    } catch (error) {
      reject(error);
    }
  });
}

function getLocation(phoneNumber) {
  return new Promise((resolve, reject) => {
    try {
      const numberUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
      const offlineGeocoder = require('google-libphonenumber').PhoneNumberOfflineGeocoder.getInstance();

      const number = numberUtil.parse(phoneNumber);
      const region = numberUtil.getRegionCodeForNumber(number);
      const location = offlineGeocoder.getDescriptionForNumber(number, 'en');
      
      resolve({ location, region });
    } catch (error) {
      reject(error);
    }
  });
}

async function displayLocationInfo(phoneNumber, region, location) {
  const phoneLocationsDiv = document.getElementById('phoneLocations');
  const locationText = `<p>${phoneNumber} (${region}): ${location}</p>`;
  phoneLocationsDiv.innerHTML += locationText;
}

async function handleLocationFetchError(phoneNumber, error) {
  console.error(`Error fetching location for ${phoneNumber}:`, error);
  alert(`Error fetching location for ${phoneNumber}`);
}

async function searchLocation() {
  const newPhoneNumberElement = document.getElementById('newPhoneNumber');
  const newPhoneNumber = newPhoneNumberElement.value.trim();

  if (!newPhoneNumber) {
    alert('Please enter a phone number.');
    return;
  }

  try {
    const { location, region } = await getLocation(newPhoneNumber);
    displayLocationInfo(newPhoneNumber, region, location);
  } catch (error) {
    handleLocationFetchError(newPhoneNumber, error);
  }
}

async function displayPhoneLocations() {
  const phoneNumbers = [
    '+917294536271',
    '+918878586271',
    '+12136574429',
    '+201234567898'
  ];

  const phoneLocationsDiv = document.getElementById('phoneLocations');

  for (const phoneNumber of phoneNumbers) {
    try {
      const { location, region } = await getLocation(phoneNumber);
      const locationText = `<p>${phoneNumber} (${region}): ${location}</p>`;
      phoneLocationsDiv.innerHTML += locationText;
    } catch (error) {
      console.error(`Error fetching location for ${phoneNumber}:`, error);
    }
  }
}

displayPhoneLocations();

