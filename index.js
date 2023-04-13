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

const promises = Array(10).fill().map(() =>
  axios.post(endpoint, { query })
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error))
);

Promise.all(promises)
  .then(() => console.log('completed'))

