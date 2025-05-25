
import hardwareData from '@/metadata/hardware.json';
import softwareData from '@/metadata/software.json';
import giftingData from '@/metadata/gifting.json';
import classroomData from '@/metadata/classroom.json';
import orderTrackingData from '@/metadata/orderTracking.json';

export const metadata = {
  hardware: hardwareData,
  software: softwareData,
  gifting: giftingData,
  classroom: classroomData,
  orderTracking: orderTrackingData
};

export const getHardwareProducts = () => {
  return hardwareData.categories.flatMap(category => 
    category.products.map(product => ({
      ...product,
      category: category.name,
      categoryId: category.id
    }))
  );
};

export const getSoftwareProducts = () => {
  return softwareData.categories.flatMap(category => 
    category.products.map(product => ({
      ...product,
      category: category.name,
      categoryId: category.id
    }))
  );
};

export const getGiftingProducts = () => {
  return giftingData.categories.flatMap(category => 
    category.products.map(product => ({
      ...product,
      category: category.name,
      categoryId: category.id
    }))
  );
};

export const getCourses = () => {
  return classroomData.categories;
};

export const getOrderStatuses = () => {
  return orderTrackingData.statuses;
};

export const getSampleOrder = (trackingId: string) => {
  return orderTrackingData.sampleOrders.find(order => order.trackingId === trackingId);
};

export const getAllProducts = () => {
  return [
    ...getHardwareProducts(),
    ...getSoftwareProducts(),
    ...getGiftingProducts()
  ];
};
