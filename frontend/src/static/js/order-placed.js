const OrderPlacedContent = () => {
    const [orderItems, setOrderItems] = React.useState([]);
    const [pickupTime, setPickupTime] = React.useState('');

    const calculatePickupTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 30);
        return now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
        });
    };

    React.useEffect(() => {
        setPickupTime(calculatePickupTime());

        // Fetch menu items first
        fetch('http://localhost:80/api/menu', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(menuItems => {
                const menuMap = menuItems.reduce((acc, item) => {
                    acc[item.id] = item;
                    return acc;
                }, {});

                // Then fetch cart
                return fetch('http://localhost:80/api/cart', {
                    credentials: 'include'
                })
                    .then(response => response.json())
                    .then(cart => {
                        const items = cart.items.map(cartItem => ({
                            ...cartItem,
                            menuItem: menuMap[cartItem.menuId]
                        }));
                        setOrderItems(items);

                        // Create the order
                        return fetch('http://localhost:80/api/orders', {
                            method: 'POST',
                            credentials: 'include'
                        });
                    });
            })
            .catch(error => {
                console.error('Error:', error);
                window.location.href = '/menu';
            });
    }, []);

    return (
        <main>
            <div className="order-header">
                <div className="order-confirmation">
                    <h1>Order Placed</h1>
                    <p className="pickup-info">
                        Ready to be picked up at <b><span id="pickup-time">{pickupTime}</span></b> at 411 N Steven St #1, Richmond, VA 23220.
                    </p>
                </div>
                <div className="confirmation-logo">
                    <img src="static/images/logo.jpg" alt="Confirmation Logo" className="logo-image" />
                </div>
            </div>

            <div className="order-items">
                <h2>Your Order</h2>
                <div id="items-container">
                    {orderItems.map((item, index) => (
                        <div key={index} className="item">
                            <img 
                                src={item.menuItem.image} 
                                alt={item.menuItem.name} 
                                className="food-image" 
                            />
                            <div className="item-details">
                                <h3>{item.menuItem.name}</h3>
                                <span className="quantity">Quantity: {item.quantity}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

// mount to order-placed-root
const root = ReactDOM.createRoot(document.getElementById('order-placed-root'));
root.render(<OrderPlacedContent />);
