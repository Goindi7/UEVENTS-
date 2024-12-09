import React from 'react';
import './Footer.css';

const FooterColumn = ({ title, items }) => {
  return (
    <div className="column">
      <h3 className="columnTitle">{title}</h3>
      <ul className="columnList">
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.link} className="link">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
