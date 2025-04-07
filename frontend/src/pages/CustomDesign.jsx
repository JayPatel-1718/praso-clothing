import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';
import './CustomDesign.css';

function CustomDesign() {

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [clothingType, setClothingType] = useState('');
  const [designOption, setDesignOption] = useState('');
  const [customDesign, setCustomDesign] = useState(null);
  const [color, setColor] = useState('#ffffff');
  const [price, setPrice] = useState(0);
  const [designPosition, setDesignPosition] = useState({ x: 150, y: 150 });
  const [designScale, setDesignScale] = useState(1);
  const [designRotation, setDesignRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Boundary definitions for design placement (in canvas coordinates)
  const boundaries = {
    tshirt: { xMin: 100, xMax: 300, yMin: 100, yMax: 300 }, // Example boundaries
    hoodie: { xMin: 120, xMax: 280, yMin: 120, yMax: 280 },  // Example boundaries
  };

  const basePrices = {
    tshirt: 299,
    hoodie: 699,
  };

  const clothingImages = {
    tshirt: '/images/back_1.png',
    hoodie: '/images/hoodie-base.png',
  };

  // Simulate clothing type detection (replace with AI in production)
  const detectClothingType = (imageData) => {
    // Simple heuristic: assume based on aspect ratio or user confirmation
    // For now, rely on user selection; in production, use a model
    return clothingType || 'tshirt'; // Default to tshirt if not set
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (clothingType && (customDesign || designOption === 'website')) {
      const baseImage = new Image();
      baseImage.src = clothingImages[clothingType] || '/images/tshirt-base.png';
      const designImage = new Image();
      designImage.src = customDesign || '/images/default-design.png';

      baseImage.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

        designImage.onload = () => {
          ctx.save();
          ctx.translate(designPosition.x, designPosition.y);
          ctx.scale(designScale, designScale);
          ctx.rotate((designRotation * Math.PI) / 180);
          ctx.drawImage(designImage, -designImage.width / 2, -designImage.height / 2);
          ctx.restore();
        };
        designImage.src = customDesign || '/images/default-design.png';
      };
    }
  }, [clothingType, customDesign, color, designPosition, designScale, designRotation]);

  const handleClothingTypeChange = (e) => {
    const type = e.target.value;
    setClothingType(type);
    setPrice(basePrices[type] || 0);
  };

  const handleDesignOptionChange = (e) => {
    setDesignOption(e.target.value);
    if (e.target.value === 'upload' && customDesign) {
      setPrice(basePrices[clothingType] + 50);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomDesign(reader.result);
        // Simulate detection (in production, use AI)
        const suggestedType = detectClothingType(reader.result);
        if (!clothingType) setClothingType(suggestedType);
        if (designOption === 'upload') {
          setPrice(basePrices[clothingType] + 50);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleAddToCart = () => {
    if (!clothingType || (!designOption && !customDesign)) {
      alert('Please select a clothing type and design option.');
      return;
    }
    const item = {
      id: Date.now(),
      name: `${clothingType} (Custom Design)`,
      price,
      color,
      image: customDesign || '/images/default-design.png',
      quantity: 1,
    };
    addToCart(item);
    alert(`Added ${clothingType} to cart for $${price}!`);
    navigate('/cart');
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - designPosition.x, y: e.clientY - designPosition.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      const boundary = boundaries[clothingType] || boundaries.tshirt;
      const constrainedX = Math.max(boundary.xMin, Math.min(newX, boundary.xMax));
      const constrainedY = Math.max(boundary.yMin, Math.min(newY, boundary.yMax));
      setDesignPosition({ x: constrainedX, y: constrainedY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScaleChange = (e) => {
    const scale = parseFloat(e.target.value);
    setDesignScale(scale);
  };

  const handleRotateChange = (e) => {
    setDesignRotation(parseFloat(e.target.value));
  };

  return (
    <div className="custom-design-container">
         <Navbar />
      <h1>Custom Design Your Clothing</h1>
      <div className="design-section">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseUp}
          style={{ border: '1px solid #ccc', cursor: isDragging ? 'grabbing' : 'grab' }}
        />
        <div className="controls">
          <button onClick={() => setDesignPosition({ x: 150, y: 150 })}>Reset Position</button>
          <label>Zoom: <input type="range" min="-0.5" max="2" step="0.1" value={designScale} onChange={handleScaleChange} /></label>
          <label>Rotate: <input type="range" min="0" max="360" value={designRotation} onChange={handleRotateChange} /></label>
        </div>
      </div>
      <div className="form-group">
        <label>Select Clothing Type:</label>
        <select value={clothingType} onChange={handleClothingTypeChange} required>
          <option value="">Auto-Detect or Select</option>
          <option value="tshirt">T-Shirt</option>
          <option value="hoodie">Hoodie</option>
        </select>
      </div>
      {clothingType && (
        <div className="form-group">
          <label>Choose Design Option:</label>
          <div>
            <label>
              <input type="radio" value="website" checked={designOption === 'website'} onChange={handleDesignOptionChange} />
              Select from website designs
            </label>
            <label>
              <input type="radio" value="upload" checked={designOption === 'upload'} onChange={handleDesignOptionChange} />
              Upload your own design
            </label>
          </div>
        </div>
      )}
      {designOption === 'upload' && (
        <div className="form-group">
          <label>Upload Your Design:</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
        </div>
      )}
      {clothingType && (
        <div className="form-group">
          <label>Choose Color:</label>
          <input type="color" value={color} onChange={handleColorChange} />
          <span>Selected Color: {color}</span>
        </div>
      )}
      {clothingType && (
        <div className="form-group">
          <h3>Price: ${price}</h3>
          <button onClick={handleAddToCart} disabled={!clothingType || !designOption}>
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomDesign;