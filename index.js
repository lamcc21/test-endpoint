const axios = require('axios');

const endpoint = 'https://api.subquery.network/sq/subquery/kepler-testnet';
const query = `
  query {
    acceptedOffers (first: 5) {
      nodes {
        id
        indexerId
        offerId
        serviceAgreementId
      }
    }
    indexers (first: 5) {
      nodes {
        id
        controller
        metadataId
        commission
      }
    }
  }
`;

let numSuccess = 0;
let numFail = 0;

const promises = Array(10).fill().map(() =>
  axios.post(endpoint, { query })
    .then((response) => {
      console.log(response.data);
      numSuccess++;
    })
    .catch((error) => {
      console.error(error);
      numFail++;
    })
);

Promise.all(promises)
  .then(() => console.log(`All requests completed. ${numSuccess} succeeded, ${numFail} failed.`))
  .catch((error) => console.error(`Error sending requests: ${error}`));
