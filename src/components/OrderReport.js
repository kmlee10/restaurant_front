import React, { Component } from 'react';
import moment from 'moment';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { getOrderList } from '../libs/api';

class OrderReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      expanded: null
    };
  }

  async componentDidMount() {
    const orders = await getOrderList();

    this.setState(state => ({
      ...state,
      orders,
    }));
  }

  handleChange = (panel) => (event, isExpanded) => {
    this.setState(state => ({
      ...state,
      expanded: isExpanded ? panel : false,
    }));
  };

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Accordion expanded={this.state.expanded === order.id} onChange={this.handleChange(order.id)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Grid container spacing={2}>
                <Grid item>
                  <Typography>{order.id}번 주문({order.cooks.firstName} {order.cooks.lastName}님)</Typography>
                </Grid>
                <Grid item>
                  <Chip label={order.state} color="primary" />
                </Grid>
                <Grid item xs={12}>
                  <small>주문일시 : {moment(order.orderDatetime).format('YYYY-MM-DD HH:mm:ss')}</small>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <List component="nav" aria-label="contacts">
                <strong>주문 메뉴</strong>
                {order.orderDishes.map(dish => (
                  <ListItem button>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography>{dish.dishes.name} ($ {dish.dishes.price})</Typography>
                      </Grid>
                      <Grid item>
                        {dish.quantity}개
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    )
  }
}

export default OrderReport;