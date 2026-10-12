import React from 'react';
import styled from 'styled-components';

const Field = styled.div`
  margin-bottom: 18px;
  label { display: block; margin-bottom: 6px; font-weight: bold; }
  small { display: block; margin-top: 6px; color: #52647c; }
`;

export default function FormField({ id, label, hint, children }) {
  return (
    <Field>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && <small id={`${id}-hint`}>{hint}</small>}
    </Field>
  );
}
