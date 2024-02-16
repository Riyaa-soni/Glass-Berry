import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import ProductDetails from './components/ProductDetails';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<div className="flex">
          <ProductForm />
          <ProductTable />
        </div>
      } />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
