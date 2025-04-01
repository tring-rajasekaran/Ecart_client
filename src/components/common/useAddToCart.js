import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { ADD_TO_CART } from '../../graphql/mutation/customerMutation';
import { CustomerContext } from '../../App';
const useAddToCart = () => {
    const [addToCart] = useMutation(ADD_TO_CART, { fetchPolicy: "no-cache" });
    const {quantity,setQuantity} = useContext(CustomerContext);
    const addToCartHandler = async (id) => {
        try {
            console.log(id, "particular id");

            const { data } = await addToCart({ variables: { product_id: id } });

            if (data?.addToCart) {
                const message = data.addToCart;

                if (message === "product is already in the cart") {
                    toast.error("This product is already in your cart!");
                } else if (message === "product added successfully") {
                    setQuantity(quantity + 1);
                    toast.success("Product Added to cart Successfully");
                } else if (message === "Failed to add product to cart") {
                    toast.error("Something went wrong! Failed to add product.");
                } else {
                    toast.error(message);
                }
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Something went wrong! Please try again");
        }
    };

    return {addToCartHandler};
};

export default useAddToCart;
