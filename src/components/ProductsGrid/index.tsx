import React from 'react';
import NumberFormat from 'react-number-format';
import { IProductResult } from '../../interfaces/IProductResult';
import './styles.css';

const ProductsGrid = (props: { items: IProductResult[]; }) => {
  return (
    <div id="comp-product-grid">
      <ul className="items-grid">
        {props.items.map((item: IProductResult) => (
          <li key={item.map.id[0]}>
            <a href={item.map.uri === undefined ? '#' : `https://store.omelete.com.br${item.map.uri[0]}`} target='_blank' rel='noopener noreferrer'>
              <img src={`https://static-store.worldticket.com.br/${item.map["images.url"][0]}`} alt={item.map.name[0]} />
              <span>{item.map.name[0]}</span>
              <NumberFormat
                decimalScale={2}
                fixedDecimalScale={true}
                thousandSeparator='.'
                decimalSeparator=','
                prefix='R$ '
                displayType='text'
                renderText={value => <span className='price'>{value}</span>}
                value={item.map.defaultPrice[0]} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsGrid;
