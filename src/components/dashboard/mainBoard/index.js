import React, { useState, Fragment } from 'react';
import {
  faSearch,
  faShieldAlt,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, Switch, Slider, message, Modal, Spin } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';

const MainBoard = (props) => {
  const [showHideCal, setShowHideCal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState(null);
  const { authedUser, dataCount, requestsCount } = props;

  return (
    <Fragment>
      <Modal
        centered
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        width={
          window.screen.width < 520
            ? window.screen.width - 100
            : window.screen.width - 500
        }
      >
        {/* Content here */}
      </Modal>

      <div className="container m-5">
        <div className="row">
          <div className="main-overview">
            <div className="overviewcard">
              <div className="overviewcard__icon">
                <FontAwesomeIcon
                  icon={faLayerGroup}
                  size="3x"
                  color="#5C4DB1"
                  className="mr-2"
                />
              </div>
              <div className="overviewcard__info">
                <div>
                  <span className="stats-heading-title">{dataCount}</span>
                </div>
                <div>
                  <span className="stats-heading-label">Data</span>
                </div>
              </div>
            </div>
            <div className="overviewcard">
              <div className="overviewcard__icon">
                <FontAwesomeIcon
                  icon={faLayerGroup}
                  size="3x"
                  color="#5C4DB1"
                  className="mr-2"
                />
              </div>
              <div className="overviewcard__info">
                <div>
                  <span className="stats-heading-title">{requestsCount}</span>
                </div>
                <div>
                  <span className="stats-heading-label">Requests</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="dashboard-services-main-container"></div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, requests }) => {
  return {
    authedUser,
    dataCount: Object.values(requests).length,
    requestsCount: Object.values(requests).filter(
      (request) =>
        (request.product === 'pads' || request.product === 'condoms') &&
        request.status === 0
    ).length,
  };
};

export default connect(mapStateToProps)(MainBoard);
