import React from 'react'
import Select from '../Input/select'

export default (
  {
    items,
    name,
    id,
    labelText,
    readOnly,
    required,
    setFieldValue
  }
) => (
    <Select
      id={`${id}-refId`}
      name={`${name}.refId`}
      required={required}
      readOnly={readOnly}
      labelText={labelText}
      onChange={refEl => {
        const { value } = refEl.currentTarget;
        const selectedItem = items.filter(obj => obj.id === value)[0];
        const { id, slug } = selectedItem;

        setFieldValue(`${name}.refId`, id);
        setFieldValue(`${name}.refSlug`, slug);
      }}
    >
      {
        items && items.map(({ id, slug, name }) => (
          <option key={slug} value={id}>{slug} {name}</option>
        ))
      }
    </Select>
  )
