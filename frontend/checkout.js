document.addEventListener('DOMContentLoaded', () => {
  const productCards = document.querySelectorAll('.product-card');
  const modal = document.getElementById('productModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalDescription = document.getElementById('modalDescription');
  const closeModal = document.querySelector('.close-btn');
  const addToBagBtn = document.getElementById('addToBagBtn');
  
  const cartPanel = document.getElementById('cartPanel');
  const cartItems = document.getElementById('cartItems');
  const cartClose = document.querySelector('.cart-close');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const continueShopping = document.querySelector('.continue-shopping');
  
  // Size options functionality
  let selectedSize = '';
  
  // Only attach event listeners if we're on a product page
  if (productCards.length > 0 && productCards[0].dataset.name) {
    // Initialize size options
    const sizeOptions = document.querySelectorAll('.size-option');
    
    sizeOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Remove selected class from all options
        sizeOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to clicked option
        option.classList.add('selected');
        selectedSize = option.dataset.size;
      });
    });
    
    // Quantity controls
    const quantityInput = document.getElementById('quantityInput');
    const decreaseQuantity = document.getElementById('decreaseQuantity');
    const increaseQuantity = document.getElementById('increaseQuantity');
    
    decreaseQuantity.addEventListener('click', () => {
      let quantity = parseInt(quantityInput.value);
      if (quantity > 1) {
        quantityInput.value = quantity - 1;
      }
    });
    
    increaseQuantity.addEventListener('click', () => {
      let quantity = parseInt(quantityInput.value);
      quantityInput.value = quantity + 1;
    });
    
    // Open modal when a product is clicked
    productCards.forEach(card => {
      card.addEventListener('click', () => {
        modalImage.src = card.dataset.img;
        modalTitle.textContent = card.dataset.name;
        modalPrice.textContent = card.dataset.price;
        modalDescription.textContent = card.dataset.description;
        
        // Reset size selection
        selectedSize = '';
        sizeOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Reset quantity
        quantityInput.value = 1;
        
        // Show modal
        modal.classList.remove('hidden');
        setTimeout(() => {
          modal.classList.add('show');
        }, 10);
      });
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 300);
    });
    
    // Add to cart
    addToBagBtn.addEventListener('click', () => {
      // Check if size is selected
      if (!selectedSize && sizeOptions.length > 0) {
        alert('Please select an option');
        return;
      }
      
      const quantity = parseInt(quantityInput.value);
      
      // Create cart item
      const item = document.createElement('div');
      item.className = 'cart-item';
      
      const itemHTML = `
        <div class="cart-item-image">
          <img src="${modalImage.src}" alt="${modalTitle.textContent}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${modalTitle.textContent}</div>
          <div class="cart-item-price">${modalPrice.textContent}</div>
          ${selectedSize ? `<div class="cart-item-size">Option: ${selectedSize}</div>` : ''}
          <div class="cart-item-quantity">Qty: ${quantity}</div>
          <div class="cart-item-remove">Remove</div>
        </div>
      `;
      
      item.innerHTML = itemHTML;
      
      // Add remove functionality
      item.querySelector('.cart-item-remove').addEventListener('click', function() {
        item.remove();
        updateCartTotal();
      });
      
      cartItems.appendChild(item);
      
      // Update cart total
      updateCartTotal();
      
      // Show cart panel
      cartPanel.classList.remove('hidden');
      setTimeout(() => {
        cartPanel.classList.add('show');
      }, 10);
      
      // Hide modal
      modal.classList.remove('show');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 300);
    });
    
    // Close cart panel
    cartClose.addEventListener('click', () => {
      cartPanel.classList.remove('show');
      setTimeout(() => {
        cartPanel.classList.add('hidden');
      }, 400);
    });
    
    // Continue shopping
    continueShopping.addEventListener('click', () => {
      cartPanel.classList.remove('show');
      setTimeout(() => {
        cartPanel.classList.add('hidden');
      }, 400);
    });
    
    // Handle checkout with modern popup
    checkoutBtn.addEventListener('click', () => {
      showCustomPopup('You cannot purchase this');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => {
          modal.classList.add('hidden');
        }, 300);
      }
    });
    
    // Function to update cart total
    function updateCartTotal() {
      const cartTotalElement = document.getElementById('cartTotal');
      if (!cartTotalElement) return;
      
      let total = 0;
      const items = cartItems.querySelectorAll('.cart-item');
      
      items.forEach(item => {
        const priceText = item.querySelector('.cart-item-price').textContent;
        const price = parseFloat(priceText.replace('$', ''));
        const quantityText = item.querySelector('.cart-item-quantity').textContent;
        const quantity = parseInt(quantityText.replace('Qty: ', ''));
        
        total += price * quantity;
      });
      
      cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Function to show custom popup
    function showCustomPopup(message) {
      // Check if popup already exists
      let customPopup = document.getElementById('customPopup');
      
      // If not, create it
      if (!customPopup) {
        customPopup = document.createElement('div');
        customPopup.id = 'customPopup';
        customPopup.className = 'custom-popup';
        
        const popupHTML = `
          <div class="custom-popup-content">
            <span class="custom-popup-close">&times;</span>
            <p id="customPopupMessage">${message}</p>
            <button id="customPopupButton">OK</button>
          </div>
        `;
        
        customPopup.innerHTML = popupHTML;
        document.body.appendChild(customPopup);
        
        // Add styles if not already added
        if (!document.getElementById('customPopupStyles')) {
          const styles = document.createElement('style');
          styles.id = 'customPopupStyles';
          styles.textContent = `
            .custom-popup {
              display: none;
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.7);
              z-index: 2000;
              align-items: center;
              justify-content: center;
            }
            
            .custom-popup.hidden {
              display: none;
            }
            
            .custom-popup:not(.hidden) {
              display: flex;
            }
            
            .custom-popup-content {
              background-color: #fff;
              padding: 30px;
              border-radius: 8px;
              max-width: 400px;
              width: 90%;
              text-align: center;
              position: relative;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
              animation: popupFadeIn 0.3s ease;
            }
            
            @keyframes popupFadeIn {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            .custom-popup-close {
              position: absolute;
              top: 10px;
              right: 15px;
              font-size: 24px;
              cursor: pointer;
              color: #aaa;
            }
            
            .custom-popup-close:hover {
              color: #333;
            }
            
            #customPopupMessage {
              margin: 20px 0;
              font-size: 18px;
              color: #333;
              line-height: 1.5;
            }
            
            #customPopupButton {
              background-color: #111;
              color: #fff;
              border: none;
              padding: 10px 25px;
              border-radius: 4px;
              cursor: pointer;
              font-weight: 500;
              margin-top: 10px;
              transition: background-color 0.2s;
            }
            
            #customPopupButton:hover {
              background-color: #333;
            }
          `;
          document.head.appendChild(styles);
        }
      } else {
        // Update message if popup exists
        document.getElementById('customPopupMessage').textContent = message;
      }
      
      // Show popup
      customPopup.classList.remove('hidden');
      
      // Add event listeners
      const closeButton = document.querySelector('.custom-popup-close');
      const okButton = document.getElementById('customPopupButton');
      
      // Function to close popup
      const closePopup = () => {
        customPopup.classList.add('hidden');
      };
      
      // Close when clicking X
      closeButton.addEventListener('click', closePopup);
      
      // Close when clicking OK button
      okButton.addEventListener('click', closePopup);
      
      // Close when clicking outside
      customPopup.addEventListener('click', (e) => {
        if (e.target === customPopup) {
          closePopup();
        }
      });
    }
  }
});