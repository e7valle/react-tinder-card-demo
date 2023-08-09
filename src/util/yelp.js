const apiKey = process.env.REACT_APP_API_KEY;

const Yelp = {
    search(term, location, sortBy, radius, price) {
        return fetch(
            `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&radius=${radius}&price=${price}&location=${location}&sort_by=${sortBy}&limit=5`,
            {
            headers: {
                Authorization: `Bearer ${apiKey}`,
        
            },
            }
        )
            .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            if (jsonResponse.businesses) {
            return jsonResponse.businesses.map((business) => ({
                id: business.id,
                imageSrc: business.image_url,
                name: business.name,
                address: business.location.address1,
                city: business.location.city,
                state: business.location.state,
                zipCode: business.location.zip_code,
                category: business.categories[0].title,
                rating: business.rating,
                reviewCount: business.review_count,
                url: business.url,
            }));
            }
        });
    },
};

export default Yelp;