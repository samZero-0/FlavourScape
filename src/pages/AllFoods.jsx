import { useState, useEffect } from 'react';
import { Search, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    fetch('https://assignment-11-flame.vercel.app/allFoods')
      .then(res => res.json())
      .then(data => {
        setFoods(data);
        setLoading(false);
      });
  }, []);

  const filteredFoods = foods.filter(food => 
    food.FoodName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen ">
      {/* Page Title Section */}
      <div className="relative h-[300px] bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60">
          <div className="h-full flex flex-col items-center justify-center">
            <ChefHat className="w-16 h-16 text-orange-500 mb-4" />
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Our Menu
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-orange-500">Home</span>
              <span className="text-white">/</span>
              <span className="text-white">All Foods</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative max-w-xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search for your favorite food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 pl-14"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Food Cards Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFoods.map((food) => (
              <div key={food._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img
                    src={food.Image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
                    alt={food.FoodName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                    ${food.Price}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {food.FoodName}
                      </h3>
                      <p className="text-gray-500 text-sm mb-2">By {food.Chef}</p>
                    </div>
                    <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                      {food.SoldCount} sold
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {food.Description}
                  </p>

                  <div className="flex items-center justify-between">
                   <div>
                    Quantity: {food.Quantity}
                   </div>

                   
                    <Link to={`/allFoods/${food._id}`}>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm">
                      View Details
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {!loading && filteredFoods.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No foods found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFoods;
