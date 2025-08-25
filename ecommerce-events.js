function carregarGTM(){ (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXXX');}

function sanitizeString(str) {
    if (!str) return '';
    
    return str.toString().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, '') 
        .replace(/\s+/g, ' ').trim();
}

// page_viewed
analytics.subscribe('page_viewed', (event) => {
carregarGTM()
window.dataLayer = window.dataLayer || [];
  
  console.log('page_viewed', event)
  window.dataLayer.push({
    event: 'page_viewed',
    page_location: event.context.document.location.href,
    page_referrer: event.context.document.referrer,
    page_title: event.context.document.title,
  });
});

// collection_viewed
analytics.subscribe('collection_viewed', (event) => {
carregarGTM()
window.dataLayer = window.dataLayer || [];
  
  console.log('collection_viewed', event)
  window.dataLayer.push({
   'event': 'view_item_list',
   'ecommerce': {
        'items': event.data.collection.productVariants.map(productVariant => ({
        'item_id': productVariant.product.id,
        'item_name':sanitizeString(productVariant.product.title),
        'item_category': sanitizeString(productVariant.product.type),
        'price': productVariant.price.amount,
        'quantity': 1

})),
  }});
});

// clicked
analytics.subscribe('clicked', (event) => {
  carregarGTM();
  window.dataLayer = window.dataLayer || [];

  var href = event.data.element?.href;
  if (!href || !href.includes('/products/')) return;

  var productName = href.split('/products/')[1]?.split('/')[0];
  if (!productName) return;

  var items = (window.dataLayer.find(e => e.ecommerce?.items)?.ecommerce.items) || [];

  var item = items.find(i => sanitizeString(i.item_name) === sanitizeString(productName));
  if (!item) return;

  console.log('clicked_select_item', event);

  window.dataLayer.push({
    'event': 'select_item',
    'ecommerce': {
      'items': [{
        'item_id': item.item_id,
        'item_name': item.item_name,
        'price': item.price,
        'item_category': item.item_category,
        'quantity': item.quantity
      }]
    }
  });
});

// product_viewed
analytics.subscribe('product_viewed', (event) => {
carregarGTM()
window.dataLayer = window.dataLayer || [];
  
  console.log('product_viewed', event)
  window.dataLayer.push({
    'event': 'view_item',
    'ecommerce': {
      'items': [{
        'item_id': event.data.productVariant.product.id,
        'item_name': sanitizeString(event.data.productVariant.product.title),
        'item_category': sanitizeString(event.data.productVariant.product.type),
        'price': event.data.productVariant.price.amount,
        'quantity': 1
      }]
    }
  });
});

// product_added_to_cart
analytics.subscribe('product_added_to_cart', (event) => {
carregarGTM()
window.dataLayer = window.dataLayer || [];
  
  console.log('product_added_to_cart', event)
  window.dataLayer.push({
    'event': 'add_to_cart',
    'ecommerce': {
      'items': [{
        'item_id': event.data.cartLine.merchandise.product.id,
        'item_name': sanitizeString(event.data.cartLine.merchandise.product.title),
        'item_category': sanitizeString(event.data.cartLine.merchandise.product.type),
        'price': event.data.cartLine.merchandise.price.amount,
        'quantity': 1
      }]
    }
  });
});

// cart_viewed
analytics.subscribe('cart_viewed', (event) => {
carregarGTM()
window.dataLayer = window.dataLayer || [];
  
  console.log('cart_viewed', event)
  window.dataLayer.push({
   'event': 'view_cart',
   'ecommerce': {
      'value': event.data.cart.cost.totalAmount.amount,
      'currency': event.data.cart.cost.totalAmount.currencyCode,
      'items': event.data.cart.lines.map(line => ({
        'item_id': line.merchandise.product.id,
        'item_name':sanitizeString(line.merchandise.product.title),
        'item_category': sanitizeString(line.merchandise.product.type),
        'price': line.merchandise.price.amount,
        'quantity': line.quantity,

})),
  }});
});

// product_removed_from_cart
analytics.subscribe('product_removed_from_cart', (event) => {
carregarGTM()
window.dataLayer = window.dataLayer || [];
  
  console.log('product_removed_from_cart', event)
  window.dataLayer.push({
   'event': 'remove_from_cart',
   'ecommerce': {
      'value': event.data.cartLine.cost.totalAmount.amount,
      'currency': event.data.cartLine.cost.totalAmount.currencyCode,
      'items': [{
        'item_id': event.data.cartLine.merchandise.product.id,
        'item_name': sanitizeString(event.data.cartLine.merchandise.product.title),
        'item_category': sanitizeString(event.data.cartLine.merchandise.product.type),
        'price': event.data.cartLine.merchandise.price.amount,
        'quantity': event.data.cartLine.merchandise.quantity,
      }]
    }
  });
});

// checkout_started
analytics.subscribe('checkout_started', (event) => {
carregarGTM()
window.dataLayer = window.dataLayer || [];
  
  console.log('checkout_started', event)
  window.dataLayer.push({
   'event': 'begin_checkout',
   'ecommerce': {
      'value': event.data.checkout.totalPrice.amount,
      'currency': event.data.checkout.currencyCode,
      'items': event.data.checkout.lineItems.map(lineItem => ({
        'item_id': lineItem.variant.product.id,
        'item_name':sanitizeString(lineItem.title),
        'item_category': sanitizeString(lineItem.variant.product.type),
        'price': lineItem.variant.price.amount,
        'quantity': lineItem.quantity,

})),
  }});
});

// payment_info_submitted
analytics.subscribe('payment_info_submitted', (event) => {
carregarGTM()
window.dataLayer = window.dataLayer || [];
  
  console.log('payment_info_submitted', event)
  window.dataLayer.push({
   'event': 'add_payment_info',
   'ecommerce': {
      'value': event.data.checkout.totalPrice.amount,
      'currency': event.data.checkout.currencyCode,
      'items': event.data.checkout.lineItems.map(lineItem => ({
        'item_id': lineItem.variant.product.id,
        'item_name':sanitizeString(lineItem.title),
        'item_category': sanitizeString(lineItem.variant.product.type),
        'price': lineItem.variant.price.amount,
        'quantity': lineItem.quantity,

})),
  }});
});

// checkout_address_info_submitted
analytics.subscribe('checkout_shipping_info_submitted', (event) => {
carregarGTM()
window.dataLayer = window.dataLayer || [];
  
  console.log('checkout_shipping_info_submitted', event)
  window.dataLayer.push({
   'event': 'add_shipping_info',
   'ecommerce': {
      'value': event.data.checkout.totalPrice.amount,
      'currency': event.data.checkout.currencyCode,
      'items': event.data.checkout.lineItems.map(lineItem => ({
        'item_id': lineItem.variant.product.id,
        'item_name':sanitizeString(lineItem.title),
        'item_category': sanitizeString(lineItem.variant.product.type),
        'price': lineItem.variant.price.amount,
        'quantity': lineItem.quantity,

})),
  }});
});

// checkout_completed
analytics.subscribe('checkout_completed', (event) => {
carregarGTM()
window.dataLayer = window.dataLayer || [];
  
  console.log('checkout_completed', event)
  window.dataLayer.push({
   'event': 'purchase',
   'ecommerce': {
      'transaction_id': event.data.checkout.order.id,
      'shipping': event.data.checkout.shippingLine.price.amount, 
      'value': event.data.checkout.totalPrice.amount,   
      'currency': event.data.checkout.currencyCode,
      'items': event.data.checkout.lineItems.map(lineItem => ({
        'item_id': lineItem.variant.product.id,
        'item_name':sanitizeString(lineItem.title),
        'item_category': sanitizeString(lineItem.variant.product.type),
        'price': lineItem.variant.price.amount,
        'quantity': lineItem.quantity,

})),
  }});
});
