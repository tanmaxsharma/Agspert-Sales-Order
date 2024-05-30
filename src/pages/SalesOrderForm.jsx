import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Box,
  Badge,
  VStack,
} from '@chakra-ui/react';
import Select from 'react-select';
import { productData } from '../assets/productData';
import { salesOrder } from '../assets/SalesOrder';
import { data as userData } from '../assets/userData';

const SalesOrderForm = ({ isOpen, onClose, initialData, isViewOnly }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerError, setCustomerError] = useState(false);
  const [productError, setProductError] = useState(false);

  useEffect(() => {
    if (initialData) {
      const customer = userData.find(user => user.customer_profile.id === initialData.customer_id);
      setSelectedCustomer(customer || null);

      const products = initialData.items.map(item => {
        const product = productData.find(p => p.sku.some(s => s.id === item.sku_id));
        if (!product) return null;
        return {
          value: product.id,
          label: product.name,
          sku: product.sku,
        };
      }).filter(product => product !== null);

      setSelectedProducts(products);
      const quantitiesMap = initialData.items.reduce((acc, item) => {
        acc[item.sku_id] = item.quantity;
        return acc;
      }, {});
      setQuantities(quantitiesMap);
    } else {
      setSelectedCustomer(null);
      setSelectedProducts([]);
      setQuantities({});
    }
  }, [initialData]);

  const handleProductChange = (selectedOptions) => {
    setSelectedProducts(selectedOptions || []);
    setQuantities({});
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities({ ...quantities, [productId]: value });
  };

  const handleCreateOrder = () => {
    // Reset error states
    setCustomerError(false);
    setProductError(false);

    // Check if customer is selected
    if (!selectedCustomer) {
      setCustomerError(true);
      return;
    }

    // Check if products are selected
    if (selectedProducts.length === 0) {
      setProductError(true);
      return;
    }

    // Check if quantities are provided for all selected products
    const quantitiesProvided = selectedProducts.every(product => quantities[product.value]);
    if (!quantitiesProvided) {
      setProductError(true);
      return;
    }

    // Proceed with creating the order
    const newOrderItems = selectedProducts.map((product) => ({
      sku_id: product.value,
      price: product.sku[0].selling_price,
      quantity: quantities[product.value],
    }));

    const newOrder = {
      customer_id: selectedCustomer.customer_profile.id,
      customerName: selectedCustomer.customer_profile.name,
      items: newOrderItems,
      paid: false,
      invoice_no: `Invoice-${Date.now()}`,
      invoice_date: new Date().toISOString(),
    };

    if (initialData) {
      const index = salesOrder.findIndex(order => order.customer_id === initialData.customer_id);
      salesOrder[index] = newOrder;
    } else {
      salesOrder.push(newOrder);
    }

    console.log("This is sales order: " + salesOrder);

    onClose();
  };

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{initialData ? (isViewOnly ? 'View Sales Order' : 'Edit Sales Order') : 'Create Sales Order'}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={customerError}>
                <FormLabel>Customer</FormLabel>
                <Select
                  options={userData.map((user) => ({
                    value: user.customer_profile.id,
                    label: user.customer_profile.name,
                    user: user,
                  }))}
                  value={selectedCustomer ? { value: selectedCustomer.customer_profile.id, label: selectedCustomer.customer_profile.name } : null}
                  onChange={(selectedOption) => setSelectedCustomer(selectedOption.user)}
                  placeholder="Select customer"
                  isDisabled={isViewOnly}
                />
              </FormControl>

              <FormControl isInvalid={productError}>
                <FormLabel>Products</FormLabel>
                <Select
                 
                  isMulti
                  options={productData.map((product) => ({
                    value: product.id,
                    label: product.name,
                    sku: product.sku,
                  }))}
                  value={selectedProducts}
                  onChange={handleProductChange}
                  placeholder="Select products"
                  isDisabled={isViewOnly}
                />
              </FormControl>

              {selectedProducts.map((product) => (
                <Box key={product.value} w="100%">
                  <FormControl>
                    <FormLabel>Quantity for {product.label}</FormLabel>
                    <NumberInput
                      min={1}
                      value={quantities[product.value] || ''}
                      onChange={(valueString) => handleQuantityChange(product.value, valueString)}
                      isReadOnly={isViewOnly}
                    >
                      <NumberInputField />
                    </NumberInput>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Price for {product.label}</FormLabel>
                    <Input
                      value={product.sku[0].selling_price}
                      isReadOnly
                    />
                  </FormControl>

                  {product.sku.map((sku) => (
                    <Box key={sku.id}>
                      <Badge colorScheme="green">
                        {`SKU: ${sku.id}, Available Quantity: ${sku.quantity_in_inventory}`}
                      </Badge>
                    </Box>
                  ))}
                </Box>
              ))}
            </VStack>
          </ModalBody>

          <ModalFooter>
            {!isViewOnly && (
              <Button colorScheme="blue" mr={3} onClick={handleCreateOrder}>
                {initialData ? 'Save' : 'Create'}
              </Button>
            )}
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SalesOrderForm;
