import { Order } from '../models';

const OrderStatus = Object.freeze({
  NEW: 'NEW', // Yeni
  APPROVED: 'APPROVED', // Onaylı
  CANCEL: 'CANCEL', // İptal
  CANTREACHED: 'CANTREACHED', // Ulaşılamadı
  REBATE: 'REBATE', // İade
  TRASH: 'TRASH', // Çöp
});

export default OrderStatus;
