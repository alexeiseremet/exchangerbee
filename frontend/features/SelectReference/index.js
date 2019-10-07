import React from 'react';
import Select from '../Input/select';

export default ({
  items,
  name,
  id,
  labelText,
  readOnly,
  required,
  setFieldValue,
}) => (
  <Select
    id={`${id}-refId`}
    name={`${name}.refId`}
    required={required}
    readOnly={readOnly}
    labelText={labelText}
    onChange={(refEl) => {
      const { value } = refEl.currentTarget;
      const selectedItem = items.filter((obj) => obj.id === value)[0];
      const { id: selectedItemId, slug } = selectedItem;

      setFieldValue(`${name}.refId`, selectedItemId);
      setFieldValue(`${name}.refSlug`, slug);
    }}
  >
    <option value="" disabled>Select an option</option>
    {
        items && items.map((item) => (
          <option key={item.slug} value={item.id}>
            {item.slug}
            {' '}
            {item.name}
          </option>
        ))
      }
  </Select>
);
