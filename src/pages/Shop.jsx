import { useState } from 'react';
import useProducts from '../hooks/useProducts';
import '../styles/Shop.css';

function Shop() {
  const [searchTerm, setSearchTerm] = useState('');
  const { products, loading, error, updateProduct, deleteProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', description: '' });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product) => {
    console.log('Product clicked:', product);
    setEditingProduct(product);
    const formData = {
      name: product.name || '',
      price: product.price ? product.price.toString() : '',
      description: product.description || ''
    };
    console.log('Setting form data:', formData);
    setEditForm(formData);
  };

  //Updates the edit form state as user types in input fields
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, value);
    setEditForm(prev => {
      const newForm = {
        ...prev,
        [name]: value
      };
      console.log('New form state:', newForm);
      return newForm;
    });
  };

  //Saves the edited product data to the backend
  const handleSaveEdit = async () => {
    try {
      await updateProduct(editingProduct.id, {
        name: editForm.name,
        price: parseFloat(editForm.price),
        description: editForm.description
      });
      setEditingProduct(null);
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  //Deletes the product after user confirmation
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(editingProduct.id);
        setEditingProduct(null);
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  if (loading) return <div className="shop"><p>Loading products...</p></div>;
  if (error) return <div className="shop"><p>Error: {error}</p></div>;

  return (
    <div className="shop">
      <div className="search-sidebar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="product-card"
            onClick={() => handleProductClick(product)}
          >
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</p>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div className="modal-overlay" onClick={handleCancelEdit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Product</h2>
            <div className="edit-form">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  placeholder="Enter product name"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  rows="3"
                  placeholder="Enter description"
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  value={editForm.price}
                  onChange={handleEditChange}
                  placeholder="Enter price"
                />
              </div>
              <div className="modal-buttons">
                <button onClick={handleSaveEdit} className="save-btn">Save</button>
                <button onClick={handleDelete} className="delete-btn">Delete</button>
                <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;