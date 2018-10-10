<template>
  <section>
    <div class="fun_c">
      <div class="search_condition">
        <div class="i"></div>
        <div class="c">
          <div class="name">信息</div>
          <Dropdown trigger="click" @on-click="searchClick">
            <a href="javascript:;">
              最近查询条件 <span class="icon"></span>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem v-for="item in search_condition" :key="item.id" :name="item.id">{{item.name}}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div class="fr">
        <Button type="primary" class="add" @click="addShow">新增</Button>
        <Button type="primary" class="print">打印</Button>
      </div>
    </div>
    <div class="datalist">

      <div class="list_scroll_left">

        <list-head :headlist="datalist.head" fixed="left" :selectChange="change_select" :modelaction="model_save"
                   :modelshow="modelShow"></list-head>

        <list-main :list="datalist.list" :head="datalist.head" :mouseover="lr_mouseOver" :mouseleave="lr_mouseLeave"
                   :change_s="change_s" :edit="edit_single" :delete="delete_single" fixed="left"></list-main>

      </div>

      <div class="list_scroll_right">

        <list-head :headlist="datalist.head" fixed="right" :selectChange="change_select" :modelaction="model_save"
                   :modelshow="modelShow"></list-head>

        <list-main :list="datalist.list" :head="datalist.head" :mouseover="lr_mouseOver" :mouseleave="lr_mouseLeave"
                   :change_s="change_s" :edit="edit_single" :delete="delete_single" fixed="right"></list-main>

      </div>

      <div class="list_scroll_limit">
        <div class="list_scroll">

          <list-head :headlist="datalist.head" :selectChange="change_select" :modelaction="model_save"
                     :modelshow="modelShow"></list-head>

          <list-main :list="datalist.list" :head="datalist.head" :mouseover="lr_mouseOver" :mouseleave="lr_mouseLeave"
                     :change_s="change_s" :edit="edit_single" :delete="delete_single"></list-main>

        </div>
      </div>

      <div class="list_foot">

        <div class="fun">
          <div class="check">
            <Checkbox :indeterminate="indeterminate" v-model="checkAll_c" @click.prevent.native="checkAll"></Checkbox>
          </div>

          <ButtonGroup>
            <Button @click="delete_batch">删除</Button>
            <Button>导出</Button>
          </ButtonGroup>

        </div>
        <div class="r">
          <pager></pager>
          <div class="totop" @click="scrollList">
            <div></div>
          </div>
        </div>

      </div>

    </div>

    <div class="page_float" v-show="addState">
      <div class="head">
        <div class="name">零售管理</div>
        <div class="close" @click="addClose">×</div>
      </div>
      <div class="main">
        <div class="layerm">

          <div class="layer">
            <div class="name">会计月</div>
            <div class="fzone">
              <Input disabled v-model="addlist.accountant"/>
            </div>
          </div>

          <div class="layer">
            <div class="name"><span>*</span>库存数量</div>
            <div class="fzone">
              <Input v-model="addlist.stock"/>
            </div>
          </div>

          <div class="layer">
            <div class="name"><span>*</span>月初库存</div>
            <div class="fzone">
              <Input v-model="addlist.stock_bm"/>
            </div>
          </div>

          <div class="layer">
            <div class="name"><span>*</span>销售品种数</div>
            <div class="fzone">
              <Input v-model="addlist.market_num"/>
            </div>
          </div>

          <div class="layer">
            <div class="name"><span>*</span>有销售且有库存品种数</div>
            <div class="fzone">
              <Input v-model="addlist.stock_sell_num"/>
            </div>
          </div>

          <div class="layer">
            <div class="name"><span>*</span>有库存品种数</div>
            <div class="fzone">
              <Input v-model="addlist.stock_num"/>
            </div>
          </div>

          <div class="layer">
            <div class="name"><span>*</span>销售额</div>
            <div class="fzone">
              <Input v-model="addlist.money_sell"/>
            </div>
          </div>

          <div class="layer">
            <div class="name"><span>*</span>耗损金额</div>
            <div class="fzone">
              <Input v-model="addlist.money_consume"/>
            </div>
          </div>

        </div>
        <div class="layerm">

          <div class="layer">
            <div class="name"><span>*</span>配送金额</div>
            <div class="fzone">
              <Input v-model="addlist.money_delivery"/>
            </div>
          </div>

          <div class="layer">
            <div class="name"><span>*</span>配送退回金额</div>
            <div class="fzone">
              <Input v-model="addlist.money_delivery_back"/>
            </div>
          </div>

          <div class="layer">
            <div class="name"><span>*</span>商品满足率</div>
            <div class="fzone">
              <Input v-model="addlist.money_delivery_satisfy"/>
            </div>
          </div>

        </div>

      </div>
      <div class="foot_fun">
        <Button @click="savedata">保存并新增</Button>
        <Button type="primary" @click="savedata">保存</Button>
      </div>

    </div>

    <Modal
      v-model="modelInput.visible"
      title="存为模板"
      :loading="modelInput.confirmLoading"
      @on-ok="handleOk">
      <Input placeholder="输入模板的名字" v-model="modelInput.inputval"></Input>
    </Modal>

  </section>

