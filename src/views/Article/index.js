import React, { Component } from 'react'
import { Card, Button, Table, Tag, Modal, message, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment'
import XLSX from 'xlsx'

import { getArticles, deleteArticle } from '../../request'

const titleDisplayMap = {
  id: 'id',
  title: '标题',
  author: '作者',
  createAt: '创建时间',
  amount: '阅读量',
}

export default class Article extends Component {

  constructor() {
    super()
    this.state = {
      dataSource: [],
      columns: [],
      total: 0,
      isLoading: false,
      offset: 0,
      limited: 10,
      msg: null,
    }
  }

  createColumns = (keys) => {
    const columns = keys = keys.map(val => {
      if (val === 'amount') {
        return {
          title: titleDisplayMap[val],
          key: val,
          render: (record) => {
            const { amount } = record
            return (
              <Tooltip title={amount > 230 ? '超过230' : '未超过230'}>
                <Tag color={amount > 230 ? 'red' : 'green'}>{record.amount}</Tag>
              </Tooltip>
              // <Tag color={amount > 230 ? 'red' : 'green'}>{record.amount}</Tag>
            )
          }
        }
      }

      if (val === 'createAt') {
        return {
          title: titleDisplayMap[val],
          key: val,
          render: (record) => {
            const { createAt } = record
            return moment(createAt).format('YYYY年MM月DD日 hh时mm分ss秒')
          }
        }
      }
      return {
        title: titleDisplayMap[val],
        dataIndex: val,
        key: val
      }
    })
    columns.push({
      title: '操作',
      key: 'action',
      render: (record) => {
        return (
          <div>
            <Button
              type='primary'
              size='small'
              onClick={() => { this.props.history.push(`/admin/article/edit/${record.id}`) }}>
              编辑
              </Button>
            <Button type='danger' size='small' onClick={this.delArticle.bind(this, record)}>删除</Button>
          </div>
        )
      }
    })
    return columns;
  }

  getData = () => {
    var that = this;
    this.setState({
      isLoading: true
    })
    getArticles(this.state.offset, this.state.limited)
      .then(res => {
        const keys = Object.keys(res.list[0]);
        const columns = this.createColumns(keys)
        if (!this.updater.isMounted(this)) return
          that.setState({
            total: res.total,
            columns,
            dataSource: res.list,
          })
      }).catch((err => {
      console.log(err, '<-err->');
      }))
      .finally(() => {
        if (!this.updater.isMounted(this)) return
        this.setState({
        isLoading: false
      })
    })
  }

  componentDidMount() {
    this.getData()
  }

  delArticle = (record) => {
    const { confirm } = Modal;
    const that = this;
    confirm({
      title: '温馨提示',
      icon: <ExclamationCircleOutlined />,
      content: <div>确定要删除<span style={{color: '#f00'}}>{record.title}</span>吗?</div>,
      cancelText: '取消',
      okText: '确定',
      onOk() {
        message.loading('删除中', 0)
        deleteArticle(record.id)
          .then((res) => {
            that.setState({
              msg: res.msg
            })
          }).catch((err) => {
            console.log(err, '<-err->');
          }).finally(() => {
            message.destroy()
            message.success(that.state.msg)
            that.getData();
        })
      },
      onCancel() {},
    });
  }

  onPageChange = (page, pageSize) => {
    this.setState({
      offset: pageSize * (page - 1),
      limited: pageSize
    }, () => {
        this.getData()
    })
  }

  onShowSizeChange = (current, size) => {
    this.setState({
      offset: 0,
      limited: size
    }, () => {
        this.getData()
    })
  }

  toExcel = () => {

    const data = [Object.keys(this.state.dataSource[0])]

    for (let i = 0; i < this.state.dataSource.length; i++) {
      // data.push(Object.values(this.state.dataSource[i]))
      const values = Object.values(this.state.dataSource[i])
      const { createAt } = values;
      values.splice(values.indexOf(createAt), 1);
      data.push([
        ...values,
        moment(createAt).format('YYYY-MM-DD')
      ])
    }
    console.log(data, '<-data->');
    /* convert state to workbook */
		const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, `sheetjs-${moment().format('YYYY-MM-DD hh:mm:ss')}.xls`)
  }

  render() {
    return (
      <div>
        <Card title="文章列表" bordered={false} extra={<Button onClick={this.toExcel}>导出Excel</Button>}>
          <Table
            rowKey={record => record.id}
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            loading={this.state.isLoading}
            pagination={{
              current: this.state.offset / this.state.limited + 1,
              total: this.state.total,
              onChange: this.onPageChange,
              showSizeChanger: true,
              onShowSizeChange: this.onShowSizeChange
            }}
          />;
        </Card>
      </div>
    )
  }
}
