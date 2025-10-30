import { useState, useEffect } from 'react';
import api from '../api';
import { toast } from 'react-toastify';

function useCartData() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const tax = 4.0;
  const cart_code = localStorage.getItem("cart_code");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    setLoading(true);
    api.get(`get_cart/?cart_code=${cart_code}`)
      .then(res => {
        setCart(res.data);
        setError('');
      })
      .catch(err => {
        console.log(err);
        setError('Failed to load cart. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  const handleUpdateQuantity = (itemId, newQuantity, setUpdating) => {
    if (setUpdating) setUpdating(true);

    api.patch('update_quantity/', { item_id: itemId, quantity: newQuantity })
      .then(() => {
        toast.success('Quantity updated!');
        setCart(prevCart => {
          const updatedItems = prevCart.items.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          );
          return { ...prevCart, items: updatedItems };
        });
      })
      .catch(() => toast.error('Failed to update quantity'))
      .finally(() => setUpdating(false));
  };

  const handleRemove = (itemId) => {
    api.delete('Delete_item/', { data: { item_id: itemId } })
      .then(() => {
        toast.success('Item removed!');
        setCart(prevCart => ({
          ...prevCart,
          items: prevCart.items.filter(item => item.id !== itemId)
        }));
      })
      .catch(() => toast.error('Failed to remove item'));
  };

  return { cart, loading, error, handleUpdateQuantity, handleRemove, setCart, tax };
}

export default useCartData;
