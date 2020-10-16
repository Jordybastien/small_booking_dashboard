import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Button, Alert } from 'antd';
import TextBox from '../../textbox';
import { handleCreateUser } from '../../../actions/authedUser';

class AddUserComponent extends Component {
  state = {
    loading: false,
    names: '',
    phone: '',
    errors: {
      names: '',
      phone: '',
    },
  };

  handleNames = (e) => {
    const { errors } = this.state;
    errors.names = '';
    this.setState({ errors, names: e.target.value });
  };

  handlePhone = (e) => {
    const { errors } = this.state;
    errors.phone = '';
    !isNaN(e.target.value) && this.setState({ errors, phone: e.target.value });
  };

  handleFormSubmit = () => {
    const { data, response } = this.checkValidation();
    if (response) {
      data.MSISDN = '+25' + data.MSISDN;
      this.setState({ loading: true });
      this.props.dispatch(handleCreateUser(data)).then((res) => {
        const { errors } = this.state;
        errors.names = '';
        errors.phone = '';
        this.setState({ loading: false, names: '', phone: '', errors });
      });
    }
  };

  checkValidation = () => {
    const { phone, names, errors } = this.state;
    let response = true;
    let data = {};

    data.MSISDN = phone;
    data.names = names;

    if (!phone) {
      errors.phone = 'Phone Number is Required';
      response = false;
    } else if (isNaN(phone)) {
      errors.phone = 'Phone Number must be numeric';
      response = false;
    } else if (phone.length < 10 || phone.length > 10) {
      errors.phone = 'Invalid Phone Number';
      response = false;
    }

    if (!names) {
      errors.names = 'Names are Required';
      response = false;
    }

    this.setState({ errors });
    return { data, response };
  };

  render() {
    const { names, phone, errors, loading } = this.state;
    return (
      <div className="dashboard-card mt-5 w-50">
        <div className="container">
          <div className="dashboard-card-header mb-3 d-flex">
            <div className="row mb-3 pl-3">
              <span className="modal-title">Add User </span>
            </div>
          </div>
          <div className="row txt-box-container  pl-3">
            <div>
              <span className="input-label">Names</span>
            </div>
            <div className="">
              <TextBox
                name="names"
                error={errors.names}
                onChange={(e) => this.handleNames(e)}
                value={names}
              />
            </div>
          </div>
          <div className="row txt-box-container  pl-3">
            <div>
              <span className="input-label">Phone Number</span>
            </div>
            <div className="">
              <TextBox
                name="phone"
                error={errors.phone}
                onChange={(e) => this.handlePhone(e)}
                maxLength={10}
                value={phone}
              />
            </div>
          </div>
          <div className="row submit-btn-container justify-content-center ">
            <div>
              <Button
                type="primary"
                className="custom-btn"
                onClick={() => this.handleFormSubmit()}
              >
                {loading ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    size="sm"
                    color="#fff"
                    className="ml-2"
                  />
                ) : (
                  'Add User'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(AddUserComponent);
