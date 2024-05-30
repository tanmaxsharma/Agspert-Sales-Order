import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Box,
  Avatar,
} from '@chakra-ui/react';

import { data as userData } from '../assets/userData';

const getCustomerNameById = (customerId) => {
  const customer = userData.find(c => c.customer_profile.id === customerId);
  return customer ? customer.customer_profile.name : 'Unknown';
};

const getTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const Tables = ({ orders, onEditOrder, onViewOrder }) => {
  return (
    <TableContainer width={'80%'} margin={'auto'} padding={'1rem'} boxShadow='lg' borderRadius='lg' bg='gray.50'>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Customer Name</Th>
            <Th>Price</Th>
            <Th>Last Modified</Th>
            <Th>Payment Status</Th>
            <Th>Edit / View</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order,index) => (
          <Tr key={`${order.customer_id}_${index}`}>
              <Td>{order.customer_id}</Td>
              <Td>
                <Box display="flex" alignItems="center">
                  <Avatar size="sm" src={`https://images.unsplash.com/photo-1549068106-b024baf5062d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} mr={3} />
                  {getCustomerNameById(order.customer_id)}
                </Box>
              </Td>
              <Td>${getTotalPrice(order.items).toFixed(2)}</Td>
              <Td>{new Date(order.invoice_date).toLocaleDateString()}</Td>
              <Td>{order.paid ? 'Paid' : 'Pending'}</Td>
              <Td>
                <Button size="sm" colorScheme="blue" mr={2} onClick={() => onEditOrder(order)}>Edit</Button>
                <Button size="sm" colorScheme="teal" onClick={() => onViewOrder(order)}>View</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Tables;
