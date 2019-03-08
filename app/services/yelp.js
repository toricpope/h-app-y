import axios from 'axios';

const YELP_API_KEY = 'be72GR6XGQ5vMG6DT93HE6V5nGIex6DEl52NJdP4oAkDQaj67GqGIvwa3JoG9rGry6LJzeHbAW4asTljoc98Mm2T3aIm8wwUwEC8S0iaa-OLXivGRe7Dh7Nzsl-BXHYx';

const api = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
  },
});

const getPlaces = (userLocation, filter = {}) => {
  return api
    .get('/businesses/search', {
      params: {
        limit: 35,
        sortBy: 'rating',
        categories: 'spas,hotsprings,othersalons,massage,skincare,yoga,pilates, tea, acupuncture,chiropractors,cryotherapy,floatspa,massage_therapy,oxygenbars,healthretreats,bookstores,parks,beaches',
        ...userLocation,
        ...filter
      },
    })
    .then(res =>
      res.data.businesses.map(business => {
        return {
          name: business.name,
          coords: business.coordinates,
          rating: business.rating
        };
      })
    )
    .catch(error => console.error(error));
};

export default {
  getPlaces,
};
