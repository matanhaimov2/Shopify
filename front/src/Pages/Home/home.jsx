import React, {useState} from 'react';

// CSS
import './home.css';


// Sub Components
import Categories from './SubComponents/Categories/categories';
import Products from './SubComponents/Products/products';


function Home() {
    
    const [token, setToken] = useState(localStorage.getItem('accessToken'));

    return (
        <div className='home-wrapper'>
            <section className='home-main-section'>
                <Categories token={token} />
                <Products token={token} />
            </section>

        </div>
    );
}

export default Home;