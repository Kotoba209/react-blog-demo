import React, { Component, createRef } from 'react'
import {
  Card,
  Button,
  Row,
  Col,
} from 'antd'

import echarts from 'echarts'

import { getArticleAmount } from '../../request'

import './dashboard.less'

export default class Dashboard extends Component {

  constructor() {
    super()
    this.articleAmount = createRef()
  }

  componentDidMount() {
    this.initArticleCharts()
  }

  initArticleCharts = () => {
    this.articleChart = echarts.init(this.articleAmount.current)

    getArticleAmount()
      .then((res) => {
       // 指定图表的配置项和数据
     const option = {
      title: {
          text: '每月用户访问量'
      },
      tooltip: {},
      legend: {
          data:['月份']
      },
      xAxis: {
          data: res.amount.map(val => val.month)
      },
      yAxis: {},
      series: [{
          name: '访问量',
          type: 'bar',
          data: res.amount.map(val => val.value)
      }]
  };

  // 使用刚指定的配置项和数据显示图表。
  this.articleChart.setOption(option);
    })
    
  }

  render() {

    return (
      <div>
        <Card
          title="概览"
          bordered={false}
          extra={<Button onClick={this.toExcel}
          >返回
          </Button>}>
          <Row justify="space-around">
              <Col className="ko-gutter-row" span={4}>
                <div>col-6</div>
              </Col>
              <Col className="ko-gutter-row" span={4}>
                <div>col-6</div>
              </Col>
              <Col className="ko-gutter-row" span={4}>
                <div>col-6</div>
              </Col>
              <Col className="ko-gutter-row" span={4}>
                <div>col-6</div>
              </Col>
            </Row>
        </Card>
        <Card title='最近浏览' bordered={false}>
          <div ref={this.articleAmount} style={{height: '240px'}} />
        </Card>
      </div>
    )
  }
}
