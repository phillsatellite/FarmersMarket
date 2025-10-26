import { useState } from 'react';
import useProducts from '../hooks/useProducts';
import '../styles/AdminPortal.css';

function AdminPortal() {
  const { createProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    price: ''
  });
  const [message, setMessage] = useState('');

  //Updates form state when user types in any input field
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  //Handles form submission to create a new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       //Send new product data to the backend
      await createProduct({
        name: formData.name,
        description: formData.description,
        image: formData.image,
        price: parseFloat(formData.price)
      });
      setMessage('Product added successfully!');
      setFormData({ name: '', description: '', image: '', price: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to add product');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="admin-portal">
      <div className="form-container">
        <h2>Add New Product</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AdminPortal;