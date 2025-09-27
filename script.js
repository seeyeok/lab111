// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDisplay();
    }

    bindEvents() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemName = e.target.getAttribute('data-item');
                const itemPrice = parseFloat(e.target.getAttribute('data-price'));
                this.addItem(itemName, itemPrice);
            });
        });

        // Clear cart button
        document.getElementById('clear-cart').addEventListener('click', () => {
            this.clearCart();
        });

        // Order form submission
        document.getElementById('order-form').addEventListener('submit', (e) => {
            this.handleOrderSubmission(e);
        });
    }

    addItem(name, price) {
        const existingItem = this.items.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        this.updateDisplay();
        this.showAddedToCartFeedback();
    }

    removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
        this.updateDisplay();
    }

    updateQuantity(name, newQuantity) {
        const item = this.items.find(item => item.name === name);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(name);
            } else {
                item.quantity = newQuantity;
                this.updateDisplay();
            }
        }
    }

    clearCart() {
        this.items = [];
        this.updateDisplay();
    }

    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getDonation() {
        return this.getSubtotal() * 0.1; // 10% donation
    }

    getTotal() {
        return this.getSubtotal() + this.getDonation();
    }

    updateDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
        const subtotalElement = document.getElementById('subtotal');
        const donationElement = document.getElementById('donation');
        const totalElement = document.getElementById('total');

        // Clear cart display
        cartItemsContainer.innerHTML = '';

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty. Add some ice cream!</p>';
        } else {
            this.items.forEach(item => {
                const cartItemElement = this.createCartItemElement(item);
                cartItemsContainer.appendChild(cartItemElement);
            });
        }

        // Update totals
        subtotalElement.textContent = `$${this.getSubtotal().toFixed(2)}`;
        donationElement.textContent = `$${this.getDonation().toFixed(2)}`;
        totalElement.textContent = `$${this.getTotal().toFixed(2)}`;
    }

    createCartItemElement(item) {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-controls">
                    <button class="quantity-btn" onclick="cart.updateQuantity('${item.name}', ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="cart.updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
                    <button class="btn btn-small btn-outline" onclick="cart.removeItem('${item.name}')" style="margin-left: 0.5rem; padding: 4px 8px;">Remove</button>
                </div>
            </div>
            <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        return div;
    }

    showAddedToCartFeedback() {
        // Create temporary feedback message
        const feedback = document.createElement('div');
        feedback.className = 'success-message';
        feedback.textContent = 'Item added to cart!';
        feedback.style.position = 'fixed';
        feedback.style.top = '100px';
        feedback.style.right = '20px';
        feedback.style.zIndex = '9999';
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateY(-20px)';
        feedback.style.transition = 'all 0.3s ease';

        document.body.appendChild(feedback);

        // Animate in
        setTimeout(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateY(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 300);
        }, 3000);
    }

    handleOrderSubmission(e) {
        e.preventDefault();

        if (this.items.length === 0) {
            this.showMessage('Please add items to your cart before placing an order.', 'error');
            return;
        }

        const formData = new FormData(e.target);
        const orderData = {
            customer: {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                pickupDate: formData.get('pickup-date'),
                specialRequests: formData.get('special-requests')
            },
            items: this.items,
            totals: {
                subtotal: this.getSubtotal(),
                donation: this.getDonation(),
                total: this.getTotal()
            }
        };

        // Simulate order processing
        this.processOrder(orderData);
    }

    processOrder(orderData) {
        // Show loading state
        const submitButton = document.querySelector('#order-form button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Processing Order...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            console.log('Order submitted:', orderData);
            
            // Show success message
            this.showMessage(
                `Thank you ${orderData.customer.name}! Your order has been received. You will receive a confirmation email at ${orderData.customer.email}. Total: $${orderData.totals.total.toFixed(2)}`,
                'success'
            );

            // Reset form and cart
            document.getElementById('order-form').reset();
            this.clearCart();

            // Update fundraising progress
            this.updateFundraisingProgress(orderData.totals.total);

            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    updateFundraisingProgress(newAmount) {
        const currentRaisedElement = document.getElementById('raised-amount');
        const currentAmount = parseFloat(currentRaisedElement.textContent.replace('$', '').replace(',', ''));
        const newTotal = currentAmount + newAmount;
        
        // Animate the number update
        this.animateNumber(currentRaisedElement, currentAmount, newTotal, '$');
    }

    animateNumber(element, start, end, prefix = '') {
        const duration = 1000;
        const startTime = performance.now();
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (end - start) * this.easeOutCubic(progress);
            element.textContent = prefix + current.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        
        requestAnimationFrame(updateNumber);
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.textContent = message;
        
        const orderSection = document.getElementById('order');
        orderSection.insertBefore(messageDiv, orderSection.firstChild);
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Navigation and UI Management
class UIManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupScrollAnimations();
        this.updateActiveNavLink();
        this.setMinPickupDate();
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('.nav');

        if (mobileMenuBtn && nav) {
            mobileMenuBtn.addEventListener('click', () => {
                nav.classList.toggle('mobile-nav-open');
            });

            // Close mobile menu when clicking nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('mobile-nav-open');
                });
            });
        }
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add fade-in class to elements
        document.querySelectorAll('.about-card, .menu-item, .contact-content > div').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const updateActiveLink = () => {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        };

        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); // Initial call
    }

    setMinPickupDate() {
        const pickupDateInput = document.getElementById('pickup-date');
        if (pickupDateInput) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const minDate = tomorrow.toISOString().split('T')[0];
            pickupDateInput.setAttribute('min', minDate);
        }
    }
}

// Utility Functions
const utils = {
    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    // Validate email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate phone
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Form Validation
class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        this.setupValidation();
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', utils.debounce(() => this.validateField(input), 300));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        field.classList.remove('error');
        this.removeErrorMessage(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value && !utils.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        // Phone validation
        if (field.type === 'tel' && value && !utils.isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }

        // Date validation
        if (field.type === 'date' && value) {
            const selectedDate = new Date(value);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            if (selectedDate < tomorrow) {
                isValid = false;
                errorMessage = 'Pickup date must be at least one day in advance';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }

    removeErrorMessage(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize shopping cart
    window.cart = new ShoppingCart();
    
    // Initialize UI manager
    window.uiManager = new UIManager();
    
    // Initialize form validation
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        window.formValidator = new FormValidator(orderForm);
    }

    // Add CSS for mobile navigation
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav {
                position: fixed;
                top: 70px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background: white;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding: 2rem;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                transition: left 0.3s ease;
                z-index: 999;
            }
            
            .nav.mobile-nav-open {
                left: 0;
            }
            
            .nav-link {
                margin: 1rem 0;
                font-size: 1.2rem;
            }
        }
        
        .field-error {
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 0.25rem;
        }
        
        .form-group input.error,
        .form-group textarea.error {
            border-color: #e74c3c;
        }
    `;
    document.head.appendChild(style);

    console.log('Lions Club Ice Cream Landing Page initialized successfully!');
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ShoppingCart, UIManager, FormValidator, utils };
}