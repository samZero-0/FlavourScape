import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Purchase = () => {
  const { user } = useContext(AuthContext);
  const food = useLoaderData();
  const [currentDate, setCurrentDate] = useState('');
  const [notavailstatus,setNotAvailStatus] = useState(false);

    useEffect(()=>{
        if(food.Quantity === 0){
            setNotAvailStatus(true);
        }
    },[food.Quantity])


  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toISOString().split('T')[0]); 
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const BuyerName =user.displayName;
    const BuyerEmail =user.email;
    const foodname = food.FoodName;
    const foodID = food._id;
    const foodPrice = food.Price;
    const date = currentDate;
    const image = food.Image;

    const quantityForm = parseInt(e.target.quantity.value);
    const soldCount = parseInt(food.SoldCount);
    const quantits = parseInt(food.Quantity);
    const order = {quantityForm, BuyerName,BuyerEmail,foodname,foodID,date,foodPrice,image};
    const newSoldCount = parseInt( soldCount + quantityForm);
    const quan = parseInt(quantits - quantityForm);
    const updatedInfo = {quan,newSoldCount}

    

     if(quantityForm <= food.Quantity){
        axios.post('https://assignment-11-flame.vercel.app/orders',order)
        .then(res=>{
            console.log(res.data);
            toast.success("Order Successful")
        })

        axios.patch(`https://assignment-11-flame.vercel.app/allFoods/${foodID}`, updatedInfo)
        .then(res=>console.log(res.data))
    }
    else{
        toast.error("You can not select more than availability")
    }
    
  };

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 w-full">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 w-full">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-orange-500">Food Purchase</h1>
            </div>
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <label htmlFor="foodName">Food Name: {food.FoodName}</label>
                </div>
                <div className="relative">
                  <label htmlFor="price">Price: {food.Price}</label>
                </div>

                <div className="flex flex-col gap-4">
                    <label htmlFor="">Available: {notavailstatus? <span className="text-red-600 font-bold text-lg">Item is Not available</span>:food.Quantity}</label>
                    <input type="text" placeholder="Quantity" name="quantity" className="p-3 border rounded-xl" />
                </div>

                <div className="py-5">
                  <label htmlFor="buyerName">Buyer Name: {user.displayName}</label>
                </div>

                <div className="py-5">
                  <label htmlFor="buyerEmail">Buyer Email: {user.email}</label>
                </div>

                <div className="py-5">
                  <label htmlFor="purchaseDate">Purchase Date: {currentDate}</label>
                </div>
              </div>
              <div className="pt-4">
              <button
      type="submit"
      className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${
        notavailstatus
          ? 'bg-gray-400 cursor-not-allowed'  
          : 'bg-orange-500 text-white hover:bg-orange-600'
      }`}
      disabled={notavailstatus}
    >
      Purchase
    </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;

