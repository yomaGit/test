export default {
  name: 'TableExpand',
  functional: true,
  props: {
    row: Object,
    valKey: String,
    render: Function,
    index: Number,
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      index: ctx.props.index,
      valKey: ctx.props.valKey,
    };
    return ctx.props.render(h, params);
  }
};
