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

  if (loading) return <div className="shop" data-testid="shop-loading"><p>Loading products...</p></div>;
  if (error) return <div className="shop" data-testid="shop-error"><p>Error: {error}</p></div>;

  return (
    <div className="shop" data-testid="shop-page">
      <div className="search-sidebar" data-testid="search-sidebar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          data-testid="search-input"
        />
      </div>

      <div className="products-grid" data-testid="products-grid">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product)}
            data-testid="product-card"
          >
            <img src={product.image} alt={product.name} className="product-image" data-testid="product-image" />
            <h3 data-testid="product-name">{product.name}</h3>
            <p data-testid="product-description">{product.description}</p>
            <p className="price" data-testid="product-price">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</p>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div className="modal-overlay" onClick={handleCancelEdit} data-testid="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()} data-testid="modal-content">
            <h2>Edit Product</h2>
            <div className="edit-form" data-testid="edit-form">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  placeholder="Enter product name"
                  data-testid="edit-input-name"
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
                  data-testid="edit-input-description"
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
                  data-testid="edit-input-price"
                />
              </div>
              <div className="modal-buttons" data-testid="modal-buttons">
                <button onClick={handleSaveEdit} className="save-btn" data-testid="save-btn">Save</button>
                <button onClick={handleDelete} className="delete-btn" data-testid="delete-btn">Delete</button>
                <button onClick={handleCancelEdit} className="cancel-btn" data-testid="cancel-btn">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;