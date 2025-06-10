
document.addEventListener('DOMContentLoaded', function() {
    const detailsBox = document.getElementById('showDetails');
    if (detailsBox) {
        const detailsContent = detailsBox.querySelector('.details-content');
        const detailButtons = document.querySelectorAll('.show-details');
        const closeBtn = document.querySelector('.close-btn');

        detailButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();  
                detailsContent.querySelector('img').src = button.getAttribute('data-image');
                detailsContent.querySelector('h3').textContent = button.getAttribute('data-title');
                detailsContent.querySelector('.status span').textContent = button.getAttribute('data-status');
                detailsContent.querySelector('.description').textContent = button.getAttribute('data-description');
                detailsContent.querySelector('.price').textContent = button.getAttribute('data-price');
                detailsBox.classList.add('active');
            });
        });
        detailsBox.addEventListener('click', (e) => {
            if (e.target === detailsBox) detailsBox.classList.remove('active');
        });
        detailsContent.addEventListener('click', e => e.stopPropagation());
        closeBtn.addEventListener('click', () => detailsBox.classList.remove('active'));
    }

    function showCustomAlert(message, type = 'success') {
    const alertBox = document.getElementById('customAlert');
    if (alertBox.timeoutId) {
        clearTimeout(alertBox.timeoutId);
    }
    alertBox.textContent = message;
    alertBox.className = `custom-alert ${type}`;
    void alertBox.offsetWidth;
    alertBox.classList.add('show');
    alertBox.timeoutId = setTimeout(() => {
        alertBox.classList.remove('show');
        setTimeout(() => {
            alertBox.className = 'custom-alert';
        }, 500);
    }, 3000);
}

    function addToWishlist(event) {
        event.preventDefault();
        const productBox = event.currentTarget.closest('.box');
        if (!productBox) return showCustomAlert("Could not find product box", 'remove');
        const detailsBtn = productBox.querySelector('.show-details');
        const product = {
            title: productBox.querySelector('h3').textContent,
            price: productBox.querySelector('.price').textContent,
            image: productBox.querySelector('img').src,
            description: detailsBtn.dataset.description,
            status: detailsBtn.dataset.status
        };
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (wishlist.some(item => item.title === product.title)) {
            return showCustomAlert(`${product.title} is already in your wishlist!`, 'remove');
        }
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showCustomAlert(`${product.title} has been added to your wishlist!`);
    }

    function removeFromWishlist(index) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!wishlist[index]) return;
        showCustomAlert(`${wishlist[index].title} has been removed from your wishlist.`, 'remove');
        wishlist.splice(index, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        loadWishlist();
    }

    function loadWishlist() {
        const wishlistItemsContainer = document.getElementById('wishlistItems');
        const emptyWishlistMessage = document.getElementById('emptyWishlist');
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlistItemsContainer.innerHTML = '';
        if (!wishlist.length) {
            wishlistItemsContainer.style.display = 'none';
            emptyWishlistMessage.style.display = 'block';
            return;
        }
        wishlistItemsContainer.style.display = 'grid';
        emptyWishlistMessage.style.display = 'none';
        wishlist.forEach((item, i) => {
            wishlistItemsContainer.innerHTML += `
                <div class="wishlist-item">
                    <button class="remove-item" data-index="${i}">&times;</button>
                    <img src="${item.image}" alt="${item.title}">
                    <div class="wishlist-item-info">
                        <h3>${item.title}</h3>
                        <p class="price">${item.price}</p>
                        <p class="status">Status: <span>${item.status}</span></p>
                    </div>
                </div>
            `;
        });
        wishlistItemsContainer.querySelectorAll('.remove-item').forEach(btn =>
            btn.onclick = () => removeFromWishlist(+btn.dataset.index)
        );
    }

    document.querySelectorAll('.wishlist .material-symbols-outlined, .wishlist p').forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', addToWishlist);
        el.addEventListener('mouseenter', () => el.style.opacity = '0.7');
        el.addEventListener('mouseleave', () => el.style.opacity = '1');
    });

    const wishlistItemsContainer = document.getElementById('wishlistItems');
    const emptyWishlistMessage = document.getElementById('emptyWishlist');
    if (wishlistItemsContainer && emptyWishlistMessage) loadWishlist();



    const form = document.querySelector('.contact form');
    if (form) {
        const phoneInput = form.querySelector('input[name="number"]');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const phone = phoneInput.value.trim();
            const isValid = /^01[0125]\d{8}$/.test(phone);
            if (!isValid) {
                showFormAlert("Please enter a valid Egyptian phone number", "error");
            } else {
                showFormAlert("Submitted successfully. We will contact you soon!", "success");
                form.reset();
            }
        });
    }
    function showFormAlert(message, type = 'success') {
        const alert = document.getElementById('formAlert');
        alert.textContent = message;
        alert.className = `form-alert show ${type}`;
        setTimeout(() => alert.classList.remove('show'), 3000);
    }


    if (window.AOS) AOS.init();
});


document.addEventListener("DOMContentLoaded", function () {
    const toggleMenu = document.querySelector(".toggle-menu");
    const navMenu = document.querySelector("header nav ul");
    toggleMenu.addEventListener("click", function (e) {
        e.stopPropagation();
        navMenu.classList.toggle("show-menu");
    });
    document.addEventListener("click", function (e) {
        if (!navMenu.contains(e.target) && !toggleMenu.contains(e.target)) {
            navMenu.classList.remove("show-menu");
        }
    });
});
