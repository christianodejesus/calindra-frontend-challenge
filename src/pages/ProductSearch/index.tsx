import { AxiosResponse } from 'axios';
import httpStatus from 'http-status';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import ProductsGrid from '../../components/ProductsGrid';
import { IProductResult } from '../../interfaces/IProductResult';
import api from '../../services/api';
import './styles.css';

const ProductSearch = () => {
  const [formData, setFormData] = useState({
    inputPhrase: ''
  });
  const [resultItems, setResultItems] = useState<IProductResult[]>([]);
  const [noResultsMessageDisplay, setNoResultsMessageDisplay] = useState(false);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const resultHandler = {
      [httpStatus.OK]: (result: AxiosResponse) => {
        setResultItems(result.data.items);
        if (result.data.items.length === 0) {
          setNoResultsMessageDisplay(true);
        }
      },

      [httpStatus.INTERNAL_SERVER_ERROR]: (result: AxiosResponse) => {
        alert(`${result.statusText} <br> ${JSON.stringify(result.data)}`);
      }
    };

    try {
      setResultItems([]);
      setNoResultsMessageDisplay(false);
      
      if (formData.inputPhrase === '') {
        alert('Enter a product name to search');
        document.getElementById('inputPhrase')?.focus();
        
        return false;
      }

      const result = await api.get(`/${formData.inputPhrase}`);
      resultHandler[result.status](result);
    } catch (err) {
      resultHandler[err.request.status](err.request);
    }
  }
  
  return (
    <div id="page-product-search">
      <form onSubmit={handleFormSubmit}>
        <fieldset>
          <p>Products search</p>
          <div className="field-group">
            <div className="field">
              <input
                type="text"
                placeholder="Enter product name and click Search button"
                name="inputPhrase"
                id="inputPhrase"
                size={55}
                onChange={handleInputChange} />
            </div>
            <div className="field">
              <button type="submit">Search</button>
            </div>
          </div>
        </fieldset>
      </form>
      <div id="result-box">
        { noResultsMessageDisplay && <span>No result for your search</span> }
        { resultItems.length > 0 && <ProductsGrid items={resultItems} /> }
      </div>
    </div>
  );
}

export default ProductSearch;
