import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import Select from 'react-select';
import { exportToCsv, exportPDF } from '../../../utils/fileGenerator';
import moment from 'moment';

const options = [
  { value: 'pdf', label: 'PDF' },
  { value: 'excel', label: 'Excel' },
];

class RequestsTable extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    requests: this.props.requests,
    selectedOption: null,
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  handleSelect = (selectedOption) => {
    this.setState({ selectedOption });

    if (selectedOption.value === 'pdf') {
      const title = 'Requests';
      const headers = [['#', 'Product', 'Gender', 'Age', 'In Kigeme']];

      const data = this.state.requests.map((elt) => [
        elt.rowNum,
        elt.product,
        elt.gender,
        elt.age,
        elt.inKigeme,
      ]);
      exportPDF(title, headers, data);
    } else {
      const CsvString = [];
      CsvString.push(['\r\n', '#', 'Product', 'Gender', 'Age', 'In Kigeme']);

      this.state.requests.map((elt) =>
        CsvString.push('\r\n', [
          elt.rowNum,
          elt.product,
          elt.gender,
          elt.age,
          elt.inKigeme,
        ])
      );
      exportToCsv(CsvString);
    }
  };

  handleSearch = (e) => {
    if (e.target.value !== '') {
      const { requests } = this.state;
      this.setState({
        requests: requests.filter(
          (el) =>
            el.product.toLowerCase().includes(e.target.value.toLowerCase()) ||
            el.gender.toLowerCase().includes(e.target.value.toLowerCase()) ||
            el.age.toLowerCase().includes(e.target.value.toLowerCase())
        ),
      });
    } else {
      this.setState({ requests: this.props.requests });
    }
  };

  render() {
    const { requests, selectedOption } = this.state;

    const { num } = this.props;

    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};

    const columns = [
      {
        title: '#',
        dataIndex: 'rowNum',
        key: 'rowNum',
        sorter: (a, b) => a.rowNum - b.rowNum,
        sortOrder: sortedInfo.columnKey === 'rowNum' && sortedInfo.order,
        ellipsis: true,
        width: 50,
      },
      {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        sorter: (a, b) => a.product.length - b.product.length,
        sortOrder: sortedInfo.columnKey === 'product' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'In Kigeme',
        dataIndex: 'inKigeme',
        key: 'inKigeme',
        width: 100,
      },
    ];

    return (
      <div className="container">
        <div className="row mb-3 mt-5">
          <div className="col-md-6">
            <input
              type="text"
              className="dashboard-search-txtbox mb-3"
              placeholder="Search by product name, gender or age"
              onChange={this.handleSearch}
            />
          </div>
          <div className="col-md-6 select-container">
            <Select
              value={selectedOption}
              onChange={this.handleSelect}
              options={options}
              placeholder="Export"
              className="customized-select mb-3"
              isSearchable={false}
            />
          </div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-header mb-3 d-flex">
            <div className="row mb-3">
              <span className="modal-title">All Requests </span>
              <span>({num})</span>
            </div>
          </div>
          <div className="row">
            <Table
              columns={columns}
              dataSource={requests}
              onChange={this.handleChange}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '20', '50', '100'],
                position: ['bottomCenter'],
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ requests }) => {
  return {
    // requests: Object.values(requests)
    //   .map((obj, index) => ({
    //     ...obj,
    //     key: obj.requestId,
    //     rowNum: index + 1,
    //   }))
    //   .reverse(),
    // num: Object.values(requests).length,
    // TODO: Switch back to store data
    requests: currentRequests
      .map((obj, index) => ({
        ...obj,
        key: obj.requestId,
        rowNum: index + 1,
      }))
      .reverse(),
    num: currentRequests.length,
  };
};

export default connect(mapStateToProps)(RequestsTable);

