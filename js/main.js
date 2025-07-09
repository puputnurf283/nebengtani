document.addEventListener('DOMContentLoaded', function() {
    // Filter Functionality
    const filterForm = document.getElementById('filter-form');
    
    if (filterForm) {
        // Handle form submission
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            applyFilters();
        });

        const filterInputs = filterForm.querySelectorAll('input, select');
        filterInputs.forEach(input => {
            input.addEventListener('change', applyFilters);
        });
    }

    function applyFilters() {
        const locationInput = document.querySelector('#filter-form input[type="text"]');
        const soilTypeSelect = document.querySelector('#filter-form select:nth-of-type(1)');
        const sizeSelect = document.querySelector('#filter-form select:nth-of-type(2)');
        
        const locationValue = locationInput.value.toLowerCase();
        const soilValue = soilTypeSelect.value;
        const sizeValue = sizeSelect.value;
        
        const cards = document.querySelectorAll('.lahan-card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            const cardLocation = card.dataset.location.toLowerCase();
            const cardSoil = card.dataset.soil;
            const cardSize = parseInt(card.dataset.size);
            
            const locationMatch = !locationValue || cardLocation.includes(locationValue);
            const soilMatch = !soilValue || cardSoil === soilValue;
            let sizeMatch = true;
            
            if (sizeValue) {
                const [min, max] = sizeValue.split('-').map(Number);
                if (sizeValue.endsWith('+')) {
                    sizeMatch = cardSize > parseInt(sizeValue);
                } else {
                    sizeMatch = cardSize >= min && (!max || cardSize <= max);
                }
            }
            
            if (locationMatch && soilMatch && sizeMatch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update results count
        const resultsCount = document.querySelector('.results-count');
        if (!resultsCount) {
            const countContainer = document.createElement('div');
            countContainer.className = 'results-count text-sm text-gray-500 mt-2';
            filterForm.appendChild(countContainer);
        }
        document.querySelector('.results-count').textContent = `Menampilkan ${visibleCount} dari ${cards.length} lahan`;
    }

    
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenuButton.innerHTML = mobileMenu.classList.contains('hidden') ? 
                '<i class="fas fa-bars text-2xl"></i>' : 
                '<i class="fas fa-times text-2xl"></i>';
        });
    }

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition duration-300 hidden';
    backToTopButton.id = 'back-to-top';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // FAQ Toggle Functionality
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('i');

            // Close all content except the one clicked
            document.querySelectorAll('.faq-content').forEach(item => {
                if (item !== content) item.classList.add('hidden');
            });
            document.querySelectorAll('.faq-toggle i').forEach(otherIcon => {
                if (otherIcon !== icon) otherIcon.classList.remove('rotate-180');
            });

            // Toggle content and icon
            content.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        });
    });

});