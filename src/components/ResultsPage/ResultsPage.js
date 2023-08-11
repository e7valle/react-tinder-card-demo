import React from 'react';
import { useParams } from 'react-router-dom';

// function ResultsPage({likedRestaurants}) {
//     return (
//         <div>
//             <h2>Liked Restaurants</h2>
//             <ul>
//                 {Object.entries(likedRestaurants).map(([restaurant, count])=> (
//                     <li key={restaurant}>
//                         {restaurant}: {count} times
//                     </li>

//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default ResultsPage;

function ResultsPage() {
    const { swipedRestaurants } = useParams();

    const parsedSwipeRestaurants = JSON.parse(swipedRestaurants);

    return(
        <div>
            <h1>Results</h1>
            <div className='swiped-restaurants'>
                <h2>Swiped Restaurants</h2>
                <ul>
                    {Object.entries(parsedSwipeRestaurants).map(([restaurant, count]) => (
                        <li key={restaurant}>
                            {restaurant}: {count} times
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default ResultsPage;