const currentRequests = [
  {
    requestId: 1,
    product: 'pads',
    gender: 'Male',
    age: 12,
    inKigeme: 'yes',
    lang: 'rw',
    MSISDN: '',
    status: 0,
    dateModified: '2020-10-05T07:41:26.000000Z',
    dateCreated: '2020-10-05T03:41:26.000000Z',
  },
  {
    requestId: 2,
    product: 'pads',
    gender: 'Male',
    age: 21,
    inKigeme: 'yes',
    lang: 'en',
    MSISDN: '',
    status: 0,
    dateModified: '2020-10-05T07:42:11.000000Z',
    dateCreated: '2020-10-05T03:42:11.000000Z',
  },
  {
    requestId: 3,
    product: 'pads',
    gender: 'Male',
    age: 12,
    inKigeme: 'yes',
    lang: 'en',
    MSISDN: '',
    status: 0,
    dateModified: '2020-10-05T07:42:51.000000Z',
    dateCreated: '2020-10-05T03:42:51.000000Z',
  },
  {
    requestId: 4,
    product: 'condoms',
    gender: 'Male',
    age: 21,
    inKigeme: 'yes',
    lang: 'en',
    MSISDN: '',
    status: 0,
    dateModified: '2020-10-05T07:43:55.000000Z',
    dateCreated: '2020-10-05T03:43:55.000000Z',
  },
  {
    requestId: 5,
    product: 'pads',
    gender: 'Male',
    age: 21,
    inKigeme: 'yes',
    lang: 'en',
    MSISDN: '+250782980090',
    status: 0,
    dateModified: '2020-10-05T07:45:14.000000Z',
    dateCreated: '2020-10-05T03:45:14.000000Z',
  },
  {
    requestId: 6,
    product: 'updates',
    gender: 'Female',
    age: 21,
    inKigeme: 'no',
    lang: 'rw',
    MSISDN: '+250782980090',
    status: 0,
    dateModified: '2020-10-05T07:48:07.000000Z',
    dateCreated: '2020-10-05T03:48:07.000000Z',
  },
  {
    requestId: 7,
    product: 'updates',
    gender: 'Male',
    age: 21,
    inKigeme: 'yes',
    lang: 'rw',
    MSISDN: '+250782980090',
    status: 0,
    dateModified: '2020-10-06T11:04:53.000000Z',
    dateCreated: '2020-10-06T11:04:53.000000Z',
  },
  {
    requestId: 8,
    product: 'pads',
    gender: 'Female',
    age: 21,
    inKigeme: 'no',
    lang: 'rw',
    MSISDN: '+250782980090',
    status: 0,
    dateModified: '2020-10-06T11:05:07.000000Z',
    dateCreated: '2020-10-06T11:05:07.000000Z',
  },
  {
    requestId: 9,
    product: 'updates',
    gender: 'Male',
    age: 23,
    inKigeme: 'yes',
    lang: 'en',
    MSISDN: '+250784903167',
    status: 0,
    dateModified: '2020-10-07T08:00:01.000000Z',
    dateCreated: '2020-10-07T08:00:01.000000Z',
  },
  {
    requestId: 10,
    product: 'updates',
    gender: 'Female',
    age: 12,
    inKigeme: 'yes',
    lang: 'en',
    MSISDN: '+250784903167',
    status: 0,
    dateModified: '2020-10-07T08:01:06.000000Z',
    dateCreated: '2020-10-07T08:01:06.000000Z',
  },
  {
    requestId: 11,
    product: 'updates',
    gender: 'Female',
    age: 19,
    inKigeme: 'yes',
    lang: 'en',
    MSISDN: '+250784903167',
    status: 0,
    dateModified: '2020-10-07T08:09:47.000000Z',
    dateCreated: '2020-10-07T08:09:47.000000Z',
  },
  {
    requestId: 12,
    product: 'condoms',
    gender: 'Male',
    age: 21,
    inKigeme: 'yes',
    lang: 'en',
    MSISDN: '+250784903167',
    status: 0,
    dateModified: '2020-10-07T08:15:41.000000Z',
    dateCreated: '2020-10-07T08:15:41.000000Z',
  },
  {
    requestId: 13,
    product: 'updates',
    gender: 'Female',
    age: 26,
    inKigeme: 'yes',
    lang: 'en',
    MSISDN: '+250784903167',
    status: 0,
    dateModified: '2020-10-07T08:18:08.000000Z',
    dateCreated: '2020-10-07T08:18:08.000000Z',
  },
  {
    requestId: 14,
    product: 'pads',
    gender: 'Female',
    age: 25,
    inKigeme: 'yes',
    lang: 'en',
    MSISDN: '+250784903167',
    status: 0,
    dateModified: '2020-10-07T08:18:51.000000Z',
    dateCreated: '2020-10-07T08:18:51.000000Z',
  },
  {
    requestId: 15,
    product: 'updates',
    gender: 'Female',
    age: 24,
    inKigeme: 'yes',
    lang: 'en',
    MSISDN: '+250784903167',
    status: 0,
    dateModified: '2020-10-07T08:31:39.000000Z',
    dateCreated: '2020-10-07T08:31:39.000000Z',
  },
  {
    requestId: 16,
    product: 'pads',
    gender: 'Female',
    age: 23,
    inKigeme: 'yes',
    lang: 'en',
    MSISDN: '+250784903167',
    status: 0,
    dateModified: '2020-10-07T08:32:08.000000Z',
    dateCreated: '2020-10-07T08:32:08.000000Z',
  },
];
