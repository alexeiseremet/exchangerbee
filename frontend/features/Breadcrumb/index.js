import './styles.scss';
import React from 'react';
import { Link } from '../../lib/i18n';

const Item = ({ data }) => (
    <li className="breadcrumb__item" itemProp="itemListElement"
        itemScope itemType="http://schema.org/ListItem"
    >
      <Link href={data.href}>
        <a className="breadcrumb__link" itemProp="item">
          <span itemProp="name">{data.label}</span>
        </a>
      </Link>

      <meta itemProp="position" content={data.order}/>
    </li>
);

const Breadcrumb = ({ items }) => (
    <ol className="breadcrumb" itemScope itemType="http://schema.org/BreadcrumbList" type="ordered">
      {
        items.map((item, index) => (
          <Item data={{ ...item, order: index + 2 }} key={index}/>
        ))
      }
    </ol>
);

export default Breadcrumb;