</template>

<script>
  import pager from './pager'

  export default {
    name: 'dataList',
    components: {
      pager,
      listHead: {
        props: ['headlist', 'selectChange', 'fixed', 'modelaction', 'modelshow'],
        render(h) {
          let _this = this;
          return h('ul', {
              class: ['list_head']
            },
            _this.headlist.map((item) => {

              if (_this.fixed && _this.fixed === item.fixed || !_this.fixed) {

                if (!_this.fixed && item.fixed) {
                  return h('li', {
                    class: item.class
                  })
                } else {
                  return h('li', {
                      class: [item.class]
                    },
                    item.name ?
                      [
                        h('div', {
                            class: ['name']
                          },
                          item.name
                        ),
                        item.mode ?
                          h('div', {
                              class: ['operation']
                            },
                            [
                              item.mode === 'select' ?
                                h('Select', {
                                    props: {
                                      value: item.select_val.smsg,
                                      filterable: true,
                                      placeholder: item.placeholder
                                    },
                                    on: {
                                      'on-change': (v) => {
                                        _this.selectChange(v, item.id)
                                      }
                                    }
                                  },
                                  item.select_val.list.map((item_select) => {
                                    return h(
                                      'Option', {
                                        props: {
                                          value: item_select.msg,
                                          key: item_select.id
                                        }
                                      }, item_select.msg
                                    )
                                  })
                                ) : '',

                              item.mode === 'operate' ?
                                [
                                  h('div', {
                                    class: 'model_save'
                                  }, [
                                    h('div', {
                                      class: 'search_btn'
                                    }, '搜索'),
                                    h('div', {
                                      class: 'line'
                                    }),
                                    h('div', {
                                      class: 'icon',
                                      on: {
                                        click: _this.modelaction
                                      }
                                    }, [h('div')])
                                  ]),
                                  h('div', {
                                    class: 'ofun',
                                    attrs: {
                                      id: 'model_save_show',
                                    },
                                    style: {
                                      'display': 'none'
                                    },
                                    on: {
                                      click: _this.modelshow
                                    }
                                  }, '存为模板...')
                                ] : ''
                            ]
                          ) : ''
                      ] : ''
                  )
                }

              } else {
                return ''
              }
            })
          )
        },

      },
      listMain: {
        props: ['list', 'head', 'mouseover', 'mouseleave', 'change_s', 'edit', 'delete', 'fixed'],
        render(h) {
          let _this = this;
          return h('ul', {
              class: 'list_main'
            },
            _this.list.map((item) => {
              return h('li', {
                class: ['list_row', item.class, item.hover ? 'hover' : ''],
                on: {
                  mouseover: () => {
                    _this.mouseover(item.id);
                  },
                  mouseleave: _this.mouseleave
                }
              }, [
                h('ul',
                  item.list_d.map((item_d, index) => {

                    if (_this.head[index].fixed && _this.head[index].fixed === _this.fixed || !_this.fixed) {
                      if (!_this.fixed && _this.head[index].fixed) {
                        return h('li', {
                          class: item_d.class
                        })
                      } else if (index === 0 && item_d.class === 'checkbox') {
                        return h('li', {
                          class: item_d.class
                        }, [
                          h('Checkbox', {
                            props: {
                              value: item.checked
                            },
                            on: {
                              'on-change': () => {
                                _this.change_s(item.id)
                              }
                            }
                          })
                        ])
                      } else if (item_d.class === 'operate') {
                        return h('li', {
                          class: item_d.class
                        }, [
                          h('div', {
                              class: 'edit',
                              on: {
                                click: () => {
                                  _this.edit(item.id)
                                }
                              }
                            }, [h('div')]
                          ),
                          h('div', {
                              class: 'delete',
                              on: {
                                click: () => {
                                  _this.delete(item.id)
                                }
                              }
                            }, [h('div')]
                          )
                        ])
                      } else if (item_d.link) {
                        return h('li', {
                          class: item_d.class
                        }, [
                          h('a', {
                            props: {
                              href: 'javascript:;'
                            }
                          }, item_d.data)
                        ])
                      } else {
                        return h('li', {
                          class: item_d.class
                        }, item_d.data)
                      }
                    } else {
                      return ''
                    }

                  })
                )
              ])
            })
          )

        }
      }
    },
    data() {
      return {
        datalist: {
          head: [
            {
              id: this.$v4(),
              class: 'checkbox',
              fixed: 'left'
            },
            {
              id: this.$v4(),
              class: 'serial_num',
              name: '序号',
              fixed: 'left'
            },
            {
              id: this.$v4(),
              class: 'accountant',
              name: '会计月',
              mode: 'select',
              placeholder: '（全部）',
              fixed: 'left',
              select_val: {
                sid: 0,
                smsg: '1',
                list: [
                  {
                    id: 0,
                    msg: '1'
                  },
                  {
                    id: 1,
                    msg: '2'
                  },
                  {
                    id: 2,
                    msg: '3'
                  }
                ]
              }

            },
            {
              id: this.$v4(),
              class: 'stock',
              name: '库存数量',
              mode: 'select',
              placeholder: '（全部）',
              select_val: {
                sid: 0,
                smsg: '库存1',
                list: [
                  {
                    id: 0,
                    msg: '库存0'
                  },
                  {
                    id: 1,
                    msg: '库存1'
                  },
                  {
                    id: 2,
                    msg: '库存2'
                  }
                ]
              }

            },
            {
              id: this.$v4(),
              class: 'stock_bm',
              name: '月初库存',
              mode: 'select',
              placeholder: '（全部）',
              select_val: {
                sid: 0,
                smsg: undefined,
                list: [
                  {
                    id: 0,
                    msg: '库存0'
                  },
                  {
                    id: 1,
                    msg: '库存1'
                  },
                  {
                    id: 2,
                    msg: '库存2'
                  }
                ]
              }

            },
            {
              id: this.$v4(),
              class: 'market_num',
              name: '销售品种数',
              mode: 'select',
              placeholder: '（全部）',
              select_val: {
                sid: 0,
                smsg: undefined,
                list: [
                  {
                    id: 0,
                    msg: 10
                  },
                  {
                    id: 1,
                    msg: 11
                  },
                  {
                    id: 2,
                    msg: 12
                  }
                ]
              }

            },
            {
              id: this.$v4(),
              class: 'stock_sell_num',
              name: '有销售且有库存品种数',
              mode: 'select',
              placeholder: '（全部）',
              select_val: {
                sid: 0,
                smsg: undefined,
                list: [
                  {
                    id: 0,
                    msg: 10
                  },
                  {
                    id: 1,
                    msg: 11
                  },
                  {
                    id: 2,
                    msg: 12
                  }
                ]
              }

            },
            {
              id: this.$v4(),
              class: 'stock_num',
              name: '有库存品种数',
              mode: 'select',
              placeholder: '（全部）',
              select_val: {
                sid: 0,
                smsg: undefined,
                list: [
                  {
                    id: 0,
                    msg: 10
                  },
                  {
                    id: 1,
                    msg: 11
                  },
                  {
                    id: 2,
                    msg: 12
                  }
                ]
              }

            },
            {
              id: this.$v4(),
              class: 'money_sell',
              name: '销售额',
              mode: 'select',
              placeholder: '（全部）',
              select_val: {
                sid: 0,
                smsg: undefined,
                list: [
                  {
                    id: 0,
                    msg: 10000
                  },
                  {
                    id: 1,
                    msg: 20000
                  },
                  {
                    id: 2,
                    msg: 30000
                  }
                ]
              }

            },
            {
              id: this.$v4(),
              class: 'money_consume',
              name: '耗损金额',
              mode: 'select',
              placeholder: '（全部）',
              select_val: {
                sid: 0,
                smsg: undefined,
                list: [
                  {
                    id: 0,
                    msg: 10000
                  },
                  {
                    id: 1,
                    msg: 20000
                  },
                  {
                    id: 2,
                    msg: 30000
                  }
                ]
              }

            },
            {
              id: this.$v4(),
              class: 'money_delivery',
              name: '配送金额',
              mode: 'select',
              placeholder: '（全部）',
              select_val: {
                sid: 0,
                smsg: undefined,
                list: [
                  {
                    id: 0,
                    msg: 10000
                  },
                  {
                    id: 1,
                    msg: 20000
                  },
                  {
                    id: 2,
                    msg: 30000
                  }
                ]
              }

            },
            {
              id: this.$v4(),
              class: 'money_delivery_back',
              name: '配送退回金额',
              mode: 'select',
              placeholder: '（全部）',
              select_val: {
                sid: 0,
                smsg: undefined,
                list: [
                  {
                    id: 0,
                    msg: 10000
                  },
                  {
                    id: 1,
                    msg: 20000
                  },
                  {
                    id: 2,
                    msg: 30000
                  }
                ]
              }

            },
            {
              id: this.$v4(),
              class: 'money_delivery_satisfy',
              name: '商品满足率',
              mode: 'select',
              placeholder: '（全部）',
              fixed: 'right',
              select_val: {
                sid: 0,
                smsg: undefined,
                list: [
                  {
                    id: 0,
                    msg: '10%'
                  },
                  {
                    id: 1,
                    msg: '20%'
                  },
                  {
                    id: 2,
                    msg: '30%'
                  }
                ]
              }

            },
            {
              id: this.$v4(),
              class: 'operate',
              name: '操作',
              fixed: 'right',
              mode: 'operate'
            },

          ],
          loading: false,
          list: [
            {
              id: this.$v4(),
              checked: true,
              hover: false,
              list_d: [
                {
                  class: 'checkbox'
                },
                {
                  class: 'serial_num',
                  link: true,
                  data: 1
                },
                {
                  class: 'accountant',
                  link: true,
                  data: 3
                },
                {
                  class: 'stock',
                  link: true,
                  data: 5666
                },
                {
                  class: 'stock_bm',
                  link: 20000,
                  data: 5555
                },
                {
                  class: 'market_num',
                  link: false,
                  data: 6
                },
                {
                  class: 'stock_sell_num',
                  link: false,
                  data: 7
                },
                {
                  class: 'stock_num',
                  link: false,
                  data: 8
                },
                {
                  class: 'money_sell',
                  link: false,
                  data: 8000.00
                },
                {
                  class: 'money_consume',
                  link: false,
                  data: 1000.00
                },
                {
                  class: 'money_delivery',
                  link: false,
                  data: 500.00
                },
                {
                  class: 'money_delivery_back',
                  link: false,
                  data: 200.00
                },
                {
                  class: 'money_delivery_satisfy',
                  link: false,
                  data: '30%'
                },
                {
                  class: 'operate'
                }
              ]
            },
            {
              id: this.$v4(),
              checked: false,
              hover: false,
              list_d: [
                {
                  class: 'checkbox'
                },
                {
                  class: 'serial_num',
                  link: true,
                  data: 2
                },
                {
                  class: 'accountant',
                  link: true,
                  data: 3
                },
                {
                  class: 'stock',
                  link: true,
                  data: 5666
                },
                {
                  class: 'stock_bm',
                  link: 20000,
                  data: 5555
                },
                {
                  class: 'market_num',
                  link: false,
                  data: 6
                },
                {
                  class: 'stock_sell_num',
                  link: false,
                  data: 7
                },
                {
                  class: 'stock_num',
                  link: false,
                  data: 8
                },
                {
                  class: 'money_sell',
                  link: false,
                  data: 8000.00
                },
                {
                  class: 'money_consume',
                  link: false,
                  data: 1000.00
                },
                {
                  class: 'money_delivery',
                  link: false,
                  data: 500.00
                },
                {
                  class: 'money_delivery_back',
                  link: false,
                  data: 200.00
                },
                {
                  class: 'money_delivery_satisfy',
                  link: false,
                  data: '30%'
                },
                {
                  class: 'operate'
                }
              ]
            },
            {
              id: this.$v4(),
              checked: false,
              hover: false,
              list_d: [
                {
                  class: 'checkbox'
                },
                {
                  class: 'serial_num',
                  link: true,
                  data: 3
                },
                {
                  class: 'accountant',
                  link: true,
                  data: 3
                },
                {
                  class: 'stock',
                  link: true,
                  data: 5666
                },
                {
                  class: 'stock_bm',
                  link: 20000,
                  data: 5555
                },
                {
                  class: 'market_num',
                  link: false,
                  data: 6
                },
                {
                  class: 'stock_sell_num',
                  link: false,
                  data: 7
                },
                {
                  class: 'stock_num',
                  link: false,
                  data: 8
                },
                {
                  class: 'money_sell',
                  link: false,
                  data: 8000.00
                },
                {
                  class: 'money_consume',
                  link: false,
                  data: 1000.00
                },
                {
                  class: 'money_delivery',
                  link: false,
                  data: 500.00
                },
                {
                  class: 'money_delivery_back',
                  link: false,
                  data: 200.00
                },
                {
                  class: 'money_delivery_satisfy',
                  link: false,
                  data: '30%'
                },
                {
                  class: 'operate'
                }
              ]
            },
            {
              id: this.$v4(),
              checked: false,
              hover: false,
              list_d: [
                {
                  class: 'checkbox'
                },
                {
                  class: 'serial_num',
                  link: true,
                  data: 4
                },
                {
                  class: 'accountant',
                  link: true,
                  data: 3
                },
                {
                  class: 'stock',
                  link: true,
                  data: 5666
                },
                {
                  class: 'stock_bm',
                  link: 20000,
                  data: 5555
                },
                {
                  class: 'market_num',
                  link: false,
                  data: 6
                },
                {
                  class: 'stock_sell_num',
                  link: false,
                  data: 7
                },
                {
                  class: 'stock_num',
                  link: false,
                  data: 8
                },
                {
                  class: 'money_sell',
                  link: false,
                  data: 8000.00
                },
                {
                  class: 'money_consume',
                  link: false,
                  data: 1000.00
                },
                {
                  class: 'money_delivery',
                  link: false,
                  data: 500.00
                },
                {
                  class: 'money_delivery_back',
                  link: false,
                  data: 200.00
                },
                {
                  class: 'money_delivery_satisfy',
                  link: false,
                  data: '30%'
                },
                {
                  class: 'operate'
                }
              ]
            },
            {
              id: this.$v4(),
              checked: false,
              hover: false,
              list_d: [
                {
                  class: 'checkbox'
                },
                {
                  class: 'serial_num',
                  link: true,
                  data: 5
                },
                {
                  class: 'accountant',
                  link: true,
                  data: 3
                },
                {
                  class: 'stock',
                  link: true,
                  data: 5666
                },
                {
                  class: 'stock_bm',
                  link: 20000,
                  data: 5555
                },
                {
                  class: 'market_num',
                  link: false,
                  data: 6
                },
                {
                  class: 'stock_sell_num',
                  link: false,
                  data: 7
                },
                {
                  class: 'stock_num',
                  link: false,
                  data: 8
                },
                {
                  class: 'money_sell',
                  link: false,
                  data: 8000.00
                },
                {
                  class: 'money_consume',
                  link: false,
                  data: 1000.00
                },
                {
                  class: 'money_delivery',
                  link: false,
                  data: 500.00
                },
                {
                  class: 'money_delivery_back',
                  link: false,
                  data: 200.00
                },
                {
                  class: 'money_delivery_satisfy',
                  link: false,
                  data: '30%'
                },
                {
                  class: 'operate'
                }
              ]
            },

          ]
        },
        indeterminate: true,
        checkAll_c: false,
        modelToggle: false,
        modelInput: {
          visible: false,
          confirmLoading: true,
          inputval: ''
        },
        search_condition: [
          {
            id: this.$v4(),
            name: '测试条件',
            value: [
              {
                class: 'accountant',
                mode: 'select',
                sid: 1,
                smsg: '2',
              },
              {
                class: 'stock',
                mode: 'select',
                sid: 1,
                smsg: '库存1'
              },
              {
                class: 'stock_bm',
                mode: 'select',
                sid: 1,
                smsg: '库存1'

              },
              {
                class: 'market_num',
                mode: 'select',
                sid: 1,
                smsg: 11,
              },
              {
                class: 'stock_sell_num',
                mode: 'select',
                sid: 1,
                smsg: 11
              },
              {
                class: 'stock_num',
                mode: 'select',
                sid: 1,
                smsg: 11

              },
              {
                class: 'money_sell',
                mode: 'select',
                sid: 1,
                smsg: 20000
              },
              {
                class: 'money_consume',
                mode: 'select',
                sid: 1,
                smsg: 20000

              },
              {
                class: 'money_delivery',
                mode: 'select',
                sid: 1,
                smsg: 20000

              },
              {
                class: 'money_delivery_back',
                mode: 'select',
                sid: 1,
                smsg: 20000

              },
              {
                class: 'money_delivery_satisfy',
                mode: 'select',
                sid: 1,
                smsg: '20%'
              },
            ]
          }
        ],
        addState: false,
        addlist: {
          accountant: new Date().getMonth() + 1,
          stock: '',
          stock_bm: '',
          market_num: '',
          stock_sell_num: '',
          stock_num: '',
          money_sell: '',
          money_consume: '',
          money_delivery: '',
          money_delivery_back: '',
          money_delivery_satisfy: '',
        },

      }
    },
    methods: {
      init() {
        let that = this;

      },
      change_select(val, id) {//- 列表的select 改变 data
        let that = this;

        that.datalist.head = that.datalist.head.map((item) => {
          let objItem = {...item};
          if (item.id === id) {
            objItem = {
              ...item,
              select_val: {
                ...item.select_val,
                sid: item.select_val.list.find((item_sv) => {
                  return item_sv.msg === val
                }).id,
                smsg: val
              }
            }
          }
          return objItem;
        })

      },
      checkAll() {//- 全选
        let that = this;

        if (that.indeterminate) {
          that.checkAll_c = false;
        } else {
          that.checkAll_c = !that.checkAll_c;
        }
        that.indeterminate = false;

        let c = that.checkAll_c;
        let list = that.datalist.list;
        if (c) {
          for (let i = 0; i < list.length; i++) {
            list[i].checked = true;
          }
        } else {
          for (let i = 0; i < list.length; i++) {
            list[i].checked = false;
          }
        }

      },
      change_s(id) {//- 列表的checkbox
        let that = this;

        that.datalist.list = that.datalist.list.map((v) => {
          if (v.id === id) {
            return {
              ...v,
              checked: !v.checked
            }
          } else {
            return v;
          }

        })

        that.$nextTick(() => {
          let allt = false, allf = false;

          that.datalist.list.forEach((val) => {
            if (val.checked)
              allt = true;
            else
              allf = true;
          })

          if (allt && !allf) {
            that.indeterminate = false;
            that.checkAll_c = true;
          } else {
            that.indeterminate = true;
            that.checkAll_c = false;
          }

          if (!allt) {
            that.indeterminate = false;
          }
        })

      },
      model_save() {//- 搜索右侧的下拉箭头
        let that = this;
        // that.modelToggle = that.modelToggle ? false : true;

        document.getElementById('model_save_show').style.display = 'flex';

      },
      scrollList() {//- totop点击

        document.querySelector(".body").scrollTop = 0

      },
      modelShow() {//- 存为模板点击事件
        let that = this;
        that.modelInput.visible = true;
      },
      handleOk() {//- 存为模板的确认
        let that = this;

        let val = that.modelInput.inputval;

        if (val.match(/^\s*$/)) {
          that.$Message.warning('模板名字不能为空')

          that.modelInput.confirmLoading = false;
          setTimeout(() => {
            that.modelInput.confirmLoading = true;
          }, 1)
          return false;
        }

        let list = that.search_condition;

        for (let i = 0; i < list.length; i++) {
          let li = list[i];
          if (li.name == val) {
            that.$Message.warning('模板名字已经存在了')

            that.modelInput.confirmLoading = false;
            setTimeout(() => {
              that.modelInput.confirmLoading = true;
            }, 1)

            return false;
          }
        }

        let nl = [];
        that.datalist.head.forEach((v) => {
          if (v.mode == 'select') {
            nl.push({
              class: v.class,
              mode: 'select',
              sid: v.select_val.sid,
              smsg: v.select_val.smsg
            })
          }
        })

        that.search_condition.splice(0, 0, {
          id: that.$v4(),
          name: val,
          value: nl
        })

        that.modelInput.visible = false;
        that.modelInput.confirmLoading = false;
        that.modelToggle = false;
      },
      searchClick(id) {//- 搜索条件的下拉选择
        let that = this;

        let list = that.search_condition;
        let sval = [];

        for (let i = 0; i < list.length; i++) {
          let li = list[i];
          if (li.id == id) {
            sval = li.value;
            break;
          }
        }

        let j = 0;
        that.datalist.head = that.datalist.head.map((val) => {
          let nv = {...val}

          for (let i = j; i < sval.length; i++) {
            let si = sval[i];
            if (val.class == si.class) {
              j = i + 1;

              let sv = {
                ...val.select_val,
                sid: si.sid,
                smsg: si.smsg
              }
              nv = {
                ...val,
                select_val: sv
              }

              break;
            }
          }

          return nv;
        })

      },
      edit_single(id) {//- 列表编辑
        let that = this;

        let list = that.datalist.list.filter((v) => {
          return v.id == id;
        })

        let obj = {};
        list[0].list_d.forEach((v) => {
          obj[v.class] = v.data;
        })

        let {stock, stock_bm, market_num, stock_sell_num, stock_num, money_sell, money_consume, money_delivery, money_delivery_back, money_delivery_satisfy} = obj;

        that.addlist.stock = stock;
        that.addlist.stock_bm = stock_bm;
        that.addlist.market_num = market_num;
        that.addlist.stock_sell_num = stock_sell_num;
        that.addlist.stock_num = stock_num;
        that.addlist.money_sell = money_sell;
        that.addlist.money_consume = money_consume;
        that.addlist.money_delivery = money_delivery;
        that.addlist.money_delivery_back = money_delivery_back;
        that.addlist.money_delivery_satisfy = money_delivery_satisfy;


        that.$store.commit('changecbg', true);
        that.addState = true;
      },
      delete_single(id) {//- 列表删除 单个
        let that = this;

        that.$Modal.confirm({
          title: '零售管理',
          content: '确定删除吗？（删除后不可恢复）',
          onOk() {
            that.datalist.list = that.datalist.list.filter((v) => {
              return v.id != id;
            })

            that.change_s();
          }
        })

      },
      delete_batch() {//- 批量删除
        let that = this;

        that.$Modal.confirm({
          title: '零售管理',
          content: '确定删除吗？（删除后不可恢复）',
          onOk() {
            that.datalist.list = that.datalist.list.filter((v) => {
              return !v.checked;
            })

            that.change_s();
          }
        })

      },
      addShow() {//- 添加弹框显示
        let that = this;

        that.addlist.stock = '';
        that.addlist.stock_bm = '';
        that.addlist.market_num = '';
        that.addlist.stock_sell_num = '';
        that.addlist.stock_num = '';
        that.addlist.money_sell = '';
        that.addlist.money_consume = '';
        that.addlist.money_delivery = '';
        that.addlist.money_delivery_back = '';
        that.addlist.money_delivery_satisfy = '';

        that.$store.commit('changecbg', true);
        that.addState = true;
      },
      addClose() {//- 添加弹框的关闭
        let that = this;
        that.$store.commit('changecbg', false);
        that.addState = false;
      },
      savedata() {//- 添加数据
        let that = this;

        that.datalist.list.splice(0, 0, {
          id: this.$v4(),
          checked: false,
          list_d: [
            {
              class: 'serial_num',
              link: true,
              data: 1
            },
            {
              class: 'accountant',
              link: true,
              data: that.addlist.accountant
            },
            {
              class: 'stock',
              link: true,
              data: that.addlist.stock
            },
            {
              class: 'stock_bm',
              link: 20000,
              data: that.addlist.stock_bm
            },
            {
              class: 'market_num',
              link: false,
              data: that.addlist.market_num
            },
            {
              class: 'stock_sell_num',
              link: false,
              data: that.addlist.stock_sell_num
            },
            {
              class: 'stock_num',
              link: false,
              data: that.addlist.stock_num
            },
            {
              class: 'money_sell',
              link: false,
              data: that.addlist.money_sell
            },
            {
              class: 'money_consume',
              link: false,
              data: that.addlist.money_consume
            },
            {
              class: 'money_delivery',
              link: false,
              data: that.addlist.money_delivery
            },
            {
              class: 'money_delivery_back',
              link: false,
              data: that.addlist.money_delivery_back
            },
            {
              class: 'money_delivery_satisfy',
              link: false,
              data: that.addlist.money_delivery_satisfy
            }
          ]
        })

        that.$store.commit('changecbg', false);
        that.addState = false;
      },
      closeFloat() {//- 关闭一些弹框的跨子组件方法
        let that = this;

        that.modelToggle = false;
      },
      lr_mouseOver(id) {//- 列表的鼠标over
        let that = this;

        that.datalist.list = that.datalist.list.map((v) => {
          let nv = {
            ...v,
            hover: false
          }
          if (v.id === id) {
            nv = {
              ...v,
              hover: true
            }
          }
          return nv;
        })
      },
      lr_mouseLeave() {//- 列表的鼠标离开leave
        let that = this;

        that.datalist.list = that.datalist.list.map((v) => {
          let nv = {
            ...v,
            hover: false
          }

          return nv;
        })
      }

    },
    mounted() {
      let that = this;

      that.init();
    }
  }
</script>

<style lang="sass">
  @import "../../css/modules/datalist"
</style>
