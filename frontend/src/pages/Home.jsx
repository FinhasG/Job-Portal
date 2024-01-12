import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Link to={'/profile'}><button>Profile</button></Link>
  )
}

export default Home