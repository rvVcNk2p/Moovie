import React, { Fragment, useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Password do not match!');
    } else {
      console.log();
    }
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign up</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Creat Your Accout
      </p>
      <form className='form' action='creat-profile.html'>
        <div className='form-group'>
          <input
            type='text'
            palaceholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
      </form>
    </Fragment>
  );
};

export default Register;
