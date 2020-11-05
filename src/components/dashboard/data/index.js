import React, { Component } from 'react';
import { Table, Button, DatePicker, Tag } from 'antd';
import { connect } from 'react-redux';
import Select from 'react-select';
import { exportToCsv, exportPDF } from '../../../utils/fileGenerator';
import moment from 'moment';
import { filter } from 'lodash';

const options = [
  { value: 'pdf', label: 'PDF' },
  { value: 'excel', label: 'Excel' },
];

const dateFormat = 'YYYY/MM/DD';

class DataTable extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    requests: this.props.requests,
    selectedOption: null,
    minAge: '',
    maxAge: '',
    fromDate: null,
    toDate: null,
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
    
    filters.product &&
      this.setState({
        requests: this.state.requests.filter(
          (request) => request.product === filters.product[0]
        ),
      });
    filters.gender &&
      this.setState({
        requests: this.state.requests.filter(
          (request) => request.gender === filters.gender[0]
        ),
      });
    filters.inKigeme &&
      this.setState({
        requests: this.state.requests.filter(
          (request) => request.inKigeme === filters.inKigeme[0]
        ),
      });
    filters.status &&
      this.setState({
        requests: this.state.requests.filter(
          (request) => request.status === filters.status[0]
        ),
      });
  };

  handleSelect = (selectedOption) => {
    this.setState({ selectedOption });

    if (selectedOption.value === 'pdf') {
      const title = 'Requests';
      const headers = [['#', 'Product', 'Gender', 'Age', 'In Kigeme', 'Phone']];

      const data = this.state.requests.map((elt) => [
        elt.rowNum,
        elt.product,
        elt.gender,
        elt.age,
        elt.inKigeme,
        elt.MSISDN,
      ]);
      exportPDF(title, headers, data);
    } else {
      const CsvString = [];
      CsvString.push([
        '\r\n',
        '#',
        'Product',
        'Gender',
        'Age',
        'In Kigeme',
        'Phone',
      ]);

      this.state.requests.map((elt) =>
        CsvString.push('\r\n', [
          elt.rowNum,
          elt.product,
          elt.gender,
          elt.age,
          elt.inKigeme,
          elt.MSISDN,
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

  handleMin = (e) =>
    !isNaN(e.target.value) && this.setState({ minAge: e.target.value });

  handleMax = (e) =>
    !isNaN(e.target.value) && this.setState({ maxAge: e.target.value });

  handleFilterAge = () => {
    const { requests, minAge, maxAge } = this.state;
    this.setState({
      requests: requests.filter(
        (request) => request.age >= minAge && request.age <= maxAge
      ),
    });
  };

  handleFilterDate = () => {
    const { requests, fromDate, toDate } = this.state;
    this.setState({
      requests: requests.filter(
        (request) =>
          request.dateCreated.split('T')[0] >= fromDate &&
          request.dateCreated.split('T')[0] <= toDate
      ),
    });
  };

  handleBeforeDate = (selDate) =>
    this.setState({ fromDate: moment(selDate._d).format('YYYY-MM-DD') });

  handleToDate = (selDate) =>
    this.setState({ toDate: moment(selDate._d).format('YYYY-MM-DD') });

  render() {
    const {
      requests,
      selectedOption,
      minAge,
      maxAge,
      fromDate,
      toDate,
    } = this.state;

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
        filters: [
          {
            text: 'Pads',
            value: 'pads',
          },
          {
            text: 'Condoms',
            value: 'condoms',
          },
          {
            text: 'HIV',
            value: 'hiv',
          },
          {
            text: 'STI',
            value: 'sti',
          },
          {
            text: 'Male Puberty',
            value: 'male_puberty',
          },
          {
            text: 'Violence',
            value: 'violence',
          },
          {
            text: 'Teenager Pregnancy',
            value: 'teenager_pregnancy',
          },
        ],
        onFilter: (value, record) => record.product === value,
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        filters: [
          {
            text: 'Male',
            value: 'Male',
          },
          {
            text: 'Female',
            value: 'Female',
          },
        ],
        onFilter: (value, record) => record.gender === value,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'In Kigeme',
        dataIndex: 'inKigeme',
        key: 'inKigeme',
        width: 100,
        filters: [
          {
            text: 'Yes',
            value: 'yes',
          },
          {
            text: 'No',
            value: 'no',
          },
        ],
        onFilter: (value, record) => record.inKigeme === value,
      },
      {
        title: 'Phone',
        dataIndex: 'MSISDN',
        key: 'MSISDN',
      },
      {
        title: 'Requested On(Y/M/D)',
        dataIndex: 'createdOn',
        key: 'createdOn',
        sorter: (a, b) => new Date(a.createdOn) - new Date(b.createdOn),
        sortOrder: sortedInfo.columnKey === 'createdOn' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
          switch (status) {
            case 0:
              return (
                <Tag color="geekblue" key={status}>
                  Pending
                </Tag>
              );

            case 1:
              return (
                <Tag color="green" key={status}>
                  Approved
                </Tag>
              );

            case 1:
              return (
                <Tag color="volcano" key={status}>
                  Rejected
                </Tag>
              );

            default:
              break;
          }
        },
        filters: [
          {
            text: 'Pending',
            value: 0,
          },
          {
            text: 'Approved',
            value: 1,
          },
          {
            text: 'Rejected',
            value: 2,
          },
        ],
        onFilter: (value, record) => record.status === value,
      },
    ];

    return (
      <div className="container">
        <div className="row mb-3 mt-5 px-5">
          <div className="col-md-6">
            <input
              type="text"
              className="dashboard-search-txtbox mb-3"
              placeholder="Min Age"
              onChange={this.handleMin}
              value={minAge}
            />
            <input
              type="text"
              className="dashboard-search-txtbox mb-3"
              placeholder="Max Age"
              onChange={this.handleMax}
              value={maxAge}
            />
            <Button
              type="primary"
              onClick={this.handleFilterAge}
              disabled={!minAge || !maxAge}
            >
              Filter
            </Button>
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
        <div className="row mb-3 justify-content-between px-5">
          <div>
            <DatePicker
              format={dateFormat}
              placeholder="Requests From"
              onChange={this.handleBeforeDate}
            />
            <DatePicker
              format={dateFormat}
              placeholder="Requests To"
              onChange={this.handleToDate}
            />
            <Button
              type="primary"
              onClick={this.handleFilterDate}
              disabled={!fromDate || !toDate}
              className="ml-4"
            >
              Filter
            </Button>
          </div>
          <div>
            <Button
              type="primary"
              onClick={() =>
                this.setState({
                  requests: this.props.requests,
                  filteredInfo: null,
                  sortedInfo: null,
                })
              }
              className="ml-4"
            >
              Reset All
            </Button>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-header mb-3 d-flex">
            <div className="row mb-3">
              <span className="modal-title">All Data </span>
              <span>({requests.length})</span>
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
    requests: Object.values(requests)
      .map((obj, index) => ({
        ...obj,
        key: obj.requestId,
        rowNum: index + 1,
        createdOn: obj.dateCreated.substr(0, 10),
      }))
      .reverse(),
    num: Object.values(requests).length,
  };
};

export default connect(mapStateToProps)(DataTable);
