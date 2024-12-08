const PreviewOrderContent = () => {
    const TAX_RATE = 0.0825;
    const [orderItems, setOrderItems] = React.useState([]);
    const [menuItems, setMenuItems] = React.useState([]);
    const [salesTax, setSalesTax] = React.useState(0);
    const [total, setTotal] = React.useState(0);

    const formatPrice = (price) => {
        return `$${price.toFixed(2)}`;
    };

    const calculateTotals = React.useCallback((items, menu) => {
        let subtotal = 0;
        items.forEach(item => {
            const menuItem = menu.find(m => m.id === item.menuId);
            if (menuItem) {
                subtotal += menuItem.price * item.quantity;
            }
        });

        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;

        setSalesTax(tax);
        setTotal(total);
    }, []);

    const removeFromCart = (menuId) => {
        fetch(`http://localhost:80/api/cart/items/${menuId}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error removing item from cart');
            }
            return response.json();
        })
        .then(() => {
            loadCart();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const loadCart = React.useCallback(() => {
        fetch('http://localhost:80/api/cart', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(cart => {
                const items = cart.items || [];
                setOrderItems(items);
                if (menuItems.length > 0) {
                    calculateTotals(items, menuItems);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [menuItems, calculateTotals]);

    React.useEffect(() => {
        fetch('http://localhost:80/api/menu', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(items => {
                setMenuItems(items);
                // After getting menu items, load cart
                loadCart();
            })
            .catch(error => {
                console.error('Error loading menu items:', error);
            });
    }, [loadCart]);

    React.useEffect(() => {
        if (menuItems.length > 0 && orderItems.length > 0) {
            calculateTotals(orderItems, menuItems);
        }
    }, [orderItems, menuItems, calculateTotals]);

    const OrderItem = ({ item }) => {
        const menuItem = menuItems.find(m => m.id === item.menuId);
        if (!menuItem) return null;

        return (
            <div className="order-item">
                <img src={menuItem.image} alt={menuItem.name} className="food-image" />
                <div className="item-details">
                    <h2>{menuItem.name}</h2>
                    <span className="quantity">Quantity: {item.quantity}</span>
                </div>
                <span className="price">{formatPrice(menuItem.price * item.quantity)}</span>
                <button 
                    className="remove-btn" 
                    onClick={() => removeFromCart(menuItem.id)}
                >
                    -
                </button>
            </div>
        );
    };

    return (
        <main>
            <h1>Preview Order</h1>
            <div className="order-items" id="order-items">
                {orderItems.length === 0 ? (
                    <p className="empty-cart">Your cart is empty</p>
                ) : (
                    orderItems.map((item, index) => (
                        <OrderItem key={index} item={item} />
                    ))
                )}
            </div>

            <div className="order-summary">
                <div className="sales-tax">
                    <span>Sales Tax</span>
                    <span id="sales-tax">{formatPrice(salesTax)}</span>
                </div>
                <div className="total">
                    <span>Total</span>
                    <span id="total">{formatPrice(total)}</span>
                </div>
            </div>

            <div className="place-order">
                <a 
                    href={orderItems.length > 0 ? "./order-placed" : "#"} 
                    className="place-order-btn" 
                    id="place-order-btn"
                >
                    Place Order
                </a>
            </div>
        </main>
    );
};

// mount to preview-order-root
const root = ReactDOM.createRoot(document.getElementById('preview-order-root'));
root.render(<PreviewOrderContent />);
