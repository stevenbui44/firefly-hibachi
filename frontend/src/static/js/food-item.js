const FoodItemContent = () => {
    const [foodItem, setFoodItem] = React.useState(null);
    const [quantity, setQuantity] = React.useState(1);

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const itemId = urlParams.get('id');
        
        if (!itemId) {
            window.location.href = '/menu';
            return;
        }

        fetch(`http://localhost:80/api/menu/${itemId}`, {
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Item not found');
                }
                return response.json();
            })
            .then(item => {
                setFoodItem(item);
                document.title = item.name;
            })
            .catch(error => {
                console.error('Error:', error);
                window.location.href = '/menu';
            });
    }, []);

    const handleQuantityChange = (e) => {
        let value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) {
            value = 1;
        } else if (value > 10) {
            value = 10;
        }
        setQuantity(value);
    };

    const handleDecrease = () => {
        setQuantity(prev => prev > 1 ? prev - 1 : 1);
    };

    const handleIncrease = () => {
        setQuantity(prev => prev < 10 ? prev + 1 : 10);
    };

    const handleAddToOrder = () => {
        fetch('http://localhost:80/api/cart/items', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                menuId: foodItem.id,
                quantity: quantity
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error adding to cart');
            }
            return response.json();
        })
        .then(() => {
            window.location.href = '/menu';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    if (!foodItem) return null;

    return (
        <main>
            <div className="food-item-details">
                <img 
                    id="food-image" 
                    src={foodItem.image} 
                    alt={foodItem.name} 
                    className="food-image" 
                />
                <div className="item-info">
                    <div className="item-header">
                        <div className="item-title">
                            <h1 id="food-name">{foodItem.name}</h1>
                            <p className="calories">
                                <span id="food-calories">{foodItem.calories}</span> calories
                            </p>
                        </div>
                        <p className="price">$<span id="food-price">{foodItem.price.toFixed(2)}</span></p>
                    </div>
                    <p id="food-description" className="description">{foodItem.description}</p>
                </div>
            </div>

            <div className="quantity-section">
                <label htmlFor="quantity">Quantity</label>
                <div className="quantity-selector">
                    <input 
                        type="number" 
                        id="quantity" 
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1" 
                        max="10" 
                    />
                    <div className="quantity-controls">
                        <button className="quantity-btn minus" onClick={handleDecrease}>-</button>
                        <button className="quantity-btn plus" onClick={handleIncrease}>+</button>
                    </div>
                </div>
            </div>

            <div className="add-to-order">
                <button className="add-to-order-btn" onClick={handleAddToOrder}>
                    Add to Order
                </button>
            </div>
        </main>
    );
};

// mount at food-item-root
const root = ReactDOM.createRoot(document.getElementById('food-item-root'));
root.render(<FoodItemContent />);