import React, { useState } from 'react';
import { Box, Button, HStack } from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import SalesOrderForm from './SalesOrderForm';
import Tables from '../components/Table';
import { salesOrder } from '../assets/SalesOrder';

const SalesOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [filterType, setFilterType] = useState('all'); // State to manage filter type

  const handleCreateOrder = () => {
    setSelectedOrder(null);
    setIsViewOnly(false);
    setIsOpen(true);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsViewOnly(false);
    setIsOpen(true);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsViewOnly(true);
    setIsOpen(true);
  };

  const filterOrders = (type) => {
    setFilterType(type);
  };

  let filteredOrders = salesOrder;
  if (filterType === 'active') {
    filteredOrders = salesOrder.filter(order => !order.paid);
  } else if (filterType === 'completed') {
    filteredOrders = salesOrder.filter(order => order.paid);
  }

  return (
    <>
      <Box>
        <HStack justifyContent={'space-between'} width={'80%'} margin={'auto'} padding={'2rem'}>
          <HStack>
            <Button colorScheme="teal" variant={filterType === 'all' ? 'solid' : 'outline'} onClick={() => filterOrders('all')}>
              All Sales Order
            </Button>
            <Button colorScheme="teal" variant={filterType === 'active' ? 'solid' : 'outline'} onClick={() => filterOrders('active')}>
              Active Sales Order
            </Button>
            <Button colorScheme="teal" variant={filterType === 'completed' ? 'solid' : 'outline'} onClick={() => filterOrders('completed')}>
              Completed Sales Order
            </Button>
          </HStack>
          <HStack>
            <Button colorScheme="teal" variant="outline" onClick={handleCreateOrder}>
              <SmallAddIcon /> Sales Order
            </Button>
          </HStack>
        </HStack>

        <Tables orders={filteredOrders} onEditOrder={handleEditOrder} onViewOrder={handleViewOrder} />

        {isOpen && (
          <SalesOrderForm
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            initialData={selectedOrder}
            isViewOnly={isViewOnly}
          />
        )}
      </Box>
    </>
  );
};

export default SalesOrder;
