const MenuContent = () => {
    const [menuItems, setMenuItems] = React.useState([]);
    const [isCheckoutDisabled, setIsCheckoutDisabled] = React.useState(true);

    const getId = (str) => {
        return str
            .toLowerCase()
            .replace(/\s+/g, '-');
    };

    const updateCheckoutButton = () => {
        fetch('http://localhost:80/api/cart', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(cart => {
                setIsCheckoutDisabled(!(cart.items && cart.items.length > 0));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    React.useEffect(() => {
        // Fetch menu items
        fetch('http://localhost:80/api/menu', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(items => {
                setMenuItems(items);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // Update checkout button state
        updateCheckoutButton();
    }, []);

    return (
        <main>
            <h1>Hibachi</h1>
            <div className="menu-items">
                {menuItems.map(item => (
                    <a 
                        key={item.id}
                        href={`./food-item?id=${item.id}`}
                        className="menu-item"
                        id={getId(item.name)}
                    >
                        <img src={item.image} alt={item.name} className="food-image" />
                        <div className="item-details">
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                        </div>
                        <span className="price">${item.price.toFixed(2)}</span>
                    </a>
                ))}
            </div>
            <a 
                href="./preview-order" 
                className={`checkout-button ${isCheckoutDisabled ? 'disabled' : ''}`}
                id="checkout-button"
            >
                Check Out
            </a>
        </main>
    );
};

// mount at menu-root
const root = ReactDOM.createRoot(document.getElementById('menu-root'));
root.render(<MenuContent />);