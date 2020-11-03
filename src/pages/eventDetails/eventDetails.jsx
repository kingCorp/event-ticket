import React, { useState } from 'react';
import Layout from '../../components/Layout';
import axios from "axios";
import BASE_API from "../../constants/uri";
import swal from 'sweetalert';
import './styles.scss';

import { useQuery } from "react-query";
import { fetchTickets } from "../../query/events";
import { Spinner } from "react-bootstrap";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import MaterialTable from "material-table";
import { useHistory } from 'react-router-dom';



const EventsDetails = (props) => {
  const {
    match: { params },
  } = props;
  const history = useHistory();
  const { status, data, refetch } = useQuery(["event.tickets", params.id], fetchTickets);
  const [form, setForm] =useState({code:'', phone:'', price:'', quantity:''})

  const [open, setOpen] = React.useState(false);

  const columns = [
    { title: "Ticket code", field: "code" },
    { title: "Phone", field: "phone" },
    { title: "Price", field: "price", type: "numeric" },
    { title: "Quantity", field: "quantity", type: "numeric" },
    { title: "Status", field: "status"},
    { title: "Corkage", field: "corkage"},
    { title: "Date", field: "date" },
  ];
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createTicket = async () => {
    const ticketdata = {
      ...form,
      code: form.code.toUpperCase()
    }
    try {
      const res = await axios.post(`${BASE_API}/ticket/${params.id}`, ticketdata);
      if (res.data.hasError) {
        swal("Failed", res.data.message, "error");
      } else {
        swal("Success", res.data.message, "success");
        refetch();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };


if(status === 'laoding'){
  return <Spinner />
}


  return (
      <>
      <Layout>
        <div>
        <div className=" row m-5">
        <div className="col-md-3 mb-2">
          <Button variant="contained" color="default" onClick={() => history.push(`/`)}>
            Home
          </Button>
          </div>

          <div className="col-md-3 mb-2">
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            New ticket
          </Button>
          </div>
          <div className="col-md-3">
          <Button variant="contained" color="primary" onClick={() => history.push(`/scan`)}>
            scan ticket
          </Button>
          </div>
        </div>
        <div className="ticket-info">
        <div style={{ maxWidth: "100%", marginTop:20 }}>
        <MaterialTable
          columns={columns}
          data={data}
          title="Tickets"
        />
      </div>
        </div>
       
        </div>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="code"
            label="Ticket code"
            type="text"
            fullWidth
            onChange={(e) => setForm({...form, code: e.target.value})}
          />
          <TextField
            margin="dense"
            id="phone"
            label="Customer Phone number"
            type="text"
            fullWidth
            onChange={(e) => setForm({...form, phone: e.target.value})}
          />
           <TextField
            
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            onChange={(e) => setForm({...form, price: e.target.value})}
          />
          <TextField
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            onChange={(e) => setForm({...form, quantity: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createTicket} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      </Layout>
      </>
  );
}


export default EventsDetails;